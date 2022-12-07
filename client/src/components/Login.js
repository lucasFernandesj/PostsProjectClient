import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux'
import { storeTokenAction } from '../redux/actions'
import { connect } from 'react-redux'
import { useDispatch } from "react-redux";
import SignUp from './SignUp';
const axios = require('axios').default;


const Login = (props) => {
    const dispatch = useDispatch();

    const [name, setName] = useState([]);
    const [password, setPassword] = useState([]);
    const [redirect, setRedirect] = useState(false);


    const getToken = (token) => {
        dispatch(storeTokenAction(token))
        // return token;
    }

    const token = useSelector((state) => state.token)


    const submit = async (event) => {

        event.preventDefault();
        loginRequest();
    }

    const loginRequest = async () => {
        let obj = {
            Email: name,
            Password: password
        }
        try {
            const resp = await axios.post("https://localhost:44304/api/auth/login", obj);
            let token = await resp.data
            getToken(token)
            localStorage.setItem("token", token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            console.log(token);
        }
        catch (err) {

            console.error("ERROR****" + err);
        }


    }
    return (
        <div >
            <div>
                {token.length === 0 ? (

                    <div >
                        <div className='login-page-msg'>
                            <h2 className='greeting-header'>Welcome to ReviewHub</h2>
                            <p className='greeting-p'>Share your thoughts and experiences</p>
                        </div>
                        <div className='login-form-container'>
                            <div className='login'>
                                 <form onSubmit={submit} className='login-form'>
                                <h1>Sign in</h1>
                                <input type="text" placeholder="    Email" required onChange={event => setName(event.target.value)} className='input-login'/><br />
                                <input type="password" placeholder="    Password" required onChange={event => setPassword(event.target.value)} className='input-login'/><br />
                                <button className='signin-btn button-3'>Sign in</button>
                            </form>
                            <hr class='hr-login'></hr>
                            <SignUp  />
                            </div>
                           
                        </div>

                    </div>

                ) : <Navigate to='/home' />}
            </div>


        </div>

    )
}






export default connect(null, null)(Login)