import { LambdaDefinition } from '../../../../shared/lambdaDefinition';
import { handlerPath, pathUp } from '../../../../shared/handler-resolver';

export const importFileParserFunction: LambdaDefinition = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'bahdan-pantsialeyeu-import-service-bucket',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
            suffix: '.csv',
          },
        ],
        existing: true,
      },
    },
  ],
};
