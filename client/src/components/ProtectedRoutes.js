import { useSelector } from 'react-redux';
import{connect} from 'react-redux';
import {Navigate, Outlet} from 'react-router'
let userIsLoggedIn;

const ProtectedRoutes =()=>{
//const token = useSelector((state)=>state.token)
 const token = localStorage.getItem('token')
if(token !== null){
    userIsLoggedIn = true
}

const useAuth =()=>{
    const user ={loggedIn:userIsLoggedIn};
    return user && user.loggedIn
}

    const isAuth = useAuth();
    return isAuth? <Outlet/> : <Navigate to='/' />
}

export default connect(null, null)(ProtectedRoutes)