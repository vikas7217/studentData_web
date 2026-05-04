import { Grid, Paper } from "@mui/material";
import Signin from "./component/signin/Signin";
import { useDispatch, useSelector } from "react-redux";
import SendOtp from "./component/verifiedPassOtp/SendOtp";
import CreatePassword from "./component/CreatePassword/CreatePassword";
import ChangePassword from "./component/changePassword/ChangePassword";
import { useEffect } from "react";
import { onAccountDetailPage } from "./LoginSlice";
import loginPageStyle from "./Login.scss";

const Login = () => {
  const getStorage = useSelector((state) => {
    return state?.LoginReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(onAccountDetailPage(true));
  }, []);

  return (
    <>
      <Grid className="login_main_grid">
        <Grid
          xs={12}
          mt={5}
          className="login_page"
        >
          <Paper className="login_page_paper" elevation={3}>
            {getStorage?.isLoginPage && <Signin />}
            {getStorage?.isCreateNewUserPass &&
              getStorage?.login?.isValidEmail && <SendOtp />}
            {getStorage?.isOtpIsVerified && getStorage?.isCreateNewUserPass && (
              <CreatePassword />
            )}
            {getStorage?.isNewUserPasswordCreated &&
              getStorage?.isLoginPage && <Signin />}
            {getStorage?.isChangePassword && <ChangePassword />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Login;
