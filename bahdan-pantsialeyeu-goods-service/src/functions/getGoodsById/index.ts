// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import { AWS } from '@serverless/typescript';

export const getGoodsById: AWS['functions']['getGoodsById'] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'goods/{goodsId}',
      },
    },
  ],
};
