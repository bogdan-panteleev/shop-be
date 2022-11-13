import { Handler } from 'aws-lambda';
import { HttpResponse } from '../../../../shared/httpResponse';

export function initBasicAuthorizer(): Handler {
  return async function basicAuthorizer(): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: 'hello!',
    };
  };
}
