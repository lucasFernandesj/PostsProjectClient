import React, {useState} from 'react';
import{Navigate} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux'
import{storeTokenAction} from '../redux/actions'
import{connect} from 'react-redux'
import { useDispatch } from "react-redux";
import SignUp from './SignUp';
import { render } from 'react-dom';
import Nav from './Nav';
const axios = require('axios').default;



const CreatePost=()=>{
    // const token = useSelector((state)=>state.token)
    const token = localStorage.getItem("token")
    const [title,setTitle]=useState([]);
    const [body,setBody]=useState([])
    const[postWasAdded,setPostWasAdded]=useState(false)



useState(()=>{
    if(postWasAdded){
        <Navigate to='/home'/>
    }
},[postWasAdded])

const submit=(event)=>{
    event.preventDefault();
    
    addPost();
    
    console.log(postWasAdded)
   
}

const addPost=async()=>{
    let AddPostDto={
        title:title,
        body:body
     }
     
    try{
         const resp = await axios.post("https://localhost:44304/api/Post/AddPost" , AddPostDto,{
            headers:{'Authorization':`Bearer ${token}`}
         });

        



         console.log(resp);

    }catch(err){
        console.log("ERROR on creating post ",err)
    }

    setPostWasAdded(true);

}

    return(
        <div>

            <Nav/>
            {postWasAdded?(<Navigate to='/home'/>):(<div> <h1>Create a post</h1>
            <form onSubmit={submit}>
                <input type="text" placeholder="Title" onChange={(event)=>setTitle(event.target.value)}/><br/>
                <br/>
                <textarea placehoder="Write your post"  rows="18" cols="50" onChange={(event)=>setBody(event.target.value)}></textarea>
                <br/><br/>
                <input type="submit"/>
            </form></div>)}
           
        </div>
    )

}

export default connect()(CreatePost)