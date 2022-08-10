import { OrderActionType, OrderActionPayType, OrderActionListType } from '../constants/orderConstants';
import { CartActionType } from '../constants/cartConstants';
import { OrderActionTypes, OrderActionPayTypes,OrderActionListTypes } from '../actions/orderActionTypes';
import { OrderInitialStateType, OrderType, CreateOrderType } from '../types/typeLibrary';        

const OrderInitialState: OrderInitialStateType = {
   order: {
      orderItems: [],
      shippingAddress: {
        address: '',
        city: '',
        postcode: '',
        country: ''
      },
      createdAt: '',
      isDelivered: false,
      isPaid: false,
      paymentMethod: '',
      itemsPrice: '',
      shippingPrice: '',
      taxPrice: '',
      totalPrice: '',
   },
   loading: false,
   success: '',
   error: ''
}

export const orderCreateReducer = (state = OrderInitialState, action: OrderActionTypes ) => {
 
  switch (action.type) {
    case OrderActionType.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case OrderActionType.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case OrderActionType.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CartActionType.CART_CLEAR_ITEMS:
    // ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = OrderInitialState, action: OrderActionTypes ) => {
  switch (action.type) {
    case OrderActionType.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case OrderActionType.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case OrderActionType.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (
  state = OrderInitialState, action: OrderActionPayTypes) => {
  
  switch (action.type) {
    case OrderActionPayType.ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case OrderActionPayType.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case OrderActionPayType.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case OrderActionPayType.ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

// export const orderDeliverReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_DELIVER_REQUEST:
//       return {
//         loading: true,
//       }
//     case ORDER_DELIVER_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       }
//     case ORDER_DELIVER_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       }
//     case ORDER_DELIVER_RESET:
//       return {}
//     default:
//       return state
//   }
// }

export const orderListMyReducer = (state = { orders: [] }, action: OrderActionListTypes) => {
  switch (action.type) {
    case OrderActionListType.ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case OrderActionListType.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case OrderActionListType.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case OrderActionListType.ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

// export const orderListReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_REQUEST:
//       return {
//         loading: true,
//       }
//     case ORDER_LIST_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       }
//     case ORDER_LIST_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       }
//     default:
//       return state
//   }
// }