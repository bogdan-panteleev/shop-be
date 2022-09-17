import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Product } from '../../models/product';
import { initGetProductById } from './handler';
import { ProductsService } from '../products.service';

describe('getGoodsById', () => {
  it('should fail if path parameters not specified', async () => {
    return initGetProductById({} as ProductsService)({
      pathParameters: null,
    } as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 503 });
      expect(JSON.parse(response.body)).toEqual({
        message: `Error: path parameter 'productId' is required`,
      });
    });
  });

  it('should return 404 for non-existing product', async () => {
    return initGetProductById({
      getById(_id: string) {
        return Promise.resolve(undefined);
      },
    } as ProductsService)({
      pathParameters: { productId: 'non_existing' },
    } as unknown as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 404 });
      expect(JSON.parse(response.body)).toEqual({
        message: 'Product with ID:non_existing does not exist',
      });
    });
  });

  it('should return correct product', async () => {
    const productMock = {
      id: '0',
      title: '1',
      description: '2',
      count: 3,
      price: 4,
      imageUrl: '5',
    };
    return initGetProductById({
      getById(_id: string) {
        return Promise.resolve(productMock);
      },
    } as ProductsService)({
      pathParameters: { productId: '1' },
    } as unknown as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 200 });
      expect(JSON.parse(response.body)).toEqual<Product>(productMock);
    });
  });
});
