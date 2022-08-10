import axios from 'axios'
import { Dispatch } from 'redux';
import { CartActionType } from '../constants/cartConstants'
import { CartActionTypes } from './cartActionTypes';
import { ShippingAddressType } from '../types/typeLibrary';


export const addToCart = (id: string, qty: number) => async (dispatch: Dispatch<CartActionTypes>, getState: any) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CartActionType.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: string) => (dispatch: Dispatch<CartActionTypes>, getState: any) => {
  dispatch({
    type: CartActionType.CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data: ShippingAddressType  ) => (dispatch: Dispatch<CartActionTypes>) => {
  dispatch({
    type: CartActionType.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data: string) => (dispatch:Dispatch<CartActionTypes>) => {
  dispatch({
    type: CartActionType.CART_SAVE_PAYMENT_METHOD,
    //what type is data here
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}