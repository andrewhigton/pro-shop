import axios from 'axios';
import { Dispatch } from 'redux';
import { CartActionType } from '../constants/cartConstants'
import { OrderActionType, OrderActionPayType } from '../constants/orderConstants'
import { CreateOrderType, OrderType } from '../types/typeLibrary';
import { RootState } from '../store';
import { OrderActionTypes, OrderActionPayTypes, OrderActionListTypes } from './orderActionTypes';
import { UserActionTypes } from './userActionTypes';
import { CartActionTypes } from './cartActionTypes';
import { UserActionType } from '../constants/userConstants';
import { OrderActionListType } from '../constants/orderConstants';
import { logout } from './userActions'



export const createOrder = (order: OrderType) => async (dispatch: Dispatch<OrderActionTypes | UserActionTypes | CartActionTypes> , getState: RootState) => {
  
  try {
    dispatch({
      type: OrderActionType.ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
      // @ts-ignore.
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log('order actions ', order)

    const { data } = await axios.post(`/api/orders`, order, config)
    console.log('data ',data)
    dispatch({
      type: OrderActionType.ORDER_CREATE_SUCCESS,
      payload: data,
    })
    // dispatch({
    //   type: CartActionType.CART_CLEAR_ITEMS,
    //   payload: data,
    // })
    localStorage.removeItem('cartItems')
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
       dispatch({
      type: UserActionType.USER_LOGOUT,
    })
    }
    dispatch({
      type: OrderActionType.ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id: string | undefined) => async (
  dispatch: Dispatch<OrderActionTypes | UserActionTypes>, 
  getState: RootState
  ) => {
  
  try {
    dispatch({
      type: OrderActionType.ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
       // @ts-ignore.
    } = getState()
    
  
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)
  
    dispatch({
      type: OrderActionType.ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
       dispatch({
      type: UserActionType.USER_LOGOUT,
      })
    }
    dispatch({
      type: OrderActionType.ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId: string, paymentResult: boolean) => async (
  dispatch: Dispatch<OrderActionPayTypes | UserActionTypes>,
  getState: RootState
  ) => {
  try {
    dispatch({
      type: OrderActionPayType.ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
          // @ts-ignore.
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: OrderActionPayType.ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({
      type: UserActionType.USER_LOGOUT,
      })
    }
    dispatch({
      type: OrderActionPayType.ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch:Dispatch<OrderActionListTypes | UserActionTypes>, getState: RootState) => {
  try {
    dispatch({
      type: OrderActionListType.ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
     // @ts-ignore.
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: OrderActionListType.ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({
      type: UserActionType.USER_LOGOUT,
      })
    }
    dispatch({
      type: OrderActionListType.ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}


// export const deliverOrder = (order) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_DELIVER_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.put(
//       `/api/orders/${order._id}/deliver`,
//       {},
//       config
//     )

//     dispatch({
//       type: ORDER_DELIVER_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: ORDER_DELIVER_FAIL,
//       payload: message,
//     })
//   }
// }


// export const listOrders = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_LIST_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.get(`/api/orders`, config)

//     dispatch({
//       type: ORDER_LIST_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: ORDER_LIST_FAIL,
//       payload: message,
//     })
//   }
// }