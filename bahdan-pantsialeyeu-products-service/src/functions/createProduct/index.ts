import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

export const createProduct: AWS['functions']['createProduct'] = {
  handler: `${handlerPath(__dirname)}/../handlers.createProduct`,
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
