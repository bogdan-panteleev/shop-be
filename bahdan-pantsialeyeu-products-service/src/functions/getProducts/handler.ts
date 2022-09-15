import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { ProductsService } from '../products.service';

export function initGetProducts(productsService: ProductsService) {
  async function getProducts() {
    try {
      const result = await productsService.getAll();

      return formatJSONResponse(result);
    } catch (e) {
      return {
        statusCode: 503,
        body: JSON.stringify({ message: e.toString() }),
      };
    }
  }

  return middyfy(getProducts);
}
