import { Button, Grid } from "@mui/material"
import NavLink from "./NavItem"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SubNav = (item)=>{
    const subItem = item.item
    const [subImgActive, setSubImgActive] = useState(false)
    const navigate = useNavigate()
    const handelNavigateNav=(links)=>{
        navigate(links.item.path)
        
          }

          const handelActive =(item) =>{
            setSubImgActive(true)
          }

return(
    <>
    <Grid sx={{color:'red'}}>
    <Button  
                           className={ subImgActive ? 'subNav-button-hover' : "subNav-button"}
                           sx={{ backgroundColor: subImgActive ? 'red' : '#fff'}}
                            onMouseEnter={()=>{
                                
                                handelActive(item)
                            }}
                            onMouseLeave={()=>{
                                setSubImgActive(false)
                                // setOpenSubNav(false)
                              }}
                              onClick={(e)=>{handelNavigateNav(item)}}
                            // className={activeImg ? "nav-list-title-hover" : "nav-list-title"} 
                            // key={key}
                            >
                                {Array.isArray(subItem.icon)===true ? (subImgActive ? subItem.icon[1] : subItem.icon[0] ) : (subItem.icon[1])}
                               
                               {subItem.title}
                           </Button> 
    </Grid>
    </>
)
}
export default SubNav