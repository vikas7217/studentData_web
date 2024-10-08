import { Grid, Typography } from "@mui/material"

const Heading =({icon, value}) =>{ 
 return(  
     // eslint-disable-next-line react/jsx-no-comment-textnodes
     <Grid sx={{display:'flex'}}>
        <img src={icon} alt="avatar"  style={{height:'1.3rem', width:'1.3rem'}}/>
        <Typography ml={1} sx={{fontSize:'14px'}} >{value}</Typography>
    </Grid>
    )

}
export default Heading