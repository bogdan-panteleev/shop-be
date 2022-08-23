// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import {AWS} from "@serverless/typescript";

export const hello: AWS['functions']['hello'] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        // request: {
        //   schemas: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};
