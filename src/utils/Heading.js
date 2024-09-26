import { Grid, Typography } from "@mui/material"

const Heading =({icon, value}) =>{ 
 return(  
     <Grid sx={{display:'flex'}}>
        <img src={icon} alt="image"  style={{height:'1.3rem', width:'1.3rem'}}/>
        <Typography ml={1}>{value}</Typography>
    </Grid>
    )

}
export default Heading