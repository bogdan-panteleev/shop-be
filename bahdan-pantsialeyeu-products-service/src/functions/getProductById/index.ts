// import schema from './schema';
import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

export const getProductById: AWS['functions']['getProductById'] = {
  handler: `${handlerPath(__dirname)}/../handlers.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
      },
    },
  ],
};
