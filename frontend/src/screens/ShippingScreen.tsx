import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'; 
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../store';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { saveShippingAddress } from '../actions/cartActions';
import { ShippingAddressType, CartStateType } from '../types/typeLibrary'



const ShippingScreen: React.FC = () => {	

	const cart: CartStateType = useSelector((state: RootState) => state.cart);
	const { shippingAddress } = cart;

	// console.log('shiop ',shippingAddress)

	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postcode, setPostcode] = useState(shippingAddress.postcode || '')
	const [country, setCountry] = useState(shippingAddress.country || '')

	const dispatch = useDispatch()
	const navigate = useNavigate();

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
	    e.preventDefault();
	    	dispatch(saveShippingAddress({ address, city, postcode, country }))
	    	navigate('/payment')
	
	  }

	return (
		<FormContainer>
	
			<CheckoutSteps step1 step2 step3 step4 />
						<h1>Shipping</h1>
							<Form onSubmit={submitHandler}>
								<Form.Group controlId='address'>
									<Form.Label>Address</Form.Label>
									<Form.Control 
									type='address'
									placeholder='Enter address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='city'>
									<Form.Label>City</Form.Label>
									<Form.Control 
									type='city'
									placeholder='Enter city'
									value={city}
									onChange={(e) => setCity(e.target.value)}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId='postcode'>
									<Form.Label>Post code</Form.Label>
									<Form.Control 
									type='postcode'
									placeholder='Enter postcode'
									value={postcode}
									onChange={(e) => setPostcode(e.target.value)}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId='country'>
									<Form.Label>Country</Form.Label>
									<Form.Control 
									type='country'
									placeholder='Country'
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									></Form.Control>
								</Form.Group>
								<Button type='submit' variant='primary'>
									Continue
								</Button>
							</Form>		

				 </FormContainer>
				 	)
				};
			

export default ShippingScreen;