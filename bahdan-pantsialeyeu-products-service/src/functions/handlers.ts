import { ProductsService } from './products.service';
import * as AWS from 'aws-sdk';
import { custom } from '../../custom';
import { v4 as uuid } from 'uuid';
import { initCreateProduct } from './createProduct/handler';
import { initGetProductById } from './getProductById/handler';
import { initGetProducts } from './getProducts/handler';

const productsService = new ProductsService(
  new AWS.DynamoDB.DocumentClient(),
  custom.productsTableName,
  uuid
);

export default {
  createProduct: initCreateProduct(productsService),
  getProductById: initGetProductById(productsService),
  getProducts: initGetProducts(productsService),
};
