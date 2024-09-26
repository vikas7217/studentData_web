import { Grid, Paper } from "@mui/material"
import Signin from "./component/signin/Signin"
import { useDispatch, useSelector } from "react-redux"
import SendOtp from "./component/verifiedPassOtp/SendOtp";
import CreatePassword from "./component/CreatePassword/CreatePassword";
import ChangePassword from "./component/changePassword/ChangePassword";
import { useEffect } from "react";
import { onAccountDetailPage } from "./LoginSlice";
// import Signin from "./component/signin/Signin"

const Login = () => {

    const getStorage = useSelector((state)=>{return state?.LoginReducer});

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(onAccountDetailPage(true))
    },[])

    return (
        <>
            <Grid xs={12} mt={5} sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh'}}>
                <Paper elevation={3} 
                sx={{width:'30%',padding:'2rem'}}
                > 

                   { getStorage?.isLoginPage && ( <Signin />) }
                   { getStorage?.isCreateNewUserPass && getStorage?.login?.isValidEmail && (<SendOtp />)}
                   { getStorage?.isOtpIsVerified && getStorage?.isCreateNewUserPass && (<CreatePassword />)}
                   { getStorage?.isNewUserPasswordCreated && getStorage?.isLoginPage && (<Signin />)}
                   { getStorage?.isChangePassword && (<ChangePassword />)}
                </Paper>
            </Grid>
        </>
    )
}
export default Login