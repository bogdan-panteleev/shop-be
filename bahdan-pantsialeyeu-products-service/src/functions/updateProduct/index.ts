import { handlerPath, pathUp } from '../../libs/handler-resolver';
import { LambdaDefinition } from '../../models/lambdaDefinition';

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
