import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

export const getProductById: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
      },
    },
  ],
};
