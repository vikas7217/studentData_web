import React from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LogoutUser from "./LogoutUser";
import UserAvatar from "./userAvatar/UserAvatr";

const Servicer = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const avatar = localStorage.getItem("userName");

  return (
    <>
      <Box id='servicer_and_logout'>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <UserAvatar name={avatar} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Grid sx={{ paddingY: "0px",cursor: 'unset',padding:'12px 20px' }}>
            <LogoutUser id="Logout_User_enr" avatar={avatar} setAnchorElUser={setAnchorElUser} />
          </Grid>
        </Menu>
      </Box>
    </>
  );
};
export default Servicer;
