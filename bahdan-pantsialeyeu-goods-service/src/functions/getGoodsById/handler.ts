import { goodsMock } from '../../mocks/goods.mock';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

export const getGoodsById = async (event: APIGatewayProxyEvent) => {
  try {
    const goodsId = event.pathParameters.goodsId;
    const item = goodsMock.find((item) => item.id === goodsId);

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Goods with ID:${goodsId} does not exist` }),
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

export const main = middyfy(getGoodsById);
