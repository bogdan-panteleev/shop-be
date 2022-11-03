import * as dotenv from 'dotenv';
dotenv.config();
import { AWS } from '@serverless/typescript';
import { functions } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'bahdan-pantsialeyeu-import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'tmp',
    region: 'eu-central-1',
    iam: {
      role: {
        permissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary',
        statements: [
          {
            Effect: 'Allow',
            Action: 's3:ListBucket',
            Resource: `arn:aws:s3:::${process.env.S3_BUCKET}`,
          },
          {
            Effect: 'Allow',
            Action: 's3:*',
            Resource: `arn:aws:s3:::${process.env.S3_BUCKET}/*`,
          },
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: '${param:productsQueueArn}',
          },
        ],
      },
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      S3_BUCKET: process.env.S3_BUCKET as string,
      PRODUCTS_SQS_URL: '${param:productsQueueUrl}',
    },
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },

  resources: {
    extensions: {
      IamRoleCustomResourcesLambdaExecution: {
        Properties: {
          PermissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
