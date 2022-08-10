import { ActionType } from '../constants/productConstants';
import { CartActionType } from '../constants/cartConstants';


type loadProducts = {
  type: ActionType.PRODUCT_LIST_SUCCESS;
  payload: {
        loading: boolean,
        products: [],
      };
}

type requestProducts = {
  type: ActionType.PRODUCT_LIST_REQUEST;
}

type productsFail = {
  type: ActionType.PRODUCT_LIST_FAIL;
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
      error: string
    }
}


export type ProductActionTypes =
  | loadProducts
  | requestProducts
  | productsFail 
  | requestProductDetails
  | loadProductDetails
  | loadProductDetailsFail 
  ;


type addCartItem = {
  type: CartActionType.CART_ADD_ITEM;
  payload: {
      product: string,
      name: string,
      image: string,
      price: number,
      countInStock: number,
      qty: number
    },
} 

type saveShippingAddress = {
    type: CartActionType.CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      address: string,
      city: string,
      postcode: string,
      country: string
    },
   }

type removeCartItem = {
  type: CartActionType.CART_REMOVE_ITEM,
  payload: string,
}

type savePaymentMethod = {
  type: CartActionType.CART_SAVE_PAYMENT_METHOD,
  payload: string,
}

type cartClearItems = {
  type: CartActionType.CART_CLEAR_ITEMS,
  cartItems: [],
}

export type CartActionTypes = 
| addCartItem
| removeCartItem
| saveShippingAddress
| savePaymentMethod
| cartClearItems
;