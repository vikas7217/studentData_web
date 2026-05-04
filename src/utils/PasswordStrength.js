import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PasswordStrength = ({
    length, oneCapitalLatter, oneSmallLatter, specialChar, number, 
}) => {

  return (
    <>
      <Grid>
        <Typography
          sx={{ fontSize: "12px", display: "flex", textAlign: "center" }}
        >
          {length ? (
            <Grid sx={{ fontSize: "7px", color: "green" }}>
              <CheckCircleOutlineOutlinedIcon />
            </Grid>
          ) : (
            <CheckCircleOutlineOutlinedIcon />
          )}{" "}
          Minimum length of passwordStrength is 8 character 
        </Typography>
        <Typography
          sx={{ fontSize: "12px", display: "flex", textAlign: "center" }}
        >
          {oneCapitalLatter ? (
            <Grid sx={{ fontSize: "7px", color: "green" }}>
              <CheckCircleOutlineOutlinedIcon />
            </Grid>
          ) : (
            <CheckCircleOutlineOutlinedIcon />
          )}
          Password must be contain at least one Capital latter
        </Typography>
        <Typography
          sx={{ fontSize: "12px", display: "flex", textAlign: "center" }}
        >
          {oneSmallLatter ? (
            <Grid sx={{ fontSize: "7px", color: "green" }}>
              <CheckCircleOutlineOutlinedIcon />
            </Grid>
          ) : (
            <CheckCircleOutlineOutlinedIcon />
          )}
          Password must be contain at least one small latter{" "}
        </Typography>
        <Typography
          sx={{ fontSize: "12px", display: "flex", textAlign: "center" }}
        >
          {specialChar ? (
            <Grid sx={{ fontSize: "7px", color: "green" }}>
              <CheckCircleOutlineOutlinedIcon />
            </Grid>
          ) : (
            <CheckCircleOutlineOutlinedIcon />
          )}
          Password must be contain at least one special character
        </Typography>
        <Typography
          sx={{ fontSize: "12px", display: "flex", textAlign: "center" }}
        >
          {number ? (
            <Grid sx={{ fontSize: "7px", color: "green" }}>
              <CheckCircleOutlineOutlinedIcon />
            </Grid>
          ) : (
            <CheckCircleOutlineOutlinedIcon />
          )}
          Password must be contain at least one number
        </Typography>
      </Grid>
    </>
  );
};
export default PasswordStrength;
