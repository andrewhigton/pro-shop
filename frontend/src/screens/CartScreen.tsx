import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { RootState } from '../store';
import { CartType } from '../types/typeLibrary'
  
  interface CartScreenType {
    cartItems: Array<CartType>
  }
  

	const CartScreen: React.FC = ({ }) => {
  
    const navigate = useNavigate();
  	const params = useParams();
  	const location = useLocation();
  	const dispatch = useDispatch()

  	const productId = params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cart: CartScreenType = useSelector((state: RootState) => state.cart)
    const { cartItems } = cart

    // console.log('cart ship ', cart)
    //console.log('cart ', cartItems)
  
      useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty))
        }
      }, [dispatch, productId, qty])

      const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id))
      }

      const checkoutHandler = () => {
        navigate('/shipping')
      }

    return (
  	  	
  		<Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='light'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item: CartType) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc: number, item: CartType) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc: number, item: CartType) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen;