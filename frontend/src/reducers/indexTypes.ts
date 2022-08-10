import { ActionType } from '../constants/productConstants';

type loadProducts = {
  type: ActionType.PRODUCT_LIST_SUCCESS;
  payload: {
        loading: boolean,
        products: [],
        // pages?: [],
        // page?: [],
      };
}

type requestProducts = {
  type: ActionType.PRODUCT_LIST_REQUEST;
}

type productsFail = {
  type: ActionType.PRODUCT_LIST_FAIL;
  //needs to be an object
  payload:  { 
      message: string,
      stack: string,
    }
}

type requestProductDetails = {
  type: ActionType.PRODUCT_DETAILS_REQUEST;
}

type loadProductDetails = {
  type: ActionType.PRODUCT_DETAILS_SUCCESS;
  payload:  { 
      product: string,
      loading: boolean,
    }
}

type loadProductDetailsFail = {
  type: ActionType.PRODUCT_DETAILS_FAIL;
  payload:  { 
      error: string,
      // loading: boolean,
    }
}


export type ActionProducts =
  | loadProducts
  | requestProducts
  | productsFail 
  | requestProductDetails
  | loadProductDetails
  | loadProductDetailsFail 
  ;
