import React, { useState, FormEvent } from 'react'
import { Form, Button, Col } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'; 
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { RootState } from '../store';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { savePaymentMethod } from '../actions/cartActions';
import { CartStateType } from '../types/typeLibrary'

const PaymentScreen: React.FC = () => {	

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const cart: CartStateType = useSelector((state: RootState) => state.cart);
	const { shippingAddress } = cart;

	if(!shippingAddress) {
		navigate('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
	    e.preventDefault();
	    	dispatch(savePaymentMethod(paymentMethod))
	    	navigate('/placeorder')
	  }
	  
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 step4 />
						<h1>Payment method</h1>
							<Form onSubmit={submitHandler}>
								<Form.Group controlId='address'>
									<Form.Label as='legend'>Select method</Form.Label>
								<Col>
									<Form.Check 
									type='radio'
									label='Paypal or credit card'
									id='paypal'
									name='paymentMethod'
									value='PayPal'
									checked onChange={(e) => setPaymentMethod(e.target.value) }
									>
									</ Form.Check>
								</Col>
								</Form.Group>
								<Button type='submit' variant='primary'>
									Continue
								</Button>
							</Form>		

				 </FormContainer>
				 	)
				};
			

export default PaymentScreen;