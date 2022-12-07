import React, {useEffect , useState} from 'react';
import Login from './components/Login'
import Home from './components/Home';
import Account from './components/Account';
import ProtectedRoutes from './components/ProtectedRoutes'
import {BrowserRouter , Route, Routes} from 'react-router-dom';
import AllThreads from './components/AllThreads';
import CreatePost from './components/CreatePost';
import './App.css';


function App() {
  

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route element={<ProtectedRoutes/>}>
    <Route path="/home" element={<Home/>} />
    <Route path="/account" element={<Account/>} />
    <Route path="allThreads" element={<AllThreads/>} />
    <Route path="CreatePost" element={<CreatePost/>} />
    </Route>
    </Routes>
    </BrowserRouter>  
    </div>
  );
}
export default App;
