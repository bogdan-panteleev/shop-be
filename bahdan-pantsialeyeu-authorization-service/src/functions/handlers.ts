import { initBasicAuthorizer } from './basicAuthorizer/handler';
import { middyfy } from '../../../shared/middlewares';

export const basicAuthorizer = middyfy(initBasicAuthorizer());
