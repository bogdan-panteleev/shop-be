import { handlerPath, pathUp } from '../../libs/handler-resolver';
import { LambdaDefinition } from '../../models/lambdaDefinition';

export const deleteProduct: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.deleteProduct`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'products/{productId}',
        cors: true,
      },
    },
  ],
};
