// import schema from './schema';
import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

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
