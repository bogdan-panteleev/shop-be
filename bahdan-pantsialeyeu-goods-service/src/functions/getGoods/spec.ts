import { goodsMock } from '../../mocks/goods.mock';
import { getGoods } from './handler';

describe('getGoods', () => {
  it('should return standard set of goods', async () => {
    return getGoods().then((goods) => {
      expect(JSON.parse(goods.body)).toEqual(goodsMock);
    });
  });
});
