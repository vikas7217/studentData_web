import Login from "pages/Login/Login"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const PrivateRoute =({adminComponent, userComponent})=>{

    const navigate = useNavigate()
    const userTypeLoginRedux = useSelector((state)=>{return state.LoginReducer.userType})
    const userTypeLocal = localStorage.getItem('userType') 
    const token = localStorage.getItem('access_Token') 

    const userType = userTypeLoginRedux ? userTypeLoginRedux : userTypeLocal;

    if(!token){
        navigate('/Login')
        return <Login />

    }
    if(userType === 'user'){
        return userComponent
    }
    if(userType === 'Admin'){
        return adminComponent
    }

}
export default PrivateRoute