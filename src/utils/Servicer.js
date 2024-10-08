import React from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import LogoutUser from "./LogoutUser";
import UserAvatar from "./UserAvatr";

const Servicer = () =>{

    const [anchorElUser, setAnchorElUser] = React.useState(null);  
   
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
      
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const avatar = localStorage.getItem('userName')

    return(
        <>
        <Box>
        <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <UserAvatar name ={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem sx={{paddingY:'0px',}}>
                    <LogoutUser avatar={avatar} setAnchorElUser = {setAnchorElUser} />
                </MenuItem>
            </Menu>
        </Box>
        </>
    )

}
export default Servicer