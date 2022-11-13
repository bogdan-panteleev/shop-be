import { LambdaDefinition } from '../../../../shared/lambdaDefinition';
import { handlerPath, pathUp } from '../../../../shared/handler-resolver';

export const catalogBatchProcess: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.catalogBatchProcess`,
  events: [
    {
      sqs: {
        batchSize: 10,
        arn: {
          'Fn::GetAtt': ['sqsQueue', 'Arn'],
        },
      },
    },
  ],
};
