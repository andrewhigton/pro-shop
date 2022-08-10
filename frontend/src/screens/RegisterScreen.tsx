import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Button, Col } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../store';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import { UserLoginType } from '../types/typeLibrary'
  
const RegisterScreen: React.FC = ({  }) => {

	const dispatch = useDispatch()
	let location = useLocation();
	let navigate = useNavigate();

	const userRegister: UserLoginType = useSelector((state: RootState) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = location.search ? location.search.split('=')[1] : '/'
	
	// useEffect(() => {
	//     if (userInfo) {
	//     	if(userInfo.name !== '') {
	//       	navigate(redirect)
	//     	}
	// 	}
	//   }, [navigate, userInfo, redirect])

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [message, setMessage] = useState('')

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
	    e.preventDefault()
	    if(passwordCheck !== password) {
	    	setMessage('Passwords do not match. Please re-enter');
	    } else {
	    	dispatch(register(name, email, password))
	    }
	  }

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
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
					Register
				</Button>

				<Row className='py-3'>
					<Col>
						Have an account?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Register</Link>
					</Col>

				</Row>

			</Form>
		</FormContainer>
	)
}

export default RegisterScreen;