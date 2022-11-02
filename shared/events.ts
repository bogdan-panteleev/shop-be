import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';

export interface GatewayProxyEvent<T = { [k: string]: any }>
  extends Omit<APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>, 'body'> {
  body: null | T;
}
