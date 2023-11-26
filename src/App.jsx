
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

function App() {
  return (
      <Routers>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/searchProducts" element={<SearchPage/>} />
            <Route path="/article/:uuid" element={<Article/>}/>
            <Route path='/dataPage' element={<DataPage/>}/>
            <Route path='/profile/:uuid' element={<UserProfile/>}/>
            <Route path='/userAddressData/:uuid' element={<UserAddressData/>}/>
            <Route path='/ordersPage' element={<OrdersPage/>}/>
            <Route path="/viewOrders/:uuid" element={<ViewOrder/>}/>
            <Route path="/stadisticPage" element={<StatisticsComponent/>}/>
            <Route path="/userTablePage" element={<UserPage/>}/>
          </Routes>   
          <SpeedDialComponent/>
      </Routers>
  )    
}

export default App
