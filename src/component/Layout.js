
// import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MainNavbar } from "./NavBar/Mainnavbar";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const Layout=({orgType})=>{

        const getType = useSelector((state)=>{ return state.LoginReducer.userType})

        const OrgType = getType ? getType : orgType; 

    return(
        <>
        <Grid>

        { OrgType ==='user' && 
        (
        <Grid>
            <MainNavbar />
            <Outlet />
          
          </Grid>)
          }

           { OrgType ==='Admin' && 
        (
        <Grid>
            <MainNavbar />
            <Outlet />
          
          </Grid>)
          }
        </Grid>
        <Grid>
            {
                !OrgType &&(
                    <Grid>
                        <Outlet />
                    </Grid>          

                )
            }
        </Grid>
        </>
    )

}
export default Layout