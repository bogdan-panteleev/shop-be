import { getGoodsById } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Good } from '../../mocks/goods.mock';

describe('getGoodsById', () => {
  it('should fail if path parameters not specified', async () => {
    return getGoodsById({ pathParameters: null } as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 503 });
      expect(JSON.parse(response.body)).toEqual({
        message: "TypeError: Cannot read property 'goodsId' of null",
      });
    });
  });

  it('should return 404 for non-existing product', async () => {
    return getGoodsById({
      pathParameters: { goodsId: 'non existing' },
    } as unknown as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 404 });
      expect(JSON.parse(response.body)).toEqual({
        message: `Goods with ID:non existing does not exist`,
      });
    });
  });

  it('should return correct goods', async () => {
    return getGoodsById({
      pathParameters: { goodsId: '1' },
    } as unknown as APIGatewayProxyEvent).then((response) => {
      expect(response).toMatchObject({ statusCode: 200 });
      expect(JSON.parse(response.body)).toEqual<Good>({
        description: 'Fencing Gloves',
        id: '1',
        imageUrl: 'https://source.unsplash.com/random',
      });
    });
  });
});
