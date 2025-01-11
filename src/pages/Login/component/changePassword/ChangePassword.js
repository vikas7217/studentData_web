import { Button, Grid, Typography } from "@mui/material";
import { StyledTextFiled } from "component/StyledComponent/StyledComponent";
import { useFormik } from "formik";
import ChangePasswordSchema from "./changePasswordSchema";
import { useNavigate } from "react-router-dom";
import { putRequest } from "Dada/Axios";
import { toast } from "react-toastify";
import { useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PasswordStrength from "utils/PasswordStrength";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [strength, setStrength] = useState("");
  const [length, setLength] = useState(false);
  const [oneSmallLatter, setOneSmallLatter] = useState(false);
  const [oneCapitalLatter, setOneCapitalLatter] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [passwordLength,setPasswordLength] = useState('')
  const [passwordStrength, setPasswordStrength] =useState('')


  const email = localStorage.getItem("userEmail");

  const initialValue = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handelChangePassword = async () => {
    const obj = {
      currentPassword: formik.values.currentPassword,
      newPassword: formik.values.newPassword,
      conformPassword: formik.values.confirmPassword,
    };

    try {
      const res = await putRequest(`/api/login/changePassword/${email}`, obj);

      if (res.data.isSuccess) {
        toast.success(res.data.message);
        localStorage.clear();
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: ChangePasswordSchema,
    onSubmit: handelChangePassword,
  });

  const handelCancel = () => {
    navigate("/AccountDetails");
  };

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
          <Grid mt={2}>
            <StyledTextFiled
              fullWidth
              size="small"
              label="Current password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={(e) => {
                formik.setFieldValue("currentPassword", e.target.value);
              }}
              onBlur={() => formik.handleBlur}
              error={Boolean(
                formik?.touched?.currentPassword &&
                  formik?.touched?.currentPassword
              )}
            />
            {Boolean(
              formik?.touched?.currentPassword &&
                formik?.touched?.currentPassword
            ) && (
              <Typography
                sx={{
                  color: "red",
                  width: "100%",
                  textAlign: "start",
                  fontSize: "12px",
                }}
              >
                {formik.errors.currentPassword}
              </Typography>
            )}
          </Grid>
          <Grid mt={2}>
            <StyledTextFiled
              fullWidth
              size="small"
              label="New password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={(e) => {
                formik.setFieldValue("newPassword", e.target.value);
               validatePassword(e.target.value)
                // checkValid(e.target.value);
              }}
              onBlur={() => formik.handleBlur}
              error={Boolean(
                formik?.touched?.newPassword && formik?.touched?.newPassword
              )}
            />
            {Boolean(
              formik?.touched?.newPassword && formik?.touched?.newPassword
            ) && (
              <Typography
                sx={{
                  color: "red",
                  width: "100%",
                  textAlign: "start",
                  fontSize: "12px",
                }}
              >
                {formik.errors.newPassword}
              </Typography>
            )}
            {passwordLength.length === 0 ? (
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
                  fontSize: "12px",
                }}
              >
                {" "}
                Password Strength : {strength}
              </Typography>
            )}{" "}
          </Grid>
          <Grid mt={2}>
            <StyledTextFiled
              fullWidth
              size="small"
              label="Confirm password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={(e) => {
                formik.setFieldValue("confirmPassword", e.target.value);
              }}
              onBlur={() => formik.handleBlur}
              error={Boolean(
                formik?.touched?.confirmPassword &&
                  formik?.touched?.confirmPassword
              )}
            />
            {Boolean(
              formik?.touched?.confirmPassword &&
                formik?.touched?.confirmPassword
            ) && (
              <Typography
                sx={{
                  color: "red",
                  width: "100%",
                  textAlign: "start",
                  fontSize: "12px",
                }}
              >
                {formik.errors.confirmPassword}
              </Typography>
            )}
          </Grid>
         
          <PasswordStrength    length = {length} oneCapitalLatter = {oneCapitalLatter} oneSmallLatter ={oneSmallLatter} specialChar = {specialChar} number ={number} />
        </Grid>
        <Grid mt={3} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="outlined" onClick={() => formik.handleSubmit()}>
            Change Password
          </Button>
          <Button variant="outlined" onClick={handelCancel}>
            May be latter
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default ChangePassword;
