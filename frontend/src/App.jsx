import './App.css'
import './components/AddProduct.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import NavBar from './components/NavBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './components/NavBar.css'
import AllProducts from './components/AllProducts';
import Apple from './components/Apple';
import Google from './components/Google';
import Huawei from './components/Huawei';
import UpdateProduct from './components/UpdateProduct';
import NotFound from './NotFound';



function App() {

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<ProductList/>}>
              <Route index element={<AllProducts/>}/>
              <Route path='allproducts' element={<AllProducts/>}/>
              <Route path='apple' element={<Apple/>}/>
              <Route path='google' element={<Google/>}/>
              <Route path='huawei' element={<Huawei/>}/>
          </Route>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/updateproduct/:id' element={<UpdateProduct/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
