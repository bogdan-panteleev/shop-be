// import schema from './schema';
import { AWS } from '@serverless/typescript';
import { handlerPath, pathUp } from '../../libs/handler-resolver';

export const getProductById: AWS['functions']['getProductById'] = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
      },
    },
  ],
};
