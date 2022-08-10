import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { UserType } from './types/typeLibrary'
import { UserInitialStateType } from './reducers/userReducers';
// import { CartIntitialStateType } from './reducers/userReducers'




import {
  productListReducer,
  productDetailsReducer,
  // productDeleteReducer,
  // productCreateReducer,
  // productUpdateReducer,
  // productReviewCreateReducer,
  // productTopRatedReducer,
} from './reducers/productReducers'
// import { rootReducer } from './root-reducer';
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  // orderDeliverReducer,
  orderListMyReducer,
  // orderListReducer,
} from './reducers/orderReducers'


// type userLoginReducerType = {

// }(state: T, action: IAction<T>) => T;

// interface RootReducer {
//   userLogin: UserLoginType;
// }


const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
//   productDelete: productDeleteReducer,
//   productCreate: productCreateReducer,
//   productUpdate: productUpdateReducer,
//   productReviewCreate: productReviewCreateReducer,
//   productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
//   orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
//   orderList: orderListReducer,
})


// if (typeof userInfoFromStorage === 'string') {
//   JSON.parse(localStorage.getItem('userInfo') || '') 
//   }  


const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress') || '')
  : {}


// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo' || ''))
//   : {};



const userInfoStorage = localStorage.getItem('userInfo')
const userInfoFromStorage: UserType = userInfoStorage ? JSON.parse(userInfoStorage || '') : {};
  

const cartItemsFromStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems') || '') 
  : []

// const cartItemsFromStorage = localStorage.getItem('cartItems') || '' 
// let parse = [];

// if(typeof cartItemsFromStorage === 'string') {
//   parse = JSON.parse(localStorage.getItem('cartItems'))
// } else {
//   [] 
// }
 

// interface rootStateInterface {
//   userLogin: { loading?: boolean, error: string, userInfo: UserType },
// };


//so useLogin inst compatible wth the rest, where is the state comign from? work that out 
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  //something to do with these two, if userlogin is registerd in two places...
  userLogin: { 
    loading: false,
    error: '',
    userInfo: userInfoFromStorage 
  },
}
//console.log('info ', typeof userInfo)
const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState as any,
  composeWithDevTools(applyMiddleware(...middleware))
)
 
export default store;

// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>




//next - get this to work, from storage. work it through
//const initialState = {
  // cart: {
  //   cartItems: cartItemsFromStorage,
  //   shippingAddress: shippingAddressFromStorage,
  // },
  // orderCreate: {
  //   error: "",
  //   loading: false,
  //   order: {
  //     orderItems: [], 
  //     shippingAddress: '', 
  //     paymentMethod: '', 
  //     itemsPrice: '', 
  //     shippingPrice: ''
  //     },
  //   success: "",
  // },
  // orderDetails: {
  //   orderInitialState: {
  //     error: "",
  //     loading: false,
  //     order: {
  //       itemsPrice: "",
  //       orderItems: [],
  //       paymentMethod: "",
  //       shippingAddress: "",
  //       shippingPrice: "",
  //       taxPrice: "",
  //       totalPrice: "",
  //     },
  //     success: "",
  //   }
  // },
  
  // productList: {
  //   loading: false,
  //   products: [],
  //   productDetails: {
  //     loading: false,
  //     productDetails: [],
  //     products: [],
  //   },
  // },
  // userDetails: {
  //   error: "",
  //   loading: false,
  //   userInfo: {
  //     name: '', 
  //     email: '', 
  //     password: '', 
  //     isAdmin: 
  //     false, token: ''
  //   }  
  // },
  // //if you remove this, it still gives the same error. so this isn't the problem
  // // userInfo: userLoginReducer,
  // // userLogin: { userInfo: userLoginReducer },
  // userLogin: { 
  //   loading: false,
  //   error: '',
  //   userInfo: userInfoFromStorage 
  // },
  // userRegister: {
  //   error: "",
  //   loading: false,
  //   userInfo: {
  //     name: '', 
  //     email: '', 
  //     password: '', 
  //     isAdmin: 
  //     false, token: ''
  //   }  
  // },
  // userUpdateProfile: {
  //   error: "",
  //   loading: false,
  //   userInfo: {
  //     name: '', 
  //     email: '', 
  //     password: '', 
  //     isAdmin: 
  //     false, token: ''
  //   } 
  // }
//}
