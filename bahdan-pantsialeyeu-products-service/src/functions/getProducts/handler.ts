import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { ProductsService } from '../products.service';

export function initGetProducts(productsService: ProductsService) {
  async function getProducts() {
    console.log('getProducts called');
    try {
      console.log('getProducts successfully retrieved products');
      return formatJSONResponse(await productsService.getAll());
    } catch (e) {
      console.error('getProducts failed with error', e);
      return {
        statusCode: 503,
        body: JSON.stringify({ message: e.toString() }),
      };
    }
  }

  return middyfy(getProducts);
}
