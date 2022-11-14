import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

export const importProductsFile: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              fileName: { required: true },
            },
          },
        },
        authorizer: {
          name: 'import-products-file-authorizer',
          arn: '${param:authorizerArn}',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        },
      },
    },
  ],
};
