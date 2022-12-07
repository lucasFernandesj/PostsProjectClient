import { filterUserPostsDataAction, storeAllPostsAction } from "./actions";

let initState={
    token:'',
    userData:[],
    userPosts:[],
    allPosts:[],
    originalAllPosts:[]
}
export const reducer =(state=initState , action)=>{
    switch(action.type){
        case "TEST":
            return{...state};
        case "TOKEN":
            return{...state,token:action.payload}
        case "USER_DATA":
           
            return{...state,userData:action.payload, userPosts:action.payload.posts}
        case "FILTER_USER_DATA":
            // console.log('reducer.js ',action.payload)
             if(action.payload.trim()===""){
                return{
                    ...state,userPosts:state.userData.posts
                }
             }
                let clone=[...state.userPosts]
             let filtered=[]
             for(var i = 0 ; i<clone.length ; i++){
                if(clone[i].title.includes(action.payload)){
                    filtered.push(clone[i])
                }
                if(clone[i].body.includes(action.payload) && filtered.indexOf(clone[i])<0){
                    filtered.push(clone[i])
                }

             }
             return{...state,userPosts:[...filtered] }

        case "STORE_ALL_POSTS":
            //console.log('reducer.js all posts: ',action.payload)
            return{
                ...state,allPosts:action.payload , originalAllPosts:action.payload
            }
        case "FILTER_ALL_POSTS":

            if(action.payload.trim()===""){
                return{
                    ...state,allPosts:state.originalAllPosts
                }
            }
            console.log('reducer.js')
            let allPostsClone=[...state.originalAllPosts]
            let filteredAllPosts=[]
            for(var i = 0 ; i < allPostsClone.length ;i++){
                if(allPostsClone[i].title.includes(action.payload)){
                    filteredAllPosts.push(allPostsClone[i])
                }
                if(allPostsClone[i].body.includes(action.payload)&& filteredAllPosts.indexOf(allPostsClone[i])){
                    filteredAllPosts.push(allPostsClone[i])
                }
            }
            return{
                ...state,allPosts:filteredAllPosts
            }


                
             
            
            
        default:
            return{...state};
    }
}

function filterUserPosts(filterBy){
    let clone = initState.userData
    let filteredData = clone.filter(element=>element.title.includes(filterBy) || element.body.includes(filterBy))
    return filteredData;
}