import React, { ReactChildren, ReactChild, useState, useEffect, ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'; 

interface AuxProps {
  // children: ReactChild | ReactChildren[];
	children: ReactNode
  // children?: JSX.Element|JSX.Element[];
}

const FormContainer = ({ children }: AuxProps ) => {
	return (
		<Container>
			<Row className='justify-content-md-center'>	
				<Col xs={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	)
}

export default FormContainer;