import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest } from "../../../Dada/Axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CreateUserSchema from "./createUserSchema";
import {
  StyledTextFiled,
  StyledSelectedFiled,
} from "component/StyledComponent/StyledComponent";
import Address from "./Address";
import CreateUser from "./createUserSchema";

const gender = ["Male", "Female", "Transgender"];
const userType = ["Admin", "user"];

const CreateData = () => {
  // const [save, setSave] = useState({})
  const [viewMode, setViewMode] = useState("post");
  // const [isEdit, setIsEdit] =useState(false)
  // const [userId, setUserId] = useState('')
  // const isMobile = useMediaQuery('(max-width:500px)')
  const [data,setData] = useState()
  const navigate = useNavigate();

  const location = useLocation();
  const id = location?.state ? location?.state?.id : "";

console.log(data,'data--------')  

  const initialValue = {
   'UserSchema':data?.user,
    'address':data?.address
  };

  useEffect(() => {
    if (id !== "") {
      EditDataById(id);
    }
  }, [id]);

  const handelSave = async () => {
    const obj = {
      userName: formik?.values?.UserSchema?.userName,
      age: formik?.values?.UserSchema?.age,
      gender: formik?.values?.UserSchema?.gender,
      email: formik?.values?.UserSchema?.email,
      roll: formik?.values?.UserSchema?.roll,
      type: formik?.values?.UserSchema?.type,
      phoneNumber: formik?.values?.UserSchema?.phoneNumber,
    };
    if (viewMode === "post") {
      const response = await postRequest("/api/service/create/user", {
        ...obj,
      });
      if (response.data.isSuccess) {
        toast.success("user added successfully");
        navigate("/");
      }
    } else {
      const obj = {
        userName: formik?.values?.UserSchema?.userName,
        age: formik?.values?.UserSchema?.age,
        gender: formik?.values?.UserSchema?.gender,
        email: formik?.values?.UserSchema?.email,
        roll: formik?.values?.UserSchema?.roll,
        type: formik?.values?.UserSchema?.type,
        // password: formik?.values?.UserSchema?.password,
        phoneNumber: formik?.values?.UserSchema?.phoneNumber,
      };

      const response = await putRequest(
        `/api/service/update/userId=${id}`,
        obj
      );
      if (response.data.update.isSuccess) {
        toast.success("user updated successfully");
        navigate("/");
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: CreateUser,
    onSubmit: handelSave,
    enableReinitialize: true
  });

  console.log(formik.values,'formik.values')


  const EditDataById = async () => {
    const res = await getRequest(`/api/service/getBy/userId=${id}`);
    if (res?.data?.isSuccess) {
      const data = res.data.employee;
      console.log(data,'data====')
      setData(data)
      setViewMode("put");
    } else {
      toast.error("data not found ");
    }
  };

  const handelCancel = () => {
    window.history.back();
    setViewMode("post");
  };

  return (
    <Grid
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid
          sx={{ display: "flex", justifyContent: "center " }}
          xs={12}
          sm={6}
        >
          <Paper
            elevation={3}
            sx={{ width: "90rem", height: "20rem", marginTop: "10rem" }}
          >
            <Grid
              xs={12}
              mt={5}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid xs={6} md={6} lg={6} xl={16} sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="UserSchema.userName"
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={formik?.values?.UserSchema?.userName}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.userName", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.UserSchema?.userName && formik?.touched?.UserSchema?.userName
                  )}
                />
                {Boolean(
                  formik?.touched?.UserSchema?.userName && formik?.touched?.UserSchema?.userName
                ) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.userName}
                  </Typography>
                )}
              </Grid>
              <Grid sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="UserSchema.age"
                  label="Age"
                  variant="outlined"
                  size="small"
                  value={formik?.values?.UserSchema?.age}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.age", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(formik?.touched?.UserSchema?.age && formik?.touched?.UserSchema?.age)}
                  helperText={formik?.touched?.UserSchema?.age && formik?.touched?.UserSchema?.age}
                />
                {Boolean(formik?.touched?.UserSchema?.age && formik?.touched?.UserSchema?.age) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.age}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormControl
                //   fullWidth
                variant="outlined"
                size="small"
                sx={{ marginTop: "1rem", width: "30rem" }}
              >
                <InputLabel
                  id="gender-label"
                  sx={{
                    color: formik?.values?.UserSchema?.gender
                      ? "#1976d2"
                      : formik?.touched?.UserSchema?.gender === true
                      ? "red"
                      : "",
                  }}
                >
                  Gender
                </InputLabel>
                <StyledSelectedFiled
                  labelId="gender-label"
                  userName="UserSchema.gender"
                  label="Gender"
                  value={formik?.values?.UserSchema?.gender}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.gender", e.target.value);
                  }}
                  sx={{ textAlign: "left" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.UserSchema?.gender && formik?.touched?.UserSchema?.gender
                  )}
                >
                  {gender.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </StyledSelectedFiled>
                {Boolean(formik?.touched?.UserSchema?.gender) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.gender}
                  </Typography>
                )}
              </FormControl>
              <Grid sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="UserSchema.roll"
                  label="Roll"
                  variant="outlined"
                  size="small"
                  value={formik?.values?.UserSchema?.roll}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.roll", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.UserSchema?.roll && formik?.touched?.UserSchema?.roll
                  )}
                />
                {Boolean(formik?.touched?.UserSchema?.roll && formik?.touched?.UserSchema?.roll) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.roll}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ marginTop: "1rem", width: "30rem" }}
              >
                <InputLabel
                  id="user-type-label"
                  sx={{
                    color: formik?.values?.UserSchema?.type
                      ? "#1976d2"
                      : formik?.touched?.UserSchema?.type === true
                      ? "red"
                      : "",
                  }}
                >
                  User Type
                </InputLabel>
                <StyledSelectedFiled
                  labelId="user-type-label"
                  userName="UserSchema.type"
                  label="User Type"
                  value={formik?.values?.UserSchema?.type}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.type", e.target.value);
                  }}
                  sx={{ textAlign: "left" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(formik?.touched?.UserSchema?.type)}
                >
                  {userType.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </StyledSelectedFiled>
                {Boolean(formik?.touched?.UserSchema?.type) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.type}
                  </Typography>
                )}
              </FormControl>
              <Grid sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="UserSchema.email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={formik?.values?.UserSchema?.email}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.email", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.UserSchema?.email && formik?.touched?.UserSchema?.email
                  )}
                />
                {Boolean(formik?.touched?.UserSchema?.email && formik?.touched?.UserSchema?.email) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.email}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
              <Grid sx={{ width: "30rem" }}></Grid>
              <Grid sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="UserSchema.phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  value={formik?.values?.UserSchema?.phoneNumber}
                  onChange={(e) => {
                    formik.setFieldValue("UserSchema.phoneNumber", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.UserSchema?.phoneNumber && formik?.touched?.UserSchema?.phoneNumber
                  )}
                />
                {Boolean(
                  formik?.touched?.UserSchema?.phoneNumber && formik?.touched?.UserSchema?.phoneNumber
                ) && (
                  <Typography
                    sx={{
                      color: "red",
                      width: "100%",
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    {formik?.errors?.phoneNumber}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
       <Address formik = {formik} />
        <Grid
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "12rem",
            }}
          >
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={handelCancel}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </form>
    </Grid>
  );
};

export default CreateData;
