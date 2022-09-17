import { ProductsService } from '../products.service';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { formatJSONResponse } from '../../libs/api-gateway';

export function initDeleteProduct(productsService: ProductsService) {
  async function deleteProduct(event: APIGatewayProxyEvent) {
    console.log('deleteProduct is called');
    try {
      if (!event.pathParameters?.productId) {
        throw new Error(`path parameter 'productId' is required`);
      }

      const productId = event.pathParameters.productId;

      await productsService.deleteById(productId);
      return formatJSONResponse({ message: `Successfully deleted product with ID:${productId}` });
    } catch (e: unknown) {
      console.log(`deleteProduct failed with error `, e);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: e instanceof Error ? e.toString() : e }),
      };
    }
  }

  return deleteProduct;
}
