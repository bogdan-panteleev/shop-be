// import schema from './schema';

import { AWS } from '@serverless/typescript';
import { handlerPath, pathUp } from '../../libs/handler-resolver';

export const getProducts: AWS['functions']['getProducts'] = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.getProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
      },
    },
  ],
};
