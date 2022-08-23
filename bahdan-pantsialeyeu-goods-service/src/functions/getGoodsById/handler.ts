import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { goodsMock } from '../../mocks/goods.mock';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

const getGoodsById = async (event: APIGatewayProxyEvent) => {
  const goodsId = event.pathParameters.goodsId;
  const item = goodsMock.find((item) => item.id === goodsId);

  if (!item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Goods with ID:${goodsId} does not exist` }),
    };
  }

  return formatJSONResponse(item);
};

export const main = middyfy(getGoodsById);
