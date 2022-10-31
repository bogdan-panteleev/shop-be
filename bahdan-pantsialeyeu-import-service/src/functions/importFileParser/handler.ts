import { Handler, S3Event } from 'aws-lambda';
import aws from 'aws-sdk';
import csvParser from 'csv-parser';
import { HttpResponse } from '../../../../shared/httpResponse';

export function initImportFileParser(s3: aws.S3, bucketName: string): Handler {
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

          const fileData: any[] = [];

          await new Promise((resolve, reject) => {
            fileStream
              .pipe(csvParser())
              .on('data', (data) => {
                console.log('data: ', data);
                fileData.push(data);
              })
              .on('error', reject)
              .on('end', () => {
                console.log('end');
                resolve(fileData);
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
