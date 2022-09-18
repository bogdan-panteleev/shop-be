import { AWS } from '@serverless/typescript';

const definition: AWS['functions'] = {
  test: {},
};

export type LambdaDefinition = typeof definition['test'];
