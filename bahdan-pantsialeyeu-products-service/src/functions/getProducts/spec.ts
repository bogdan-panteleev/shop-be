import { initGetProducts } from './handler';
import { ProductsService } from '../products.service';
import { Product } from '../../models/product';

describe('getGoods', () => {
  it('should return all goods', async () => {
    const dataMock: Product[] = [
      { id: '1', title: '2', description: 'string', price: 1, count: 2, imageUrl: 'string' },
      { id: '2', title: '3', description: 'string', price: 2, count: 3, imageUrl: 'string2' },
    ];
    const serviceMock: ProductsService = {
      getAll() {
        return Promise.resolve(dataMock);
      },
    } as ProductsService;

    initGetProducts(serviceMock)().then((response) => {
      expect(JSON.parse(response.body)).toEqual(dataMock);
    });
  });

  it('should return error', async () => {
    const serviceMock: ProductsService = {
      getAll() {
        return Promise.reject({ message: 'Cannot connect to DB' });
      },
    } as ProductsService;

    initGetProducts(serviceMock)().catch((response) => {
      expect(JSON.parse(response.body)).toEqual({ message: 'Cannot connect to DB' });
    });
  });
});
