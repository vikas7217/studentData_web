import { Button, Grid, Typography } from "@mui/material";
import { StyledTextFiled } from "component/StyledComponent/StyledComponent";
import { useFormik } from "formik";
import CreatePasswordSchema from "./CreatePasswordSchema";
import { putRequest } from "Dada/Axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { createNewUserPassword, loginPage } from "pages/Login/LoginSlice";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const CreatePassword = () => {
  const dispatch = useDispatch();
  const [strength, setStrength] = useState("");
  const [length, setLength] = useState(false);
  const [oneSmallLatter, setOneSmallLatter] = useState(false);
  const [oneCapitalLatter, setOneCapitalLatter] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [passwordLength,setPasswordLength] = useState(false)

  const getReduxForCreatePass = useSelector((state) => state.LoginReducer);

  const email = getReduxForCreatePass?.login.email;
  const initialValue = {
    password: "",
    confPassword: "",
  };

  const handelCreatePass = async () => {
    const obj = {
      newPassword: formik.values.password,
      conformPassword: formik.values.confPassword,
    };
    try {
      const res = await putRequest(`/api/login/new-password/${email}`, obj);

      if ((await res).data.isSuccess) {
        toast.success(res.data.message);
        dispatch(loginPage(true));
        dispatch(createNewUserPassword(false));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: CreatePasswordSchema,
    onSubmit: handelCreatePass,
  });

  const validatePassword = (password) => {
    var strengthScore = 0;
    setPasswordLength(password)

    const smallLatter = /[a-z]/.test(password);
    const capitalLatter = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    // const specialChar = /[A-Za-z0-9]/.test(password);
    const specialChar = /[^\w]/.test(password);
    if (smallLatter) {
      strengthScore += 1;
      setOneSmallLatter(true);
    } else {setOneSmallLatter(false); }

    if (capitalLatter) {
      strengthScore += 1;
      setOneCapitalLatter(true);
    } else { setOneCapitalLatter(false); }

    if (number) {
      strengthScore += 1;
      setNumber(true);
    } else {  setNumber(false); }

    if (specialChar) {
      strengthScore += 1;
      setSpecialChar(true);
    }  else { setSpecialChar(false); }

    if (password.length >= 8) {
      strengthScore += 1;
      setLength(true);
    } else {setLength(false);}

    // eslint-disable-next-line default-case
    switch (strengthScore) {
      case 0:
      case 1:
      case 2:
        setStrength("Week");
        break;
      case 3:
      case 4:
        setStrength("Medium");
        break;
      case 5:
        setStrength("Strong");
        break;
    }
  };

  

  return (
    <>
      <Grid>
        <Grid>
          <Grid>
            <StyledTextFiled
              fullWidth
              size="small"
              label="Enter new password"
              name="password"
              onChange={(e) => {
                formik.setFieldValue("password", e.target.value);
                validatePassword(e.target.value);
              }}
              onBlur={() => formik.handleBlur}
              error={Boolean(
                formik.touched.password && formik.touched.password
              )}
            />
            {Boolean(formik.touched.password && formik.touched.password) && (
              <Typography
                sx={{
                  color: "red",
                  width: "100%",
                  textAlign: "start",
                  fontSize: "12px",
                }}
              >
                {formik.errors.password}
              </Typography>
            )}
            {passwordLength === 0 ? (
              ""
            ) : (
              <Typography
                sx={{
                  color:
                    strength === "Week"
                      ? "red"
                      : strength === "Medium"
                      ? "sienna"
                      : "green",
                  textAlign: "start",
                }}
              >
                {" "}
                Password Strength : {strength}
              </Typography>
            )}
          </Grid>

          <Grid mt={2}>
            <StyledTextFiled
              fullWidth
              size="small"
              label="Confirm password"
              name="confPassword"
              onChange={(e) => {
                formik.setFieldValue("confPassword", e.target.value);
              }}
              onBlur={() => formik.handleBlur}
              error={Boolean(
                formik.touched.confPassword && formik.touched.confPassword
              )}
            />
            {Boolean(
              formik.touched.confPassword && formik.touched.confPassword
            ) && (
              <Typography
                sx={{
                  color: "red",
                  width: "100%",
                  textAlign: "start",
                  fontSize: "12px",
                }}
              >
                {formik.errors.confPassword}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid>
            <Typography sx={{fontSize:'12px',display: 'flex',textAlign: 'center' }} >{length ? <Grid sx={{fontSize:'7px',color:'green'}}><CheckCircleOutlineOutlinedIcon /></Grid> :  <CheckCircleOutlineOutlinedIcon />} Minimum length of password is 8 character</Typography>
            <Typography sx={{fontSize:'12px',display: 'flex',textAlign: 'center' }} >{oneCapitalLatter ? <Grid sx={{fontSize:'7px',color:'green'}}><CheckCircleOutlineOutlinedIcon /></Grid> : <CheckCircleOutlineOutlinedIcon />}Password must be contain at least one Capital latter</Typography>
            <Typography sx={{fontSize:'12px',display: 'flex',textAlign: 'center' }} >{oneSmallLatter ? <Grid sx={{fontSize:'7px',color:'green'}}><CheckCircleOutlineOutlinedIcon /></Grid> : <CheckCircleOutlineOutlinedIcon />}Password must be contain at least one small latter </Typography>
            <Typography sx={{fontSize:'12px',display: 'flex',textAlign: 'center' }} >{specialChar ? <Grid sx={{fontSize:'7px',color:'green'}}><CheckCircleOutlineOutlinedIcon /></Grid> : <CheckCircleOutlineOutlinedIcon />}Password must be contain at least one special character</Typography>
            <Typography sx={{fontSize:'12px',display: 'flex',textAlign: 'center' }} >{ number ? <Grid sx={{fontSize:'7px',color:'green'}}><CheckCircleOutlineOutlinedIcon /></Grid> : <CheckCircleOutlineOutlinedIcon />}Password must be contain at least one number</Typography>


          </Grid>
        <Grid mt={2}>
          <Button variant="outlined" onClick={() => formik.handleSubmit()}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default CreatePassword;
