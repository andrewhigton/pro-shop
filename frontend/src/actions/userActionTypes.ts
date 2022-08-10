import { UserActionType } from '../constants/userConstants';

type loginUserRequest = {
  type: UserActionType.USER_LOGIN_REQUEST;
}

  
type loginUserSuccess = {
    type: UserActionType.USER_LOGIN_SUCCESS;
    payload: {};
}

type loginUserFail = {
    type: UserActionType.USER_LOGIN_FAIL;
    payload: unknown
}

type logoutUser = {
    type: UserActionType.USER_LOGOUT;
}

type resetUserDetails = {
    type: UserActionType.USER_DETAILS_RESET;
    // payload: {}
}


type userDetailsRequest = {
  type: UserActionType.USER_DETAILS_REQUEST;
}
  
type userDetailsSuccess = {
    type: UserActionType.USER_DETAILS_SUCCESS;
    payload: {};
}

type userDetailsFail = {
    type: UserActionType.USER_DETAILS_FAIL;
    payload: unknown
}


type userUpdateProfileRequest = {
  type: UserActionType.USER_UPDATE_PROFILE_REQUEST;
}
  
type userUpdateProfileSuccess = {
    type: UserActionType.USER_UPDATE_PROFILE_SUCCESS;
    payload: {};
}

type userUpdateProfileFail = {
    type: UserActionType.USER_UPDATE_PROFILE_FAIL;
    payload: unknown
}

type userUpdateProfileReset = {
    type: UserActionType.USER_UPDATE_PROFILE_RESET;
    payload: {}
}

type userListRequest = {
  type: UserActionType.USER_LIST_REQUEST;
}
  
type userListSuccess = {
    type: UserActionType.USER_LIST_SUCCESS;
    payload: {};
}

type userListFail = {
    type: UserActionType.USER_LIST_FAIL;
    payload: unknown
}

type userListReset = {
    type: UserActionType.USER_LIST_RESET;
}

type userDeleteRequest = {
  type: UserActionType.USER_DELETE_REQUEST;
}
  
type userDeleteSuccess = {
    type: UserActionType.USER_DELETE_SUCCESS;
}

type userDeleteFail = {
    type: UserActionType.USER_DELETE_FAIL;
    payload: string
}

type userUpdateRequest = {
  type: UserActionType.USER_UPDATE_REQUEST;
}
  
type userUpdateSuccess = {
    type: UserActionType.USER_UPDATE_SUCCESS;
}

type userUpdateFail = {
    type: UserActionType.USER_UPDATE_FAIL;
    payload: string
}

type userUpdateReset = {
    type: UserActionType.USER_UPDATE_RESET;
    payload: string
}


export type UserActionTypes = 
| loginUserRequest
| loginUserSuccess
| loginUserFail
| logoutUser
| resetUserDetails
| userDetailsRequest
| userDetailsSuccess
| userDetailsFail
| userUpdateProfileRequest
| userUpdateProfileReset
| userUpdateProfileSuccess
| userUpdateProfileFail
| userListRequest
| userListSuccess
| userListFail
| userListReset
| userDeleteRequest
| userDeleteSuccess
| userDeleteFail
| userUpdateRequest
| userUpdateSuccess
| userUpdateFail
| userUpdateReset
;

type registerRequest = {
  type: UserActionType.USER_REGISTER_REQUEST;
}
  
type registerSuccess = {
    type: UserActionType.USER_REGISTER_SUCCESS;
    payload: {};
}

type registerFail = {
    type: UserActionType.USER_REGISTER_FAIL;
    payload: unknown
}

export type RegisterActionTypes = 
| registerRequest
| registerSuccess
| registerFail
;