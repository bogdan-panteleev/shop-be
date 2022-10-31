import { ProductsService } from '../products.service';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Product } from '../../models/product';
import { Handler } from 'aws-lambda';
import { HttpResponse } from '../../../../shared/httpResponse';

export function initCreateProduct(productsService: ProductsService): Handler {
  async function createProduct(event: APIGatewayProxyEvent): Promise<HttpResponse> {
    console.log('createProduct called with body: ', event.body);
    try {
      await productsService.create(event.body as unknown as Product);
      console.log(`product successfully created for body ${event.body}`);

      return { statusCode: 200, body: { message: 'Product successfully created' } };
    } catch (e: unknown) {
      console.error('createProduct error', e);
      return {
        statusCode: 500,
        body: { message: e },
      };
    }
  }

  return createProduct;
}

export const validationSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        count: { type: 'number' },
      },
      required: ['title', 'description', 'price', 'count'],
    },
  },
  required: ['body'],
};
