import { CartActionType } from '../constants/cartConstants'
import { CartType, ShippingAddressType  } from '../types/typeLibrary'
import { CartActionTypes } from '../actions/cartActionTypes';


export interface CartInitialStateType {
    cartItems: Array<CartType>;
    shippingAddress: ShippingAddressType;
    paymentMethod: string;
  }

const CartInitialState: CartInitialStateType = {
  cartItems: [],
  shippingAddress: {
    address: '',
    city: '',
    postcode: '',
    country: ''
  },
  paymentMethod: ''
}

export const cartReducer = ( state = CartInitialState, action: CartActionTypes ) => {
  switch (action.type) {
    case CartActionType.CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CartActionType.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CartActionType.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CartActionType.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CartActionType.CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}