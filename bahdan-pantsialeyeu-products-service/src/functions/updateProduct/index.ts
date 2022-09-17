import { AWS } from '@serverless/typescript';
import { handlerPath, pathUp } from '../../libs/handler-resolver';

export const updateProduct: AWS['functions']['getProductById'] = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.updateProduct`,
  events: [
    {
      http: {
        method: 'put',
        path: 'products/{productId}',
        cors: true,
      },
    },
  ],
};
