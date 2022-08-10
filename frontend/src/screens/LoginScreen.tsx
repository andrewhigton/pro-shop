import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Button, Col } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../store';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import { UserLoginType } from '../types/typeLibrary'
  
const LoginScreen: React.FC = ({  }) => {


	const dispatch = useDispatch()
	let location = useLocation();
	let navigate = useNavigate();

	const userLogin: UserLoginType = useSelector((state: RootState) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'
	
	useEffect(() => {
	    if (userInfo) {
	    	if(userInfo.name) {
	      	navigate(redirect)
	    	}
		}
	  }, [navigate, userInfo, redirect])


	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
	    e.preventDefault()
	    dispatch(login(email, password))
	  }

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
      		{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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

				<Button type='submit' variant='primary'>
					Sign In
				</Button>

				<Row className='py-3'>
					<Col>
						New customer?{' '}
						<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register</Link>
					</Col>

				</Row>

			</Form>
		</FormContainer>
	)
}

export default LoginScreen;