import { Box, Grid, Typography } from "@mui/material";
import { onAccountDetailPage, updateType } from "pages/Login/LoginSlice";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import UserAvatar from "./userAvatar/UserAvatr";
import "./LogoutUser.scss";

const LogoutUser = ({ avatar, setAnchorElUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orgType = localStorage.getItem("userType");

  const handelLogOut = () => {
 
    window.localStorage.clear();
    navigate("/Login");
    dispatch(updateType(""));
    window.location.reload();
    setAnchorElUser(null);
  };

  const userName = localStorage.getItem("userName");


  const handelAccount = () => {
    dispatch(onAccountDetailPage(true));
    navigate("/AccountDetails");
    setAnchorElUser(null);
  };

  return (
    <>
      <Grid sx={{ width: "19rem" }}>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Employee Details</Typography>
          <span
            id="logout_button"
            size="small"
            className="logout_button"
            fullWidth
            onClick={handelLogOut}
          >
            LogOut
          </span>
          {/* </Grid> */}
        </Grid>
        <Grid mt={2} sx={{ display: "flex", justifyContent: "start" }}>
          <Box>
            <UserAvatar
              name={avatar}
              height={"7rem"}
              width={"7rem"}
              fontSize={"48px"}
            />
          </Box>
          <Grid>
            <Box sx={{ marginLeft: "1rem" }}>
              <Box mt={1}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {/* {avatar} */}
                  {userName.charAt(0).toUpperCase() + userName.slice(1)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex" }}>
                <Typography>{orgType?.toUpperCase()}</Typography>
              </Box>

              <Box sx={{ display: "flex" }}>
                <span
                  id="account_Details_button"
                  size="small"
                  className="accountDetail"
                  fullWidth
                  onClick={() => {
                    handelAccount();
                  }}
                >
                  Account Details
                </span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default LogoutUser;
