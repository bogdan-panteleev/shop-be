import { Handler, S3Event } from 'aws-lambda';
import aws from 'aws-sdk';
import csvParser from 'csv-parser';
import { HttpResponse } from '../../../../shared/httpResponse';

export function initImportFileParser(s3: aws.S3, bucketName: string, queue: aws.SQS): Handler {
  return async function importFileParser(event: S3Event): Promise<HttpResponse> {
    console.log('importFileParser is called with', event);

    try {
      await Promise.all(
        event.Records.map(async (record) => {
          const filePath = record.s3.object.key;
          console.log('processing file:', filePath);

          const fileStream = s3
            .getObject({
              Bucket: bucketName,
              Key: filePath,
            })
            .createReadStream();

          await new Promise((resolve, reject) => {
            fileStream
              .pipe(
                csvParser({
                  mapValues: ({ value }) => {
                    const number = Number(value);
                    return isNaN(number) ? value : number;
                  },
                })
              )
              .on('data', async (data) => {
                try {
                  console.log('processing data: ', data);
                  await queue
                    .sendMessage({
                      QueueUrl: process.env.PRODUCTS_SQS_URL as string,
                      MessageBody: JSON.stringify(data),
                    })
                    .promise();
                  console.log('successfully send to queue ', data);
                } catch (e) {
                  console.log('failed to send to queue', data);
                  console.log('failed with error', e);
                }
              })
              .on('error', (error) => {
                console.log('stream error: ', error);
                reject();
              })
              .on('end', () => {
                console.log('done');
                resolve(null);
              });
          });

          const steps = filePath.split('/');
          await s3
            .copyObject({
              Bucket: bucketName,
              Key: `parsed/${steps[steps.length - 1]}`,
              CopySource: bucketName + '/' + filePath,
            })
            .promise();

          await s3.deleteObject({ Bucket: bucketName, Key: filePath }).promise();
        })
      );

      return {
        statusCode: 200,
        body: { message: 'success' },
      };
    } catch (err) {
      console.log('importFileParser failed with error: ', err);
      return {
        statusCode: 500,
        body: { message: err instanceof Error ? err.toString() : err },
      };
    }
  };
}
