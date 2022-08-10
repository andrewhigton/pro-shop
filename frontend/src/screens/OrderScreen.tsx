import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useNavigate, useParams  } from 'react-router-dom'
// import { usePath  } from 'react-router'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  // deliverOrder,
} from '../actions/orderActions'
import { CreateOrderType } from '../types/typeLibrary'
import { OrderActionPayType
  // ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen: React.FC = () => {
  
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //fix this. undefined?
  const orderId: any = params.id
 
  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state: RootState) => state.orderDetails)
  const { order, loading, error }: CreateOrderType = orderDetails
 
  useEffect(() => {
      if(order === undefined) {
        dispatch(getOrderDetails(orderId))
    } 
  }, [order, orderId])

  const orderPay = useSelector((state: RootState) => state.orderPay)
  const { loading: loadingPay, success: successPay }: CreateOrderType = orderPay

  // const orderDeliver = useSelector((state) => state.orderDeliver)
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state: RootState) => state.userLogin)
  const { userInfo } = userLogin

  let itemsPrice;

  if (!loading && order) {
    //   Calculate prices
    const addDecimals = (num: number) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    // if (!order || successPay || successDeliver || order._id !== orderId) {
      if (!order || successPay || order._id !== orderId) {
      dispatch({ type: OrderActionPayType.ORDER_PAY_RESET })
      // dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  // }, [dispatch, orderId, successPay, successDeliver, order])
}, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult: boolean) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  // const deliverHandler = () => {
  //   dispatch(deliverOrder(order))
  // }


return loading || !order || !order.user ?  (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postcode},{' '}
                {order.shippingAddress.country}
              </p>
              {/*{order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}*/}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='danger'>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
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
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )
            
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen


// {loadingDeliver && <Loader />}
//               {userInfo &&
//                 userInfo.isAdmin &&
//                 order.isPaid &&
//                 !order.isDelivered && (
//                   <ListGroup.Item>
//                     <Button
//                       type='button'
//                       className='btn btn-block'
//                       onClick={deliverHandler}
//                     >
//                       Mark As Delivered
//                     </Button>
//                   </ListGroup.Item>
//                 )}