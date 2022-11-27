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
          arn: 'arn:aws:cognito-idp:eu-central-1:398158581759:userpool/eu-central-1_zWrXaVUQ6',
          // resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'COGNITO_USER_POOLS',
        },
      },
    },
  ],
};
