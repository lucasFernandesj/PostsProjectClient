import React , {useEffect} from 'react';
import  {useState} from 'react';
import{connect} from 'react-redux'
import {userData} from '../redux/actions'
import { shallowEqual, useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import{storeTokenAction, userDataAction} from '../redux/actions'
import{Navigate} from 'react-router-dom';
import Nav from './Nav';
import CreatePost from './CreatePost';
import MyPosts from './MyPosts';

const axios = require('axios').default;




const Home =()=>{
    
   const getUserData=()=>{
   
     fetch("https://localhost:44304/api/auth/logged",{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>dispatch(userDataAction(data)))
      
        getUserId();
   }

  
   

   useEffect(()=>{
       getUserData();
       getUserId();
   },[])


//   const token = useSelector((state)=>state.token)
   const token = localStorage.getItem('token')
    const userData = useSelector((state)=>state.userData)
    console.log('user data  ',userData)
   const dispatch = useDispatch();
  
 
   const getUserId=()=>{
    let userId = userData.id 
    console.log('id is ',userId)
    localStorage.setItem('userId',userId)
   }





    return(
         
        <div>
            <Nav />    
            {token.length!==0 ? ( 
                <div>
               
                    
                   
                <div>
                     <MyPosts/> 
                   
                </div>
                  
                </div>
             
            
            ) : (null)}





           
        </div>
    )
}

export default connect(null,null)(Home);