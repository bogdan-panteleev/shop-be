import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { formatJSONResponse } from '../../libs/api-gateway';
import { ProductsService } from '../products.service';

export function initGetProductById(productsService: ProductsService) {
  async function getProductById(event: APIGatewayProxyEvent): Promise<any> {
    console.log('getProductById is called');
    try {
      if (!event.pathParameters?.productId) {
        throw new Error(`path parameter 'productId' is required`);
      }
      const productId = event.pathParameters.productId;
      console.log('getProductById got productId as ', productId);

      const product = await productsService.getById(productId);

      if (product === undefined) {
        console.log(`getProductById product with id:${productId} does not exist`);
        return {
          statusCode: 404,
          body: JSON.stringify({ message: `Product with ID:${productId} does not exist` }),
        };
      }

      console.log('getProductById successfully returned product with id ', productId);
      return formatJSONResponse(product);
    } catch (error: unknown) {
      console.log(`getProductById failed with error `, error);
      return {
        statusCode: 503,
        body: JSON.stringify({ message: error instanceof Error ? error.toString() : error }),
      };
    }
  }

  return getProductById;
}
