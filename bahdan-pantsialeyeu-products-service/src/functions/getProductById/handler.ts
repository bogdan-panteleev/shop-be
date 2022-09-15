import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { ProductsService } from '../products.service';

export function initGetProductById(productsService: ProductsService) {
  async function getProductById(event: APIGatewayProxyEvent): Promise<any> {
    try {
      const productId = event.pathParameters.productId;
      const result = await productsService.getById(productId);

      // if (!item) {
      //   return {
      //     statusCode: 404,
      //     body: JSON.stringify({ message: `Goods with ID:${productId} does not exist` }),
      //   };
      // }

      return formatJSONResponse(result);
    } catch (error: unknown) {
      return {
        statusCode: 503,
        body: JSON.stringify({ message: error.toString() }),
      };
    }
  }

  return middyfy(getProductById);
}
