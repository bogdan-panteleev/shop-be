import { goodsMock } from '../../mocks/goods.mock';
import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';

export const getGoods = async () => {
  return formatJSONResponse(goodsMock);
};

export const main = middyfy(getGoods);
