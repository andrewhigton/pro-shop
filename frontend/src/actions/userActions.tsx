import axios from 'axios';
import { Dispatch } from 'redux';
import { UserActionType } from '../constants/userConstants'
import { OrderActionListType } from '../constants/orderConstants'
import { UserActionTypes } from './userActionTypes';
import { RegisterActionTypes } from './userActionTypes';
import { OrderActionListTypes } from './orderActionTypes';
import { RootState } from '../store';
import store from '../store';
import { UserType, UserLoginType, UserProfileType } from '../types/typeLibrary';
// import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email: string, password: string) => async (dispatch: Dispatch<UserActionTypes>) => {
  try {
    dispatch({
      type: UserActionType.USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    //console.log('login data', data)

    dispatch({
      type: UserActionType.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error: any) {
    if (error) {
    dispatch({
      type: UserActionType.USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    }
  }
}

export const logout = () => (dispatch: Dispatch<UserActionTypes | OrderActionListTypes>) => {
  localStorage.removeItem('userInfo')
  // localStorage.removeItem('cartItems')
  // localStorage.removeItem('shippingAddress')
  // localStorage.removeItem('paymentMethod')
  dispatch({ type: UserActionType.USER_LOGOUT })
  dispatch({ type: UserActionType.USER_DETAILS_RESET })
  dispatch({ type: OrderActionListType.ORDER_LIST_MY_RESET })
  dispatch({ type: UserActionType.USER_LIST_RESET })
  document.location.href = '/login'
}

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch<RegisterActionTypes | UserActionTypes>) => {
  try {
    dispatch({
      type: UserActionType.USER_REGISTER_REQUEST,
    })
   
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: UserActionType.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: UserActionType.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error: any) {
    if (error) {
    dispatch({
      type: UserActionType.USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
   }
  }
}

export const getUserDetails = (id: string) => async (dispatch: Dispatch<UserActionTypes>, getState: RootState ) => {
  try {
    dispatch({
      type: UserActionType.USER_DETAILS_REQUEST,
    })
      //console.log('called1')
    const {
      userLogin: { userInfo },
    }: any = store.getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: UserActionType.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    if (error) {
    const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({ type: UserActionType.USER_LOGOUT })
      //dispatch({ type: UserActionType.USER_DETAILS_RESET })
      dispatch({
      type: UserActionType.USER_DETAILS_FAIL,
      payload: message,
    })
      // dispatch(logoutUser())
    }
    
  }
  }
}

export const updateUserProfile = (user: UserType) => async (dispatch: Dispatch<UserActionTypes>, getState: RootState) => {
  //console.log('action user ',user)

  try {
    dispatch({
      type: UserActionType.USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    }: any = store.getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)
   
    dispatch({
      type: UserActionType.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: UserActionType.USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error: any) {
    if (error) {
    const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({ type: UserActionType.USER_LOGOUT })
      dispatch({ type: UserActionType.USER_DETAILS_RESET })
    }
    dispatch({
      type: UserActionType.USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
  }
}

export const listUsers = () => async (dispatch: Dispatch<UserActionTypes>, getState: RootState) => {
  try {
    dispatch({
      type: UserActionType.USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    }: any = store.getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)
    
    dispatch({
      type: UserActionType.USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({ type: UserActionType.USER_LOGOUT })
    }
    dispatch({
      type: UserActionType.USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id: string) => async (dispatch: Dispatch<UserActionTypes>, getState: RootState) => {
  try {
    dispatch({
      type: UserActionType.USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    }: any = store.getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: UserActionType.USER_DELETE_SUCCESS })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({ type: UserActionType.USER_LOGOUT })
    }
    dispatch({
      type: UserActionType.USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateUser = (user: UserType) => async (dispatch: Dispatch<UserActionTypes>, getState: RootState) => {
  
  console.log('user ', user)
  try {
    dispatch({
      type: UserActionType.USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    }: any = store.getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: UserActionType.USER_UPDATE_SUCCESS })

    dispatch({ type: UserActionType.USER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: UserActionType.USER_DETAILS_RESET })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch({ type: UserActionType.USER_LOGOUT })
    }
    dispatch({
      type: UserActionType.USER_UPDATE_FAIL,
      payload: message,
    })
  }
}