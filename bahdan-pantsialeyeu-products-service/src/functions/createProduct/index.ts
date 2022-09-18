import { handlerPath, pathUp } from '../../libs/handler-resolver';
import { LambdaDefinition } from '../../models/lambdaDefinition';

export const createProduct: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
      },
    },
  ],
};
