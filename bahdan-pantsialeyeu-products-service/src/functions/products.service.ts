import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Product } from '../models/product';

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
    return this.dbClient
      .put({ TableName: this.dataTable, Item: { ...product, id: this.keyGenerator() } })
      .promise();
  }
}
