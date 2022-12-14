import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Product } from '../models/product';
import Ajv from 'ajv';
import { validationSchema as createProductValidationSchema } from './createProduct/handler';
import { validationSchema as updateProductValidationSchema } from './updateProduct/handler';

export class ProductsService {
  constructor(
    private dbClient: DocumentClient,
    private dataTable: string,
    private keyGenerator: () => string
  ) {}

  getAll(): Promise<Product[]> {
    return this.dbClient
      .scan({ TableName: this.dataTable })
      .promise()
      .then((val) => val.Items as Product[]);
  }

  getById(id: string): Promise<Product | undefined> {
    return this.dbClient
      .get({ TableName: this.dataTable, Key: { id } })
      .promise()
      .then<Product | undefined>((val) => val.Item as Product | undefined);
  }

  create(product: Omit<Product, 'id'>): Promise<any> {
    const validate = new Ajv().compile(createProductValidationSchema);
    if (!validate(product)) {
      throw new Error(`Product validation failed with errors: ${JSON.stringify(validate.errors)}`);
    }
    return this.dbClient
      .put({
        TableName: this.dataTable,
        Item: {
          ...product,
          id: this.keyGenerator(),
          imageUrl: 'https://source.unsplash.com/random',
        },
      })
      .promise();
  }

  update(product: Partial<Product>): Promise<any> {
    const validate = new Ajv().compile(updateProductValidationSchema);
    if (!validate(product)) {
      throw new Error(`Product validation failed with errors: ${validate.errors}`);
    }
    return this.dbClient.put({ TableName: this.dataTable, Item: { ...product } }).promise();
  }

  deleteById(id: string): Promise<null> {
    return this.dbClient
      .delete({ TableName: this.dataTable, Key: { id } })
      .promise()
      .then(() => null);
  }
}
