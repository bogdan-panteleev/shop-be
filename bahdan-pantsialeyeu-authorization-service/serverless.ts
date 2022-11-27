import { AWS } from '@serverless/typescript';
import { functions } from './src/functions';

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: 'bahdan-pantsialeyeu-auth-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'tmp',
    region: 'eu-central-1',
    iam: {
      role: {
        permissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary',
      },
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
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
    Outputs: {
      authorizerArn: {
        Value: { 'Fn::GetAtt': ['BasicAuthorizerLambdaFunction', 'Arn'] },
      },
    },
  },
};

module.exports = serverlessConfiguration;
