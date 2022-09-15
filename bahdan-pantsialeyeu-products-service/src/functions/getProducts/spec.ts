import { productsMock } from '../../mocks/products.mock';
import { getProducts } from './handler';

describe('getGoods', () => {
  it('should return standard set of goods', async () => {
    return getProducts().then((goods) => {
      expect(JSON.parse(goods.body)).toEqual(productsMock);
    });
  });
});
