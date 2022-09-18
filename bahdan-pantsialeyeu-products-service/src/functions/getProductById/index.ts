import { handlerPath, pathUp } from '../../libs/handler-resolver';
import { LambdaDefinition } from '../../models/lambdaDefinition';

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
