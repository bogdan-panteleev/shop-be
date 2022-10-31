import { ProductsService } from '../products.service';
import { GatewayProxyEvent, Product } from '../../models/product';
import { Handler } from 'aws-lambda';
import { HttpResponse } from '../../../../shared/httpResponse';

export function initUpdateProduct(productsService: ProductsService): Handler {
  async function updateProduct(event: GatewayProxyEvent<Product>): Promise<HttpResponse> {
    console.log('updateProduct is called');
    try {
      if (!event.pathParameters?.productId) {
        throw new Error(`path parameter 'productId' is required`);
      }
      if (!event.body) {
        throw new Error(`request body is required`);
      }
      const productId = event.pathParameters.productId;
      console.log(`updateProduct got productId as ${productId} and body as ${event.body}`);

      const product: Product = { ...event.body, id: productId };
      await productsService.update(product);

      console.log('updateProduct successfully updated product with to ', product);
      return { statusCode: 200, body: { message: 'Product successfully updated' } };
    } catch (error: unknown) {
      console.log(`updateProduct failed with error `, error);
      return {
        statusCode: 500,
        body: { message: error instanceof Error ? error.toString() : error },
      };
    }
  }

  return updateProduct;
}

export const validationSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        count: { type: 'number' },
      },
      required: ['id'],
    },
  },
  required: ['body'],
};
