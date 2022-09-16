import { AWS } from '@serverless/typescript';
import { handlerPath, pathUp } from '../../libs/handler-resolver';

export const createProduct: AWS['functions']['createProduct'] = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        // request: {
        //   schemas: {
        //     'application/json': {
        //       schema: create_product,
        //       name: 'CreateProduct',
        //     },
        //   },
        // },
      },
    },
  ],
};
