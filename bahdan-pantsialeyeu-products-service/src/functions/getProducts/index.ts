import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

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
