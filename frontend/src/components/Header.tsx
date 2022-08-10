import React from 'react'
// import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { RootState } from '../store';
import { UserLoginType } from '../types/typeLibrary'
// import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header: React.FC = () => {
  const dispatch = useDispatch()

  const userLogin: UserLoginType = useSelector((state: RootState) => state.userLogin) 
  
  const { userInfo } = userLogin

  //console.log('userInfo ', userInfo)
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect> 
          <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
          </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to='/cart'>
                  <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                </LinkContainer>    
                {userInfo && Object.keys(userInfo).length !== 0 ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
                ) : ( 
                <div>
                <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-user"></i>Sign in</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link><i className="fas fa-user"></i> / Register</Nav.Link>
                </LinkContainer>
                </div>
                 )
               }
                {userInfo && userInfo.isAdmin && (
                 <NavDropdown title='Admin User' id='adminmenu'>
                   <LinkContainer to='/admin/userlist'>
                     <NavDropdown.Item>Users</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/admin/productlist'>
                     <NavDropdown.Item>Products</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/admin/orderlist'>
                     <NavDropdown.Item>Orders</NavDropdown.Item>
                   </LinkContainer>
                 </NavDropdown>
               )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header