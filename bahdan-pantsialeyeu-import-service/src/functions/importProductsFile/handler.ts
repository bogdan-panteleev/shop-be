import { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import aws from 'aws-sdk';
import { HttpResponse } from '../../../../shared/httpResponse';
// @TODO migrate to SDK v3
// @TODO check ability to customize gateway responses for unauthorized and forbidden cases https://github.com/Simaxa7/shop-be/pull/5/files

export function initImportProductsFile(s3: aws.S3, bucketName: string): Handler {
  return async function importProductsFile(event: APIGatewayProxyEvent): Promise<HttpResponse> {
    console.log('importProductsFile is called');
    try {
      if (!event.queryStringParameters || !event.queryStringParameters.fileName) {
        throw new Error(`'fileName' query string parameter is required`);
      }

      console.log('importProductsFile is called with ', event.queryStringParameters.fileName);
      const signedUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: bucketName,
        Key: `uploaded/${event.queryStringParameters.fileName}`,
        Expires: 60,
        ContentType: 'text/csv',
      });

      return {
        statusCode: 200,
        body: signedUrl,
      };
    } catch (e) {
      console.log('importProductsFile is failed with error ', e);
      return {
        statusCode: 500,
        body: { message: e instanceof Error ? e.toString() : e },
      };
    }
  };
}
