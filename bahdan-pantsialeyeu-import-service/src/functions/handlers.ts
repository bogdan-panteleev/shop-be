import aws from 'aws-sdk';
import { initImportProductsFile } from './importProductsFile/handler';
import { middyfy } from '../../../shared/middlewares';
import { initImportFileParser } from './importFileParser/handler';

const s3 = new aws.S3({ region: process.env.AWS_REGION });

export const importProductsFile = middyfy(
  initImportProductsFile(s3, process.env.S3_BUCKET as string)
);
export const importFileParser = initImportFileParser(
  s3,
  process.env.S3_BUCKET as string,
  new aws.SQS({ region: process.env.AWS_REGION })
);
