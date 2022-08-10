export interface ProductType { 
      _id: string,
      name: string,
      image: string,
      description: string,
      brand: string,
      category: string,
      price: number,
      countInStock: number,
      rating: number,
      numReviews: number,  
  }

export type ProductDetailsType = {
        loading: boolean,
        error: string,
        product: ProductType
    }

export type CartType = {
    countInStock: number,
    image: string,
    name: string,
    price: number,
    product: string,
    qty: number,
  }

export type UserType = {
    _id?: any,
    userId?: string,
    name: string,
    email: string,
    password?: string,
    isAdmin?: boolean,
    token?: string
  }

export type UserProfileType = {
    loading: boolean,
    error: string,
    user: UserType,
    success?: boolean
  }

export type UserListType = {
    loading: boolean,
    error: string,
    users: Array<UserType> 
}

export type UserLoginType = {
    loading: boolean, 
    error: string,
    userInfo?: UserType
}

export type UserDeleteType = {
    success?: boolean | {};
}

export type ShippingAddressType = {
    address: string,
    city: string,
    postcode: string,
    country: string
}

export interface CartStateType {
      cartItems: Array<{
        countInStock: number,
        image: string,
        name: string,
        price: number,
        product: string,
        qty: number,
      }>,
      shippingAddress: {
        address: string,
        city: string,
        postcode: string,
        country: string
      },
      paymentMethod?: string,
      // itemsPrice?: number | undefined,
      itemsPrice?: any,
      shippingPrice?: any,
      taxPrice?: any,
      totalPrice?: any
  }

export type OrderType = {
        _id?: string,
        user?: UserType | undefined,
        isPaid?: boolean
        orderItems: Array<CartType>,
        shippingAddress: ShippingAddressType,
        paymentMethod?: string,
        itemsPrice: string,
        shippingPrice: number,
        taxPrice: number,
        totalPrice: number,
        createdAt?: string,
        paidAt?: string,
        updatedAt?: string,
        isDelivered?: boolean
    }


export type CreateOrderType = {
        order: OrderType;
        loading: boolean;
        success?: string,
        error: string
    }

export type OrderInitialStateType = {
        order: {
            _id?: string,
            orderItems?: Array<string>,
            shippingAddress?: ShippingAddressType,
            paymentMethod: string,
            itemsPrice: string,
            shippingPrice: string,
            taxPrice: string,
            totalPrice: string,
            user?: UserType | undefined,
            isPaid?: boolean
            createdAt?: string,
            paidAt?: string,
            updatedAt?: string,
            isDelivered?: boolean
            };
        loading: boolean,
        success: string,
        error: string
    }

export type myOrderListType = {
    orders: Array<OrderType>,
    loading: boolean,
    error: string
}

        