import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import './Navitem.scss'
import { useNavigate } from "react-router-dom";
import SubNav from "./SubNav";
import { MediaQuery } from "utils/ReactMediaQuery";

const NavLink=(item,key)=>{
    const navItem = item.item
    const [activeImg, setActiveImg] = useState(false)
    const [subImgActive, setSubImgActive] = useState(false)
    const [openSubNav, setOpenSubNav] = useState(false)
    const navItemRef = useRef(null);
    const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navItemRef.current && !navItemRef.current.contains(event.target)) {
        setOpenSubNav(false);

      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handelNavigateNav=(links)=>{
navigate(links.path)

  }

  const isMobile = MediaQuery()

    return(
        <>
            <Grid>
                <ul 
                  style={{cursor:'pointer'}}
                  
                > 
                <li className="nav-list" ref={navItemRef}
                  onMouseEnter={()=>{
                    setActiveImg(true)
                    // setOpenSubNav(true)
                  }}

                  onMouseLeave={()=>{
                    setActiveImg(false)
                    // setOpenSubNav(false)
                  }}>
                    {
                       navItem?.subNav ? (
                        <div>
                        <Button size="small" className={activeImg ? "nav-list-title-hover" : "nav-list-title"} 
                            onClick={()=>{setOpenSubNav(true)}}
                            
                        >
                            {navItem.title}
                            {navItem.icon}

                        </Button >
                        </div>

                       ) : '' 


                    }
                    
                </li>
               
                </ul>
                
                    { 
                    openSubNav  ?
                    <li className="subNav" style={{position:isMobile ? 'unset' : 'absolute'}} >
                      {(navItem?.subNav.map((item,key)=>(
                          
                            
                        //    <Button  
                        //    className={ subImgActive ? 'subNav-button-hover' : "subNav-button"}
                        //    sx={{ backgroundColor: subImgActive ? '#0bb2f6' : '#fff'}}
                        //     onMouseEnter={()=>{
                        //         setSubImgActive(true)
                                
                        //     }}
                        //     onMouseLeave={()=>{
                        //         setSubImgActive(false)
                        //         // setOpenSubNav(false)
                        //       }}
                        //       onClick={(e)=>{handelNavigateNav(item)}}
                        //     // className={activeImg ? "nav-list-title-hover" : "nav-list-title"} 
                        //     key={key}
                        //     >
                        //         {Array.isArray(item.icon)===true ? (subImgActive ? item.icon[0] : item.icon[1] ) : (item.icon[0])}
                               
                        //        {item.title}
                        //    </Button> 
                           <SubNav item={item} />
                        
                    )))}
                    </li>
                    : ''
                }
                
            </Grid>
        </>
    )

}
export default NavLink;