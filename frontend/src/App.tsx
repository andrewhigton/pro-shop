import React, { Fragment } from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <>  
        <main className="py-3">
        
          
          <h1>Welcome to ProShop</h1>
          <BrowserRouter>
          <Header />
          <main className='py-3'>
          <Container>
          <Routes>       
              <Route path='/order/:id' element={<OrderScreen />}  /> 
              <Route path='/shipping/' element={<ShippingScreen />}  />
              <Route path='/payment' element={<PaymentScreen />}  /> 
              <Route path='/placeorder/' element={<PlaceOrderScreen />}  />
              <Route path='/login/' element={<LoginScreen />}  />
              <Route path='/register/' element={<RegisterScreen />}  />
              <Route path='/profile/' element={<ProfileScreen />}  />
              <Route path='/product/:id' element={<ProductScreen />}  /> 
              <Route path='/admin/userlist' element={<UserListScreen />}  /> 
              <Route path='/admin/productlist' element={<UserListScreen />}  /> 
              <Route path='/admin/orderlist' element={<UserListScreen />}  /> 
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />}  /> 
              <Route path='/cart/' element={<CartScreen />}  />
              <Route path='/' element={<HomeScreen />}/>
            
          </Routes>
          </Container>
          </main>
          </BrowserRouter>
          
          </main>
      <Footer />
    </>
  );
}

export default App;
