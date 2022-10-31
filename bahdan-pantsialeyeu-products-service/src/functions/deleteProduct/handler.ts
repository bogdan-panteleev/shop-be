import { ProductsService } from '../products.service';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Handler } from 'aws-lambda';
import { HttpResponse } from '../../../../shared/httpResponse';

export function initDeleteProduct(productsService: ProductsService): Handler {
  async function deleteProduct(event: APIGatewayProxyEvent): Promise<HttpResponse> {
    console.log('deleteProduct is called');
    try {
      if (!event.pathParameters?.productId) {
        throw new Error(`path parameter 'productId' is required`);
      }

      const productId = event.pathParameters.productId;

      await productsService.deleteById(productId);
      return {
        statusCode: 200,
        body: { message: `Successfully deleted product with ID:${productId}` },
      };
    } catch (e: unknown) {
      console.log(`deleteProduct failed with error `, e);
      return {
        statusCode: 500,
        body: { message: e instanceof Error ? e.toString() : e },
      };
    }
  }

  return deleteProduct;
}
