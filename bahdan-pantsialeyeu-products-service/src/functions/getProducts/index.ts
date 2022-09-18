import { handlerPath, pathUp } from '../../libs/handler-resolver';
import { LambdaDefinition } from '../../models/lambdaDefinition';

export const getProducts: LambdaDefinition = {
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
