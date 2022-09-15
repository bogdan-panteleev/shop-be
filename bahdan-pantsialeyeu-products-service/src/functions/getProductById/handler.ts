import { productsMock } from '../../mocks/products.mock';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  try {
    const productId = event.pathParameters.productId;
    const item = productsMock.find((item) => item.id === productId);

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Goods with ID:${productId} does not exist` }),
      };
    }

    return formatJSONResponse(item);
  } catch (error: unknown) {
    return {
      statusCode: 503,
      body: JSON.stringify({ message: error.toString() }),
    };
  }
};

export const main = middyfy(getProductById);
