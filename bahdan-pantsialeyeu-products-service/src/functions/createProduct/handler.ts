import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { ProductsService } from '../products.service';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Product } from '../../models/product';

export function initCreateProduct(productsService: ProductsService) {
  async function createProduct(event: APIGatewayProxyEvent): Promise<any> {
    console.log('createProduct called with body: ', event.body);
    try {
      await productsService.create(event.body as unknown as Product);
      console.log(`product successfully created for body ${event.body}`);

      return formatJSONResponse({ message: 'Product successfully created' });
    } catch (e) {
      console.error('createProduct error', e);
      return {
        statusCode: 503,
        body: JSON.stringify({ message: e.toString() }),
      };
    }
  }

  return middyfy(createProduct);
}
