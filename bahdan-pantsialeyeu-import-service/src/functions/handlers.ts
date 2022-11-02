import aws from 'aws-sdk';
import { initImportProductsFile } from './importProductsFile/handler';
import { middyfy } from '../../../shared/middlewares';
import { initImportFileParser } from './importFileParser/handler';

const s3 = new aws.S3({ region: 'eu-central-1' });

export const importProductsFile = middyfy(
  initImportProductsFile(s3, process.env.S3_BUCKET as string)
);
export const importFileParser = initImportFileParser(s3, process.env.S3_BUCKET as string);
