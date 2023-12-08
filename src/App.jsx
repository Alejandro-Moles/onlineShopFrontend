
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import SearchPage from './components/SearchPage/SearchPage';
import  Article  from './components/ArticlePage/Article';
import NavBar from './components/NavBar/NavBar';
import DataPage from "./components/Data/DataPage.jsx"
import UserProfile from './components/Login/Profile.jsx';
import UserAddressData from './components/Data/UserAddressData.jsx';
import SpeedDialComponent from './components/FloatingButton/SpeedDialComponent.jsx';
import OrdersPage from './components/Data/OrdersPage.jsx';
import ViewOrder from './components/Login/ViewOrder.jsx';
import StatisticsComponent from './components/Data/StadisticPage.jsx';
import UserPage from './components/Data/UsersPage.jsx';
import NotFound from './components/ErrorPages/NotFound.jsx';
import AppProtectedRoutes from './AppProtectedRoutes.jsx';

function App() {
  return (
      <Routers>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/searchProducts" element={<SearchPage/>} />
            <Route exact path="/article/:uuid" element={<Article/>}/>
            <Route exact path="*" element={<NotFound />} />
            
            <Route element={<AppProtectedRoutes/>}>
              <Route exact path='/dataPage' element={<DataPage/>}/>
              <Route exact path='/profile/:uuid' element={<UserProfile/>}/>
              <Route exact path='/userAddressData/:uuid' element={<UserAddressData/>}/>
              <Route exact path='/ordersPage' element={<OrdersPage/>}/>
              <Route exact path="/viewOrders/:uuid" element={<ViewOrder/>}/>
              <Route exact path="/stadisticPage" element={<StatisticsComponent/>}/>
              <Route exact path="/userTablePage" element={<UserPage/>}/>
            </Route> 
          </Routes>   
          <SpeedDialComponent/>
      </Routers>
  )    
}

export default App
