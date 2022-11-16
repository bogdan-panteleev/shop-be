import { handlerPath, pathUp } from '../../../../shared/handler-resolver';
import { LambdaDefinition } from '../../../../shared/lambdaDefinition';

export const basicAuthorizer: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.basicAuthorizer`,
};
