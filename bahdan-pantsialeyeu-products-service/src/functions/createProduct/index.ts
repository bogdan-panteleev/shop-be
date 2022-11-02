import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

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
