import * as dotenv from 'dotenv';
dotenv.config();
import type { AWS } from '@serverless/typescript';
import { functions } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'bahdan-pantsialeyeu-goods-service',
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
            Action: 's3:*',
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: 'dynamodb:*',
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: {
              Ref: 'snsTopic',
            },
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
      SNS_TOPIC_ARN: { Ref: 'snsTopic' },
      PRODUCTS_TABLE: process.env.PRODUCTS_TABLE as string,
    },
  },
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
    Resources: {
      productsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: process.env.PRODUCTS_TABLE,
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },

      sqsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'bahdan-pantsialeyeu-goods-service-sqs-queue',
        },
      },

      snsTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'bahdan-pantsialeyeu-goods-service-sns-topic',
        },
      },

      snsSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'bahdan_pantsialeyeu@epam.com',
          Protocol: 'email',
          TopicArn: { Ref: 'snsTopic' },
        },
      },
    },

    Outputs: {
      queueUrl: {
        Value: { Ref: 'sqsQueue' },
      },
      queueArn: {
        Value: {
          'Fn::GetAtt': ['sqsQueue', 'Arn'],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
