import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import  Nav  from './Nav';
import { Link } from 'react-router-dom';
import Home from './Home';
import  ContactUs  from './ContactUs';
import Product  from './Product';
import  Laptop  from './Laptop';
import ProductList from './ProductList';
import MountingDemo from './MountingDemo';
import { UpdatingDemo } from './UpdatingDemo';
import Hook from './Hook';
import { LoginForm } from './LoginForm';

function App() {
  return (
    <div>
      {/* <h1 style={{color:'red'}}>Hi everyone...</h1> 
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path = 'home' element = {<Home/>}></Route>
          <Route path = 'contactus' element = {<ContactUs/>}></Route>
          <Route path = 'product' element = {<Product/>}></Route>
          <Route path = '/product/laptop' element = {<Laptop/>}></Route>
        </Routes>
      </BrowserRouter>

      <br/>
      <ProductList/> */}

      {/* <MountingDemo/> */}
      {/* <UpdatingDemo/> */}
      {/* <Hook/> */}
      <LoginForm/>
    </div>
  );
}

export default App;
