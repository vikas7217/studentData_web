import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PasswordStrength = ({
    length, oneCapitalLatter, oneSmallLatter, specialChar, number, 
}) => {

    // const [length, setLength] = useState(false);
    // const [oneSmallLatter, setOneSmallLatter] = useState(false);
    // const [oneCapitalLatter, setOneCapitalLatter] = useState(false);
    // const [specialChar, setSpecialChar] = useState(false);
    // const [number, setNumber] = useState(false);

    // const validatePassword = (passwordStrength) => {
    //     var strengthScore = 0;
    
    //     if(passwordStrength) {
    //     const smallLatter = /[a-z]/.test(passwordStrength);
    //     const capitalLatter = /[A-Z]/.test(passwordStrength);
    //     const number = /\d/.test(passwordStrength);
    //     // const specialChar = /[A-Za-z0-9]/.test(passwordStrength);
    //     const specialChar = /[^\w]/.test(passwordStrength);
    //     if (smallLatter) {
    //       strengthScore += 1;
    //       setOneSmallLatter(true);
    //     } else {setOneSmallLatter(false); }
    
    //     if (capitalLatter) {
    //       strengthScore += 1;
    //       setOneCapitalLatter(true);
    //     } else { setOneCapitalLatter(false); }
    
    //     if (number) {
    //       strengthScore += 1;
    //       setNumber(true);
    //     } else {  setNumber(false); }
    
    //     if (specialChar) {
    //       strengthScore += 1;
    //       setSpecialChar(true);
    //     }  else { setSpecialChar(false); }
    
    //     if (passwordStrength.length >= 8) {
    //       strengthScore += 1;
    //       setLength(true);
    //     } else {setLength(false);}
    
    //     // eslint-disable-next-line default-case
    //     switch (strengthScore) {
    //       case 0:
    //       case 1:
    //       case 2:
    //         setStrength("Week");
    //         break;
    //       case 3:
    //       case 4:
    //         setStrength("Medium");
    //         break;
    //       case 5:
    //         setStrength("Strong");
    //         break;
    //     }
    // }
    //   };

    // useEffect(()=> {
    //    if (passwordStrength) {
    //     validatePassword()
    //    }
    // },[passwordStrength])
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
