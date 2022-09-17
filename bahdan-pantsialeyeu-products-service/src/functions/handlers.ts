import { ProductsService } from './products.service';
import * as AWS from 'aws-sdk';
import { custom } from '../../custom';
import { v4 as uuid } from 'uuid';
import { initCreateProduct } from './createProduct/handler';
import { initGetProductById } from './getProductById/handler';
import { initGetProducts } from './getProducts/handler';
import { middyfy } from '../libs/lambda';
import { initDeleteProduct } from './deleteProduct/handler';
import { initUpdateProduct } from './updateProduct/handler';

const productsService = new ProductsService(
  new AWS.DynamoDB.DocumentClient(),
  custom.productsTableName,
  uuid
);

const createProduct = middyfy(initCreateProduct(productsService));
const getProductById = middyfy(initGetProductById(productsService));
const getProducts = middyfy(initGetProducts(productsService));
const deleteProduct = middyfy(initDeleteProduct(productsService));
const updateProduct = middyfy(initUpdateProduct(productsService));

export { createProduct, getProductById, getProducts, deleteProduct, updateProduct };
