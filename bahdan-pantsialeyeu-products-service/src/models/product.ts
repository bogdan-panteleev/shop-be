import { APIGatewayProxyEventBase } from 'aws-lambda/trigger/api-gateway-proxy';
import { APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda/common/api-gateway';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
  imageUrl: string;
}

export interface GatewayProxyEvent<T = { [k: string]: any }>
  extends Omit<APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>, 'body'> {
  body: null | T;
}
