
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
import Modal from 'react-modal';
import{storeAllPostsAction} from '../redux/actions'
import{filterAllPostsDataAction , likeAction} from '../redux/actions'
import{} from '../redux/actions'
const axios = require('axios').default;




const AllThreads=()=>{
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const[postToEditId,setPostToEditId]=useState([])
    const[editTitle,setEditTitle]=useState([]);
    const[editBody,setEditBody]=useState([])
    const [trigger,setTrigger]=useState([])

    //let userPosts = useSelector((state)=>state.userPosts)
    let userId = useSelector((state)=>state.userData.id)
    // localStorage.setItem("userId" , userId)
    const dispatch = useDispatch();
    //const token = useSelector((state)=>state.token)
    const token=localStorage.getItem('token')
    let allPosts = useSelector((state)=>state.allPosts)

    //console.log('user id : ',userId)

    const editPost=(postId)=>{
        setPostToEditId(postId)
        //console.log('post id',postToEditId)
         let targetTitle = document.querySelector(`.title${postId}`).innerText
         //console.log('targetTitle ',targetTitle)
         let targetBody = document.querySelector(`.body${postId}`).innerText
        //console.log('targetBody ',targetBody)
        setEditTitle(targetTitle);
        setEditBody(targetBody)
    
    
         openModal()
       }


       useEffect(()=>{
        const controller = new AbortController();
        //get all posts
        getAllPosts();
    

    return()=>controller.abort();
    },[trigger])


   const getAllPosts=()=>{
    fetch("https://localhost:44304/api/Post/allPosts",{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        }
        
    })
    .then((res)=>res.json())
     .then((data)=>dispatch(storeAllPostsAction(data)))
   // .then((response)=>console.log('including likes ',response))
   }

     

   function openModal() {
    setIsOpen(true);

    
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   
  }

  function closeModal() {
    setTrigger(trigger + 1)
    setIsOpen(false);
  }

  
  const editPostSubmit=async(e)=>{
    e.preventDefault();
    let editedTitle=document.querySelector('#editedTitle').value
    let editedBody=document.querySelector('#editedBody').value
   
    let UpdatePostDto={
        id:postToEditId,
        title:editedTitle,
        body:editedBody
    }
    //console.log('Update post Dto ',UpdatePostDto)
    const res = await axios.put('https://localhost:44304/api/Post/Update', UpdatePostDto);
    console.log('Edit Response: ',res)

   
    closeModal();
  }

  const likePost=(e)=>{
    
    let LikePostDto={
        UserId:userId,
        PostId:e.target.name
    };

    //console.log('Like post dto ',LikePostDto)
    axios.post("https://localhost:44304/api/Post/Like",LikePostDto,{
        headers:{'Authorization':`Bearer ${token}`}
    })
    .then((res)=>console.log("resulkt from /like endpoint",res))
    .catch((err)=>console.log("ERROR ",err))
    
    setTrigger(trigger + 1)
  }

  

    return(
        <div>
            <Nav />
            
            <h1>All Posts</h1>
            <input type='text' placeholder='Search posts' onChange={(e)=>dispatch(filterAllPostsDataAction(e.target.value))}/>
            {allPosts.map((element)=>{
                return(
                    <div><h3 className={`title${element.id}`}>{element.title}</h3> <p className={`body${element.id}`}>{element.body} </p> <p>Likes: {element.likes.length}</p><button name={element.id} onClick={(e)=>likePost(e)}>Like</button> 
                    
                     
                    {element.userId===userId?
                    (<div><button name={element.id} onClick={(event)=>editPost(event.target.name)}>Edit</button>
                    
                      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Edit post</h2>
        
        
        <form onSubmit={editPostSubmit}>
          <input type="text" defaultValue={editTitle} id='editedTitle'/><br/>
          <textarea placehoder="Write your post"  rows="18" cols="50"  id='editedBody' >{editBody}</textarea><br/>
          <input type='submit' value='Submit'/>
         

         
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
                    
                    
                    </div>):
                    (<h4>not your post</h4>)}
                    </div>
                )
            })}
        </div>
    )
}


export default connect()(AllThreads)   