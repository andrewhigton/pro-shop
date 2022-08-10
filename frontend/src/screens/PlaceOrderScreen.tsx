import React, { useState, useEffect, FormEvent } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'; 
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'; 
import CheckoutSteps from '../components/CheckoutSteps';
import { RootState } from '../store';
import Message from '../components/Message';
import { savePaymentMethod } from '../actions/cartActions';
import { CartStateType, CreateOrderType } from '../types/typeLibrary'
import { createOrder } from '../actions/orderActions';
import { OrderActionType } from '../constants/orderConstants';
import { UserActionType } from '../constants/userConstants';


const PlaceOrderScreen: React.FC = () => {	

	const navigate = useNavigate();
	const dispatch = useDispatch()


	const cart: CartStateType = useSelector((state: RootState) => state.cart);

	//   Calculate prices
  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state: RootState) => state.orderCreate)
  const { order, success, error }: CreateOrderType = orderCreate

  useEffect(() => {
   	
    if (success) {
    
      navigate(`/order/${order._id}`)
      dispatch({ type: UserActionType.USER_DETAILS_RESET })
      dispatch({ type: OrderActionType.ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [success])

	const placeOrderHandler = () => {
		
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

	return (
			<>
			<CheckoutSteps step1 step2 step3 step4 />
				<Row>
					<Col md={8}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Address</strong>
									{cart.shippingAddress.address},
									{cart.shippingAddress.city},
									{cart.shippingAddress.postcode},
									{cart.shippingAddress.country}
								</p>
							</ListGroup.Item>
							
							<ListGroup.Item>
								<h2>Payment method</h2>
									<p>
										<strong>Method: </strong>
										{cart.paymentMethod}
									</p>  
							</ListGroup.Item>
						
							<ListGroup.Item>
								<h2>Order items</h2>
								{cart.cartItems.length === 0 ? ( <Message variant='danger'>Your cart is empty</ Message> ) : 
									(
									<ListGroup variant='flush'>
										{cart.cartItems.map((item, index) => (
											<ListGroup.Item key={index}>
												<Row>
													<Col md={1}>
														<Image 
														src={item.image} 
														alt={item.name}
														fluid
														rounded 
														/>
													</Col>
													<Col md={1}>
														<Link to={`/product/${item.product}`}>
															{item.name}
														</Link>
													</Col>
													<Col md={4}>
															{item.qty} x £{item.price} = £{item.qty * item.price}
													</Col>
												</Row>
											</ListGroup.Item> 
										))}
									</ListGroup>
									)}
							</ListGroup.Item>
						</ ListGroup>
					</Col>


					<Col md={4}>
			          <Card>
			            <ListGroup variant='flush'>
			              <ListGroup.Item>
			                <h2>Order Summary</h2>
			              </ListGroup.Item>
			              <ListGroup.Item>
			                <Row>
			                  <Col>Items</Col>
			                  <Col>${cart.itemsPrice}</Col>
			                </Row>
			              </ListGroup.Item>
			              <ListGroup.Item>
			                <Row>
			                  <Col>Shipping</Col>
			                  <Col>${cart.shippingPrice}</Col>
			                </Row>
			              </ListGroup.Item>
			              <ListGroup.Item>
			                <Row>
			                  <Col>Tax</Col>
			                  <Col>${cart.taxPrice}</Col>
			                </Row>
			              </ListGroup.Item>
			              <ListGroup.Item>
			                <Row>
			                  <Col>Total</Col>
			                  <Col>${cart.totalPrice}</Col>
			                </Row>
			              </ListGroup.Item>
			              <ListGroup.Item>
			                {error && <Message variant='danger'>{error}</Message>}
			              </ListGroup.Item>
			              <ListGroup.Item>
			                <Button
			                  type='button'
			                  className='btn-block'
			                  disabled={cart.cartItems.length === 0}
			                  onClick={placeOrderHandler}
			                >
			                  Place Order
			                </Button>
			              </ListGroup.Item>
			            </ListGroup>
			          </Card>
			          </Col>			
				</Row>	
			</>
			)
		};
			

export default PlaceOrderScreen;