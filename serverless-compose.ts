const serverlessCompose = {
  services: {
    'authorize-service': {
      path: './bahdan-pantsialeyeu-authorization-service',
    },
    'products-service': {
      path: './bahdan-pantsialeyeu-products-service',
    },
    'import-service': {
      path: './bahdan-pantsialeyeu-import-service',
      params: {
        productsQueueUrl: '${products-service.queueUrl}',
        productsQueueArn: '${products-service.queueArn}',
        authorizerArn: '${authorize-service.authorizerArn}',
      },
    },
  },
};

module.exports = serverlessCompose;
