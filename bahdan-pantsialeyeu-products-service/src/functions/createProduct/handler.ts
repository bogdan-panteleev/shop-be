import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { ProductsService } from '../products.service';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Product } from '../../models/product';

export function initCreateProduct(productsService: ProductsService) {
  async function createProduct(event: APIGatewayProxyEvent): Promise<any> {
    const res = await productsService.create(event.body as unknown as Product);
    return formatJSONResponse({ res });
  }

  return middyfy(createProduct);
}
