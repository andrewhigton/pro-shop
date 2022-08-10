import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { RootState } from '../store';
import axios from 'axios'

interface ProductType { 
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


type ProductsType = ProductType[];

interface ProductListType {
	  	loading: boolean; 
 	  	products: ProductType[]
	  }

//its re-rendering on every logout. why?

const HomeScreen: React.FC = () => {
	

	const dispatch = useDispatch()

	const productList = useSelector((state: RootState) => state.productList);
	const mystate = useSelector((state: RootState) => state);
	//console.log('state ', mystate)

	const { loading, error, products } : {loading: boolean; error?: any; products: ProductsType} = productList
	
	useEffect(() => {
		dispatch(listProducts())
	}, [])

	return (
		<>
		<h1>Latest products</h1>
		{loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : 
			(
			<Row>
				{products.map((product: ProductType) => (
					<Col key={product._id} sm={12} md={12} lg={4} xl={3}>
						<Product product={product} />
					</Col> 				
					)
				)
			}
			</Row> 
			)
		}
		</>
	)
}

export default HomeScreen;

// {	{loading ? ( <Loader /> ) : (}