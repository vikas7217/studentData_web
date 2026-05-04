import { FormControl, InputLabel, MenuItem, Paper, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import { StyledSelectedFiled, StyledTextFiled } from "component/StyledComponent/StyledComponent";

const Address =({formik})=>{



    return(
        <>
         <Grid2
                  sx={{ display: "flex", justifyContent: "center " }}
                  xs={12}
                  sm={6}
                >
                  <Paper
                    elevation={3}
                    sx={{ width: "90rem", height: "20rem", marginTop: "10rem" }}
                  >
                    <Grid2 sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormControl
                //   fullWidth
                variant="outlined"
                size="small"
                sx={{ marginTop: "1rem", width: "30rem" }}
              >
                <InputLabel
                  id="gender-label"
                  sx={{
                    color: formik.values.gender
                      ? "#1976d2"
                      : formik?.touched?.gender === true
                      ? "red"
                      : "",
                  }}
                >
                  Gender
                </InputLabel>
                <StyledSelectedFiled
                  labelId="gender-label"
                  userName="gender"
                  label="Gender"
                  value={formik?.values?.user?.gender}
                  onChange={(e) => {
                    formik.setFieldValue("gender", e.target.value);
                  }}
                  sx={{ textAlign: "left" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.gender && formik?.touched?.add
                  )}
                >
                  {/* {gender.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))} */}
                </StyledSelectedFiled>
                {Boolean(formik?.touched?.gender) && (
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
              <Grid2 sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="roll"
                  label="Roll"
                  variant="outlined"
                  size="small"
                  value={formik.values.roll}
                  onChange={(e) => {
                    formik.setFieldValue("roll", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.roll && formik?.touched?.roll
                  )}
                />
                {Boolean(formik?.touched?.roll && formik?.touched?.roll) && (
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
              </Grid2>
            </Grid2>
            <Grid2 sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ marginTop: "1rem", width: "30rem" }}
              >
                <InputLabel
                  id="user-type-label"
                  sx={{
                    color: formik.values.type
                      ? "#1976d2"
                      : formik?.touched?.type === true
                      ? "red"
                      : "",
                  }}
                >
                  User Type
                </InputLabel>
                <StyledSelectedFiled
                  labelId="user-type-label"
                  userName="type"
                  label="User Type"
                  value={formik.values.type}
                  onChange={(e) => {
                    formik.setFieldValue("type", e.target.value);
                  }}
                  sx={{ textAlign: "left" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(formik?.touched?.type)}
                >
                  {/* {userType.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))} */}
                </StyledSelectedFiled>
                {Boolean(formik?.touched?.type) && (
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
              <Grid2 sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.email && formik?.touched?.email
                  )}
                />
                {Boolean(formik?.touched?.email && formik?.touched?.email) && (
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
              </Grid2>
            </Grid2>
            <Grid2 sx={{ display: "flex", justifyContent: "space-around" }}>
              <Grid2 sx={{ width: "30rem" }}></Grid2>
              <Grid2 sx={{ width: "30rem" }}>
                <StyledTextFiled
                  fullWidth
                  userName="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  value={formik.values.phoneNumber}
                  onChange={(e) => {
                    formik.setFieldValue("phoneNumber", e.target.value);
                  }}
                  sx={{ marginTop: "1rem" }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  error={Boolean(
                    formik?.touched?.phoneNumber && formik?.touched?.phoneNumber
                  )}
                />
                {Boolean(
                  formik?.touched?.phoneNumber && formik?.touched?.phoneNumber
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
              </Grid2>
            </Grid2>
                  </Paper>
                </Grid2>
        </>
    )

}
export default Address