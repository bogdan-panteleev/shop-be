import { SQSEvent } from 'aws-lambda';
import { HttpResponse } from '../../../../shared/httpResponse';
import { ProductsService } from '../products.service';
import { Product } from '../../models/product';

export function initCatalogBatchProcess(productsService: ProductsService, sns: AWS.SNS) {
  return async function catalogBatchProcessFunc(event: SQSEvent): Promise<HttpResponse> {
    console.log('catalogBatchProcess called with records ', event.Records);

    for (const record of event.Records) {
      const data = JSON.parse(record.body);
      console.log('processing record ', data);
      try {
        await productsService.create(data);
        console.log('product successfully created ', data);
        try {
          await sns
            .publish({
              Subject: `Product '${(data as Product).title}' is imported`,
              Message: `Hello!\nThe imported product with title '${
                (data as Product).title
              }' is created.\nFull product details: ${JSON.stringify(data)}`,
              TopicArn: process.env.SNS_TOPIC_ARN as string,
            })
            .promise();
        } catch (e) {
          console.log('failed to publish message to SNS with error', e);
        }
      } catch (e) {
        console.log(`failed to create product ${JSON.stringify(data)} with error ${e}`);
      }
    }

    return {
      statusCode: 200,
    };
  };
}
