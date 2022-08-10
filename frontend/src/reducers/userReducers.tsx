import { UserActionType } from '../constants/userConstants'
import { UserActionTypes } from '../actions/userActionTypes'
import { RegisterActionTypes } from '../actions/userActionTypes'
import { UserType } from '../types/typeLibrary'

export interface UserInitialStateType {
    loading: boolean;
    error: string;
    userInfo: UserType;
    users?: Array<string>
  }

export const UserInitialState: UserInitialStateType = {
  loading: false,
  error: '',
  userInfo: {
  	_id: '',
    name: '',
  	email: '',
    password: '',
    isAdmin: false,
    token: ''	
  },
}


export const userLoginReducer = (state = UserInitialState, action: UserActionTypes) => {
// console.log('login state ', state)
  switch (action.type) {

    case UserActionType.USER_LOGIN_REQUEST:
      return { loading: true }
    case UserActionType.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case UserActionType.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case UserActionType.USER_LOGOUT:
      return { loading: false, userInfo: {} }
      // return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = UserInitialState, action: RegisterActionTypes | UserActionTypes) => {

  switch (action.type) {
    case UserActionType.USER_REGISTER_REQUEST:
      return { loading: true }
    case UserActionType.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case UserActionType.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case UserActionType.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = UserInitialState, action: UserActionTypes ) => {
  
  switch(action.type) {
    case UserActionType.USER_DETAILS_REQUEST:
      return { ...state, loading: true}
    case UserActionType.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case UserActionType.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case UserActionType.USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = UserInitialState, action: UserActionTypes) => {
  
  switch (action.type) {
    case UserActionType.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case UserActionType.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case UserActionType.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case UserActionType.USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionType.USER_LIST_REQUEST:
      return { loading: true }
    case UserActionType.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case UserActionType.USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case UserActionType.USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action: UserActionTypes) => {
  
  switch (action.type) {
    case UserActionType.USER_DELETE_REQUEST:
      return { loading: true }
    case UserActionType.USER_DELETE_SUCCESS:
        return { loading: false, success: true }
    case UserActionType.USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionType.USER_UPDATE_REQUEST:
      return { loading: true }
    case UserActionType.USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case UserActionType.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case UserActionType.USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}