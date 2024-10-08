import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  changePassToken,
  changePassword,
  loginPage,
  onAccountDetailPage,
  setUserEmail,
  updateType,
} from "pages/Login/LoginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserAvatar from "utils/UserAvatr";
import emailIcon from "../../assets/email-svgrepo-com.svg";
import userIcon from "../../assets/portrait.svg";
import Heading from "utils/Heading";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getRequest } from "Dada/Axios";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
// import SettingIcon from '../../assets/people_team_business_system_resource_human_management_icon_259243.svg';
import SettingIcon from "../../assets/setting.png";
const AccountDetails = () => {
  const userType = localStorage.getItem("userType");
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userToken = localStorage.getItem("access_Token");
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountDetails, setAccountDetails] = useState();

  const [anchorElUser, setAnchorElUser] = useState(null);

  // useraccount:userId

  const getAccountDetails = async () => {
    try {
      const req = await getRequest(`/api/service/useraccount/${userId}`);
      if (req?.data?.isSuccess) {
        console.log(req?.data?.userById);
        setAccountDetails(req?.data?.userById);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    dispatch(onAccountDetailPage(true));
    getAccountDetails();
  }, []);

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
                sx={{ mt: "45px", top: "4.5rem" }}
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
                    <Typography mr={1} sx={{ fontSize: "13px" }}>
                      Edit Account
                    </Typography>
                    <EditNoteIcon />
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
          <Table>
            <TableBody>
              <TableRow>
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
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{userId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{userType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {accountDetails?.phoneNumber
                    ? accountDetails?.phoneNumber
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid
          xs={10}
          sx={{
            height: "90vh",
            minWidth: "85vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid sx={{ display: "flex", justifyContent: "center" }} mt={5}>
            <Grid mr={4}>
              <Paper sx={{ height: "25rem", width: "15rem" }}>
                <Grid
                  sx={{
                    position: "relative",
                    zIndex: 100,
                    bottom: "40px",
                    left: "58px",
                  }}
                >
                  <UserAvatar
                    name={userName}
                    height={"7rem"}
                    width={"7rem"}
                    fontSize={"60px"}
                  />
                </Grid>
                <Grid  sx={{display:'flex',justifyContent:'flex-start',padding:'1px 15px'}} >
                  <Heading
                    icon={userIcon}
                    value={
                      accountDetails.userName.charAt(0).toUpperCase() +
                      accountDetails.userName.slice(1)
                    }
                  />
                </Grid>

                <Grid mt={2} sx={{display:'flex',justifyContent:'flex-start',padding:'1px 20px'}}>
                  <Typography>
                    {accountDetails.roll.charAt(0).toUpperCase() +
                      accountDetails.roll.slice(1)}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "70rem",
                flexWrap: "wrap",
                height: "30rem",
              }}
            >
              <Grid>
                <Paper
                  sx={{
                    height: "10rem",
                    width: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" mr={1}>
                    Settings
                  </Typography>
                  <img
                    alt="setting"
                    src={SettingIcon}
                    style={{ height: "2rem", width: "2rem" }}
                  />
                </Paper>
              </Grid>
              <Grid>
                <Paper
                  sx={{
                    height: "10rem",
                    width: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid>
                    <Typography variant="h5">Password</Typography>
                    <KeyIcon />
                    <Typography sx={{ fontSize: "12px" }}>
                      Keeps your Password secure and make it strong
                    </Typography>
                    <Button onClick={handelChangePassword}>
                      Change Your Password
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid>
                <Paper sx={{ height: "10rem", width: "20rem" }}>
                  <Typography>Settings</Typography>
                </Paper>
              </Grid>
              <Grid>
                <Paper
                  sx={{
                    height: "10rem",
                    width: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid>
                    <Typography variant="h5">Log out </Typography>
                    <LogoutIcon />
                    <Typography>You can exit if you want's </Typography>
                    <Button onClick={handelLogOutPopup}>LogOut</Button>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid></Grid>
          </Grid>

          {/* <Grid>
            <Button onClick={handelChangePassword}>Change Your Password</Button>
          </Grid>
          <Grid>
            <Button onClick={handelLogOutPopup}>LogOut</Button>
          </Grid> */}
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
