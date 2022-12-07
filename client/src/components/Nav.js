
import {Link} from 'react-router-dom'
import React, {useState} from 'react';
import{Navigate} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux'
import{storeTokenAction} from '../redux/actions'
import{connect} from 'react-redux'
import { useDispatch } from "react-redux";
import SignUp from './SignUp';
const axios = require('axios').default;





const Nav =(props)=>{

    const dispatch = useDispatch();


    const logout=()=>{
        localStorage.removeItem("token") //removes token from localStorage
        localStorage.removeItem("userId")
        dispatch(storeTokenAction("")) //removes token from Store
        window.location.href="/";
    }


    return(
        <nav className='Nav'>
          <Link to="/home" className='Nav-Link'>Home</Link>  
          <Link to="/AllThreads" className='Nav-Link'>All threads</Link>  
          <Link to="/CreatePost" className='Nav-Link'>Create post</Link>  
           <button onClick={logout}  className='Nav-Link btn-nav-link'>Log out</button>
        </nav>
    )
}

export default connect()(Nav) 