import React, {useState} from 'react';
import{Navigate} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux'
import{storeTokenAction} from '../redux/actions'
import{connect} from 'react-redux'
import { useDispatch } from "react-redux";
const axios = require('axios').default;

const SignUp=()=>{
    const[email, setEmail]=useState([]);
    const[password,setPassword] = useState([]);

const handleSubmit= async (event)=>{
    event.preventDefault();
    let AddUserDto={
        email:email,
        password:password
    }

    console.log(AddUserDto);
   
    fetch("https://localhost:44304/api/auth/register",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(AddUserDto)
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log("ERROR ",err))
    
    

   

    //console.log("here");
}



    return(
        <div ><h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="    Email" onChange={(event)=>setEmail(event.target.value)} className='input-login'/><br />
            <input type="text" placeholder="    Password" onChange={(event)=>setPassword(event.target.value)} className='input-login'/><br/>
            <button className='signup-btn button-7'>Sign up</button>
        </form>
        
        
        
        
        </div>
    )
}


export default connect(null,null)(SignUp)