
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
  var userId =localStorage.getItem("userId" , userId)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const[postToEditId,setPostToEditId]=useState([])
    const[editTitle,setEditTitle]=useState([]);
    const[editBody,setEditBody]=useState([])
    const [trigger,setTrigger]=useState(0)
    const[likeAction,setLikeAction]=useState(false)


    //let userPosts = useSelector((state)=>state.userPosts)
   // let userId = useSelector((state)=>state.userData.id)
   
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
       console.log('re rendering...')
        //get all posts
       // getUserId();
        getAllPosts();
      

    
    },[trigger])


   const getAllPosts=()=>{
    let before =[...allPosts] 
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
   

   const getUserId=()=>{
      userId=localStorage.getItem("userId" , userId)
   }
     

   function openModal() {
    setIsOpen(true);

    
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   
  }

  function closeModal() {
    setTrigger(trigger + 1)
    console.log('trigger changed  ',trigger)
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
    const res = await axios.put('https://localhost:44304/api/Post/Update', UpdatePostDto,{
      headers:{'Authorization':`Bearer ${token}`}
    });
    console.log('Edit Response: ',res)
    setTrigger(trigger + 1)
    console.log('trigger changed  ',trigger)
   
    closeModal();
  }

  const likePost=async(e)=>{
    setLikeAction(true)
    let LikePostDto={
        UserId:userId,
        PostId:e.target.name
    };
    setTrigger(trigger + 1)
    console.log('trigger changed  ',trigger)
    //console.log('Like post dto ',LikePostDto)
    axios.post("https://localhost:44304/api/Post/Like",LikePostDto,{
        headers:{'Authorization':`Bearer ${token}`}
    })
    //.then((res)=>console.log("resulkt from /like endpoint",res))
    //.catch((err)=>console.log("ERROR ",err))

    //console.log(res)
    
    setTrigger(trigger + 1)
    console.log('trigger changed  ',trigger)
    
  }

  const deletePost=async(event)=>{
    let DeletePostDto={
        Id:event.target.name
    }
    const resp = await axios.post("https://localhost:44304/api/post/delete" , DeletePostDto,{
      headers:{'Authorization':`Bearer ${token}`}
    });

   
    //getUserData();
    setTrigger(trigger + 1)
  }
  

    return(
        <div>
            <Nav />
            <div className='myposts-container'>
            <h2 className='my-posts-header'>All Posts</h2>
            <input  type='text' placeholder='Search posts' onChange={(e)=>dispatch(filterAllPostsDataAction(e.target.value))} className='input-filter-myposts'/>
            {allPosts.map((element)=>{
                return(
                    <div className='post-div'><h3 className={`title${element.id}`}>{element.title}</h3> <p p id='post-body' className={`body${element.id}`}>{element.body} </p><div className='like-container'> <button name={element.id} onClick={(e)=>likePost(e)} className='like-btn'>Like</button><p className='like-p'>&#128077;: {element.likes.length}</p> </div>
                    
                     
                    {element.userId==userId?
                    (<div><button className='edit-btn' name={element.id} onClick={(event)=>editPost(event.target.name)}>Edit</button> <button name={element.id} onClick={deletePost} className='delete-btn'>Delete</button>
                    
                      <Modal 
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className='modal'>
        <h2 className='modal-header'>Edit post</h2>
        
        
        <form onSubmit={editPostSubmit}>
          <input type="text" defaultValue={editTitle} id='editedTitle' className='modal-input-title'/><br/>
          <textarea placehoder="Write your post"  rows="18" cols="50"  id='editedBody' className='modal-textarea-body'>{editBody}</textarea><br/>
          <input type='submit' value='Submit' className='modal-submit-btn'/>
         

         
        </form>
        <button onClick={closeModal} className='modal-close-btn'>Close</button>
        </div>
      </Modal>
                    
                    
                    </div>):
                    (null)}
                    </div>
                )
            })}
        </div>
        </div>
    )
}


export default connect()(AllThreads)   