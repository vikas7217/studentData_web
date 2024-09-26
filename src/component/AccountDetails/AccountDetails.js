import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ChangePassword from "pages/Login/component/changePassword/ChangePassword";
import {
  changePassToken,
  changePassword,
  loginPage,
  setUserEmail,
  updateType,
} from "pages/Login/LoginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserAvatar from "utils/UserAvatr";
import emailIcon from "../../assets/email-svgrepo-com.svg";
import userIcon from "../../assets/portrait.svg";
import Heading from "utils/Heading";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from '@mui/icons-material/EditNote';
const AccountDetails = () => {
  const userType = localStorage.getItem("userType");
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userToken = localStorage.getItem("access_Token");
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handelLogOut = () => {
    window.localStorage.clear();
    navigate("/Login");
    dispatch(updateType(""));
    window.location.reload();
  };

  const handelLogOutPopup = () => {
    setOpenLogoutPopup(true);
  };

  const handelClosePopup = () => {
    setOpenLogoutPopup(false);
  };

  const handelChangePassword = () => {
    dispatch(changePassword(true));
    dispatch(loginPage(false));
    dispatch(setUserEmail(userEmail));
    dispatch(changePassToken(userToken));

    navigate("/Login");
  };

  return (
    <>
      <Grid
        sx={{ display: "flex", justifyContent: "normal", overflow: "hidden" }}
      >
        <Grid component={Paper} xs={2} sx={{ height: "100vh", width: "18rem" }}>
          {/* <Paper elevation={2} sx={{height:'100%'}}> */}
          <Grid mt={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <IconButton onClick={handleOpenUserMenu}>
                <UserAvatar
                  name={userName}
                  height={"7rem"}
                  width={"7rem"}
                  fontSize={"60px"}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px",top:'4.5rem' }}
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
                <MenuItem sx={{ paddingY: "0px" }}>
                  <Button>
                    <Typography mr={1} sx={{fontSize: '13px'}} >Edit Account</Typography>
                    <EditNoteIcon />
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
          <Table>
            <TableBody>
              <TableRow>
                {" "}
                <TableCell>
                  <Heading
                    icon={userIcon}
                    value={userName.charAt(0).toUpperCase() + userName.slice(1)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Heading icon={emailIcon} value={userEmail} />
                  {/* {userEmail} */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{userId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{userType}</TableCell>
              </TableRow>
              {/* </TableRow> */}
            </TableBody>
          </Table>
          {/* </Paper> */}
        </Grid>
        <Grid xs={10} sx={{ height: "100vh", minWidth: "85vw" }}>
          <Grid>
            <Button onClick={handelChangePassword}>Change Your Password</Button>
          </Grid>
          <Grid>
            <Button onClick={handelLogOutPopup}>LogOut</Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openLogoutPopup}>
        <Grid sx={{ width: "30rem" }}>
          <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={handelClosePopup}
              sx={{ marginTop: "0.4rem", marginRight: "0.4rem" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              Are you sure you want to log out
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button size="small" variant="outlined" onClick={handelLogOut}>
              Yes Logout me
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  );
};
export default AccountDetails;
