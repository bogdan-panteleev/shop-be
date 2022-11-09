import { LambdaDefinition } from '../../../../shared/lambdaDefinition';
import { handlerPath, pathUp } from '../../../../shared/handler-resolver';

export const importFileParserFunction: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.importFileParser`,
  events: [{ s3: 'importsBucket' }],
};
