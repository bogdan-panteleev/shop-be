import { APIGatewayProxyEvent, Handler } from 'aws-lambda';
// @TODO install modularized aws-sdk.i.e.: '@aws-sdk/client-s3'
import aws from 'aws-sdk';
import { HttpResponse } from '../../../../shared/httpResponse';
// @TODO set up autoswagger
// @TODO setup environment variables
// @TODO write unit-tests

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
