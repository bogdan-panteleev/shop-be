import { productsMock } from '../../mocks/products.mock';
import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';

export const getProducts = async () => {
  return formatJSONResponse(productsMock);
};

export const main = middyfy(getProducts);
