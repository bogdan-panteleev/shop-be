import { handlerPath, pathUp } from '../../../../shared/handler-resolver';

export const importProductsFile = {
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
      },
    },
  ],
};
