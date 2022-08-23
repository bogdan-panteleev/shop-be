import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { goodsMock } from '../../mocks/goods.mock';

const getGoods = async () => {
  return formatJSONResponse(goodsMock);
};

export const main = middyfy(getGoods);
