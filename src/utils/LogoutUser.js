import { Avatar, Box, Button, Dialog, DialogTitle, Grid, IconButton, Typography } from "@mui/material"
import { onAccountDetailPage, updateType } from "pages/Login/LoginSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import UserAvatar from "./UserAvatr";

const LogoutUser = ({ avatar , setAnchorElUser}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const orgType = localStorage.getItem('userType')


    const handelLogOut = () => {

        // localStorage.removeItem('userType')
        // localStorage.removeItem('userEmail')
        // localStorage.removeItem('access_Token')
        // localStorage.removeItem('userId')
        window.localStorage.clear()
        navigate('/Login')
        dispatch(updateType(''))
        window.location.reload()
        setAnchorElUser(null)
    }

    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType')
    const userEmail = localStorage.getItem('userEmail')
    const userId = localStorage.getItem('userId')

    const handelAccount = () =>{
        dispatch(onAccountDetailPage(true))
        navigate('/AccountDetails')
        setAnchorElUser(null)

    }

    return (
        <>
            <Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        {/* <Avatar sx={{ backgroundColor: 'blue', height: '3.5rem', width: "3.5rem" }}>{avatar?.charAt(0).toUpperCase()}{avatar?.charAt(0).toUpperCase()}</Avatar> */}
                        <UserAvatar name = {avatar} />
                    </Box>
                    <Box sx={{ marginLeft: '1rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography>
                                {orgType?.toUpperCase()}
                            </Typography>
                        </Box>
                        <Box mt={1}>
                            <Typography>
                                {/* {avatar} */}
                                {userName.charAt(0).toUpperCase() + userName.slice(1)}
                            </Typography>
                        </Box>

                    </Box>
                </Grid>
                <Grid mt={1}>
                    <Button size="small" fullWidth sx={{ textTransform: 'inherit' }} onClick={handelLogOut}>
                        LogOut
                    </Button>
                </Grid>
                <Grid>
                    <Button size="small" fullWidth sx={{ textTransform: 'inherit' }} onClick={()=>{handelAccount()}}>
                        Account Details
                    </Button>
                </Grid>
            </Grid>
           
        </>
    )

}
export default LogoutUser