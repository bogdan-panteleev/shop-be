const serverlessCompose = {
  services: {
    'products-service': {
      path: './bahdan-pantsialeyeu-products-service',
    },

    'import-service': {
      path: './bahdan-pantsialeyeu-import-service',
      params: {
        productsQueueUrl: '${products-service.queueUrl}',
        productsQueueArn: '${products-service.queueArn}',
      },
    },
  },
};

module.exports = serverlessCompose;
