import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { dynamoDBClient } from '../../dynamo-db.provider';
import { custom } from '../../../custom';

export function init(dynamo) {
  async function createProduct(event): Promise<any> {
    const a = dynamoDBClient();
    await a
      .put({ TableName: custom.productsTableName, Item: { id: 'test', val: 'lalala' } })
      .promise();
    return formatJSONResponse({ text: 'successfull', event });
  }

  return middyfy(createProduct);
}
