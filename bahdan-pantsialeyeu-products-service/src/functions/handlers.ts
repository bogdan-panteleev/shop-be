import { ProductsService } from './products.service';
import * as AWS from 'aws-sdk';
import { custom } from '../../custom';
import { v4 as uuid } from 'uuid';
import {
  initCreateProduct,
  validationSchema as createProductValidationSchema,
} from './createProduct/handler';
import { initGetProductById } from './getProductById/handler';
import { initGetProducts } from './getProducts/handler';
import { initDeleteProduct } from './deleteProduct/handler';
import {
  initUpdateProduct,
  validationSchema as updateProductValidationSchema,
} from './updateProduct/handler';
import { middyfy } from '../libs/middlewares';
import validator from '@middy/validator';

const productsService = new ProductsService(
  new AWS.DynamoDB.DocumentClient(),
  custom.productsTableName,
  uuid
);

export const createProduct = middyfy(initCreateProduct(productsService)).use(
  validator({ inputSchema: createProductValidationSchema })
);

export const getProductById = middyfy(initGetProductById(productsService));
export const getProducts = middyfy(initGetProducts(productsService));
export const deleteProduct = middyfy(initDeleteProduct(productsService));
export const updateProduct = middyfy(initUpdateProduct(productsService)).use(
  validator({ inputSchema: updateProductValidationSchema })
);
