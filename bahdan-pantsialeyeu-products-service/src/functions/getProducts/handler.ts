import { ProductsService } from '../products.service';
import { Handler } from 'aws-lambda';
import { HttpResponse } from '../../models/httpResponse';

export function initGetProducts(productsService: ProductsService): Handler {
  async function getProducts(): Promise<HttpResponse> {
    console.log('getProducts called');
    try {
      console.log('getProducts successfully retrieved products');
      return { statusCode: 200, body: await productsService.getAll() };
    } catch (e: unknown) {
      console.error('getProducts failed with error', e);
      return {
        statusCode: 500,
        body: { message: e },
      };
    }
  }

  return getProducts;
}
