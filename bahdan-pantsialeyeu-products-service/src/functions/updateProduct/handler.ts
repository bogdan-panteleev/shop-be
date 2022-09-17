import { ProductsService } from '../products.service';
import { formatJSONResponse } from '../../libs/api-gateway';
import { GatewayProxyEvent, Product } from '../../models/product';

export function initUpdateProduct(productsService: ProductsService) {
  async function updateProduct(event: GatewayProxyEvent<Product>): Promise<any> {
    console.log('updateProduct is called');
    try {
      if (!event.pathParameters?.productId) {
        throw new Error(`path parameter 'productId' is required`);
      }
      const productId = event.pathParameters.productId;
      console.log(`updateProduct got productId as ${productId} and body as ${event.body}`);

      const product: Product = { ...event.body, id: productId };
      await productsService.update(product);

      console.log('updateProduct successfully updated product with to ', product);
      return formatJSONResponse({ message: 'Product successfully updated' });
    } catch (error: unknown) {
      console.log(`updateProduct failed with error `, error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error instanceof Error ? error.toString() : error }),
      };
    }
  }

  return updateProduct;
}
