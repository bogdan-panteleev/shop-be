import { ProductsService } from './products.service';
import * as AWS from 'aws-sdk';
import { custom } from '../../custom';
import { v4 as uuid } from 'uuid';
import { initCreateProduct } from './createProduct/handler';
import { initGetProductById } from './getProductById/handler';
import { initGetProducts } from './getProducts/handler';
import { initDeleteProduct } from './deleteProduct/handler';
import { initUpdateProduct } from './updateProduct/handler';
import { middyfy } from '../libs/middlewares';

const productsService = new ProductsService(
  new AWS.DynamoDB.DocumentClient(),
  custom.productsTableName,
  uuid
);

export const createProduct = middyfy(initCreateProduct(productsService));
export const getProductById = middyfy(initGetProductById(productsService));
export const getProducts = middyfy(initGetProducts(productsService));
export const deleteProduct = middyfy(initDeleteProduct(productsService));
export const updateProduct = middyfy(initUpdateProduct(productsService));
