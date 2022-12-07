export const storeTokenAction=(e)=>{
    return{
        type:'TOKEN',
        payload:e
    }
}

export const userDataAction=(e)=>{
    return{
        type:"USER_DATA",
        payload:e
    }
}

export const filterUserPostsDataAction=(e)=>{
   
    return{
        type:"FILTER_USER_DATA",
        payload:e
    }
}

export const storeAllPostsAction=(e)=>{
   
    return{
        type:"STORE_ALL_POSTS",
        payload:e
    }
}


export const filterAllPostsDataAction=(e)=>{
   //console.log('action.js ',e)
    return{
        type:"FILTER_ALL_POSTS",
        payload:e
    }
}

export const likeAction=(e)=>{
   
    return{
        type:"LIKE",
        payload:e
    }
}
