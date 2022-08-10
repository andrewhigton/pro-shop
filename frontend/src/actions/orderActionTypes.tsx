import { OrderActionType, OrderActionPayType, OrderActionListType } from '../constants/orderConstants';
import { CartActionType } from '../constants/cartConstants';

type createOrderRequest = {
    type: OrderActionType.ORDER_CREATE_REQUEST
   }

type createOrderSuccess = {
  type: OrderActionType.ORDER_CREATE_SUCCESS,
  payload: {
        orderItems: Array<string>,
        shippingAddress: string,
        paymentMethod: string,
        itemsPrice: string,
        shippingPrice: string,
        taxPrice: string,
        totalPrice: string,
    },
}

type createOrderFail = {
  type: OrderActionType.ORDER_CREATE_FAIL,
  payload: string,
}

type createOrderReset = {
  type: CartActionType.CART_CLEAR_ITEMS,
  payload: string,
}

type orderDetailsRequest = {
    type: OrderActionType.ORDER_DETAILS_REQUEST
   }

type orderDetailsSuccess = {
  type: OrderActionType.ORDER_DETAILS_SUCCESS,
  payload: {
    loading: boolean, 
    orderItems: Array<string>, 
    shippingAddress: string,    
  }
}

type orderDetailsFail = {
  type: OrderActionType.ORDER_DETAILS_FAIL,
  payload: string,
}

export type OrderActionTypes = 
| createOrderRequest
| createOrderSuccess
| createOrderFail
| createOrderReset
| orderDetailsRequest
| orderDetailsFail
| orderDetailsSuccess
;

type orderPayRequest = {
  type: OrderActionPayType.ORDER_PAY_REQUEST,
  loading?: boolean
}

type orderPaySuccess = {
  type: OrderActionPayType.ORDER_PAY_SUCCESS,
  payload: string
  loading?: boolean,
  success?: boolean
}

type orderPayFail = {
  type: OrderActionPayType.ORDER_PAY_FAIL,
  loading?: boolean,
  payload: string
}

type orderPayReset = {
  type: OrderActionPayType.ORDER_PAY_RESET
}


export type OrderActionPayTypes = 
| orderPayRequest
| orderPaySuccess
| orderPayFail
| orderPayReset
;


type orderListRequest = {
  type: OrderActionListType.ORDER_LIST_MY_REQUEST,
  // loading?: boolean
}

type orderListSuccess = {
  type: OrderActionListType.ORDER_LIST_MY_SUCCESS,
  payload: string
  // loading?: boolean,
  // success?: boolean
}

type orderListFail = {
  type: OrderActionListType.ORDER_LIST_MY_FAIL,
  // loading?: boolean,
  payload: string
}

type orderListReset = {
  type: OrderActionListType.ORDER_LIST_MY_RESET
}

export type OrderActionListTypes = 
| orderListRequest
| orderListSuccess
| orderListFail
| orderListReset
;