// import schema from './schema';

import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

export const getProducts: AWS['functions']['getProducts'] = {
  handler: `${handlerPath(__dirname)}/../handlers.getProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
};
