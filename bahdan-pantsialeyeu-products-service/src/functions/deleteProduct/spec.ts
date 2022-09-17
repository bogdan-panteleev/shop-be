import { initDeleteProduct } from './handler';
import { ProductsService } from '../products.service';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

describe('deleteProduct', function () {
  it('should fail if productId is not provided', () => {
    return initDeleteProduct({} as ProductsService)({
      pathParameters: null,
    } as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 503 });
      expect(JSON.parse(response.body)).toEqual({
        message: `Error: path parameter 'productId' is required`,
      });
    });
  });

  it('should successfully delete product', () => {
    return initDeleteProduct({
      deleteById: (_id: string) => Promise.resolve(null),
    } as ProductsService)({
      pathParameters: { productId: '123' },
    } as unknown as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 200 });
      expect(JSON.parse(response.body)).toEqual({
        message: `Successfully deleted product with ID:123`,
      });
    });
  });
});
