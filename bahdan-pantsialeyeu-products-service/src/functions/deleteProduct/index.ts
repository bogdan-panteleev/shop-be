import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

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
