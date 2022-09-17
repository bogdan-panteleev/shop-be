// import schema from './schema';
import { AWS } from '@serverless/typescript';
import { handlerPath, pathUp } from '../../libs/handler-resolver';

export const deleteProduct: AWS['functions']['getProductById'] = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.deleteProduct`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'products/{productId}',
      },
    },
  ],
};
