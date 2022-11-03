import { getProducts } from './getProducts';
import { getProductById } from './getProductById';
import { createProduct } from './createProduct';
import { deleteProduct } from './deleteProduct';
import { updateProduct } from './updateProduct';
import { catalogBatchProcess } from './catalogBatchProcess';

export const functions = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  catalogBatchProcess,
};
