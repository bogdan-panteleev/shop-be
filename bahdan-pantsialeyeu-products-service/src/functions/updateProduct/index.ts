import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

export const updateProduct: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.updateProduct`,
  events: [
    {
      http: {
        method: 'put',
        path: 'products/{productId}',
        cors: true,
      },
    },
  ],
};
