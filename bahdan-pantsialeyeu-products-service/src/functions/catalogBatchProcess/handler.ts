import { SQSEvent } from 'aws-lambda';
import { HttpResponse } from '../../../../shared/httpResponse';
import { ProductsService } from '../products.service';

export function initCatalogBatchProcess(_productsService: ProductsService) {
  return async function catalogBatchProcessFunc(event: SQSEvent): Promise<HttpResponse> {
    console.log('catalogBatchProcess called with records ', event.Records);

    event.Records.forEach((record) => {
      const data = JSON.parse(record.body);
      console.log('processing record ', data);
    });

    return {
      statusCode: 200,
    };
  };
}
