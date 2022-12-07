import React , {useEffect} from 'react';
import  {useState} from 'react';
import{connect} from 'react-redux'
import { shallowEqual, useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import{storeTokenAction, userDataAction} from '../redux/actions'
import Modal from 'react-modal';
import { filterUserPostsDataAction } from '../redux/actions';

// Modal.setAppElement('#postsContainer');
const axios = require('axios').default;




const MyPosts=(props)=>{
   // const token = useSelector((state)=>state.token)
    const token=localStorage.getItem('token')
    const dispatch = useDispatch();
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [postToEditId,setPostToEditId] = useState();
    const[editTitle,setEditTitle]=useState([]);
    const[editBody,setEditBody]=useState([])
   
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    let userPosts = useSelector((state)=>state.userPosts)
    

   const editPost=(postId)=>{
    setPostToEditId(postId)
    let targetTitle = document.querySelector(`.title${postId}`).innerText
   // console.log('targetTitle ',targetTitle)
    let targetBody = document.querySelector(`.body${postId}`).innerText
   // console.log('targetBody ',targetBody)
    setEditTitle(targetTitle);
    setEditBody(targetBody)


    openModal()
   }






   function openModal() {
    setIsOpen(true);
    
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   
  }

  function closeModal() {
    setIsOpen(false);
  }

    // useEffect(()=>{
    //       getUserData();
    //   },[])



     

      const deletePost=async(event)=>{
        let DeletePostDto={
            Id:event.target.name
        }
        const resp = await axios.post("https://localhost:44304/api/post/delete" , DeletePostDto,{
          headers:{'Authorization':`Bearer ${token}`}
        });
        getUserData();
      }

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
      } 
     
      
      // let allPosts = [...userPosts.posts]
      
      
      const editPostSubmit=async(e)=>{
        e.preventDefault();
        // let editedTitle=document.querySelector('#editedTitle').value
        // let editedBody=document.querySelector('#editedBody').value

        let editedTitle=editTitle;
        let editedBody=editBody;
       
        let UpdatePostDto={
            id:postToEditId,
            title:editedTitle,
            body:editedBody
        }
       // console.log(UpdatePostDto)
       

        const res = await axios.put('https://localhost:44304/api/Post/Update', UpdatePostDto,{
          headers:{'Authorization':`Bearer ${token}`}
        });


        console.log('Edit Response: ',res)

        getUserData();
        closeModal();
      }

   
   
     
    
    return(
        <div className='myposts-container'>
            <h2 className='my-posts-header'>My Posts</h2>
            
            <input type="text" id="filterInput" placeholder="  Search for a post"  onChange={(e)=>dispatch(filterUserPostsDataAction(e.target.value))} className='input-filter-myposts'/>
            {userPosts? (userPosts?.map((element)=>(
                <div key={element.id} className='post-div'>
                    <h2 id='title-header' className={"title"+element.id }>{element.title}</h2><p id='post-body' className={"body"+element.id}>{element.body}</p><br/><div className='edit-delete-container'><button name={element.id} onClick={(event)=>editPost(event.target.name)} className='edit-btn'>Edit</button><button name={element.id} onClick={deletePost} className='delete-btn'>Delete</button></div>
                    
                    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className='modal'>
        <h2 className='modal-header'>Edit post</h2>
        
        
        <form onSubmit={editPostSubmit}>
          <input type="text" defaultValue={editTitle} id='editedTitle' onChange={(e)=>setEditTitle(e.target.value)} className='modal-input-title'/><br/>
          <textarea placehoder="Write your post"  rows="18" cols="50"  id='editedBody'  onChange={(e)=>setEditBody(e.target.value)} className='modal-textarea-body'>{editBody}</textarea><br/>
          <input type='submit' value='Submit' className='modal-submit-btn'/>
         

         
        </form>
        <button onClick={closeModal} className='modal-close-btn'>close</button>
        </div>
      </Modal>
                </div>
            ))) : (<h1>No posts yet</h1>)}
       
        </div>
    )
}

const mapStateToProps=(state)=>{
  return{
    userPost:state.userPosts
  }
}

export default connect(mapStateToProps,null)(MyPosts)