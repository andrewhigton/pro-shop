import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';
import { ProductDetailsType, ProductType } from '../types/typeLibrary'
// type RootState = ReturnType<typeof store.getState>;
import { RootState } from '../store';
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// type JointProps = ProductType & RouteComponentProps;  
interface Qty {
	qty?: number
}

const ProductScreen: React.FC = () => {

	const [qty, setQty] = useState<number | string>(1)
	

	const params = useParams();
	const paramId: string | undefined = params.id;
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
// console.log('state ', state)
	
	// const params = useParams();

	// const [product, setProduct] = useState([])
	// const [product, setProduct] = useState<ProductType>({
	// 	_id: '',
	//     name: '',
	//     image: '',
	//     description: '',
	//     brand: '',
	//     category: '',
	//     price: 0,
	//     countInStock: 0,
	//     rating: 0,
	//     numReviews: 0,
	// 	})
		
	useEffect(() => {
		// const fetchProduct = async () => {
	
			if(paramId) {
			dispatch(listProductDetails(paramId))
		}
			// dispatch(listProductDetails('624ea7f068ac9eefea9391fd'))
		// 	setProduct(data)
		// }
		// fetchProduct()
	}, [])

	// type ProductDetailsType = {
	// 	loading: boolean,
	// 	error: string,
	// 	product: ProductType
	// }

	const productDetails = useSelector((state: RootState) => state.productDetails)
		
	const { loading, error, product }: ProductDetailsType = productDetails
	
	const addToCartHandler = () => {
		navigate(`/cart/${paramId}?qty=${qty}`)
	}

	let inStock: number = 0;
	let stockCheck: string = '';
	
	if(product) {
	inStock  = product.countInStock;
	stockCheck = inStock ? 'In Stock' : 'Out of Stock';
	}

	return (
		<>
		
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			<Row>
				<Col md={6} >
					<Image src={product?.image} alt={product?.name} />
				</Col>
				<Col md={3} >
					<ListGroup variant='flush'>
						
						<ListGroup.Item>
							<h3>{product?.name}</h3>
						</ListGroup.Item>
						
						<ListGroup.Item>
							<Rating value={product?.rating} text={`${product?.numReviews} reviews`}/>
						</ListGroup.Item>
						
						<ListGroup.Item>Price: ${product?.price}</ListGroup.Item>

						<ListGroup.Item>Description: ${product?.description}</ListGroup.Item>
					
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>
										Price: 
									</Col>
									<Col>
										<strong>${product?.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										Status: 
									</Col>
									<Col>
										{stockCheck}
									</Col>
								</Row>
							</ListGroup.Item>
							{inStock > 0 && (
							

								<ListGroup.Item>
									<Row>
										<Col>Qty</Col>
										<Col>
										<Form.Control 
										type="number"
										as='select' 
										value={qty} 
										onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setQty(e.target.value)}
										
										>
										{[...Array(inStock).keys()].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}	
											</option>
											))}
										</Form.Control>
										</Col>
									</Row>
									<Button 
									className='btn-block' 
									type='button' 
									disabled={!stockCheck}
									onClick={addToCartHandler}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>

							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>	
	
	 	</>
	)
}

export default ProductScreen

							// <ListGroup.Item>
							// 	<Button 
							// 	className='btn-block' 
							// 	type='button' 
							// 	disabled={!stockCheck}
							// 	onClick={addToCartHandler}
							// 	>
							// 		Add to Cart
							// 	</Button>
							// </ListGroup.Item>
