// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import { AWS } from '@serverless/typescript';

export const getGoods: AWS['functions']['getGoods'] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'goods',
      },
    },
  ],
};
