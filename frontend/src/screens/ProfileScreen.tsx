import React, { useState, useEffect, FormEvent } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../store';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { UserProfileType, UserLoginType, UserType, myOrderListType } from '../types/typeLibrary'


const ProfileScreen: React.FC = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate();

	const userDetails: UserProfileType = useSelector((state: RootState) => state.userDetails)
	const { loading, error, user }: {loading: boolean, error: string, user: UserType}  = userDetails;

	const userLogin: UserLoginType = useSelector((state: RootState) => state.userLogin)
	const { userInfo }: UserLoginType = userLogin;

	const userUpdateProfile = useSelector((state: RootState) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state: RootState) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders }: myOrderListType  = orderListMy

	//check user exists before use
	let userName: string;
	let userEmail: string;
	let userID: string;
	if(user) {
	userName = user.name;
	userEmail = user.email;
	userID = user._id;
	}

	useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } 
    else {
      if (!user || !userName) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(userName)
        setEmail(userEmail)
     }
    }
  }, [navigate, userInfo, orders])



	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
	    e.preventDefault()
	    if(passwordCheck !== password) {
	    	setMessage('Passwords do not match. Please re-enter');
	    } else {
	    	dispatch(updateUserProfile({ _id: userID, name, email, password }))
	    }
	  }

	return (
		<Row>
			<Col md={3}>
				<h2>My profile</h2>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{success && <Message variant='success'>Profile updated</Message>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control 
					type='name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email address</Form.Label>
					<Form.Control 
					type='email'
					placeholder='Enter email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control 
					type='password'
					placeholder='Enter password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='passwordCheck'>
					<Form.Label>Reenter password</Form.Label>
					<Form.Control 
					type='password'
					placeholder='Confirm password'
					value={passwordCheck}
					onChange={(e) => setPasswordCheck(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Update
				</Button>
			</Form>
			</Col>
			<Col md={9}>
				<h2>My orders</h2>
				{loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (

                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.createdAt?.substring(0, 10)}</td>
                  <td>{order?.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {/*{order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}*/}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
			</Col>
		</Row>
	)
}

export default ProfileScreen;