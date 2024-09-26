import { Grid } from "@mui/material"
import { MenuItem }  from "./Menuitem";
import NavLink from "./NavItem"
import { useState } from "react";
import './Navmenuitem.scss'
import { MediaQuery } from "utils/ReactMediaQuery";
import { useSelector } from "react-redux";
const NavMenuItem=()=>{

    const [navItem,setNavItem]  = useState(MenuItem)
    const getRollTypeLocal = localStorage.getItem('userType')
    const getRollType = useSelector((state)=>state.LoginReducer.userType);

const ReduceDuplicate =(navMenus)=>{
        const removeDuplicate = navMenus.reduce((acc,current)=>{
            const remove = acc.find((item)=>item.title === current.title)
            if(!remove){
                acc.push(current)
            }
            return acc
        },[])
        return removeDuplicate
}

const navMenu = ReduceDuplicate(navItem)

const isMobile = MediaQuery()
const RollType = getRollType ?  getRollType : getRollTypeLocal;
    const columnHide = RollType === 'user' ? ['Create']  : []

return(
    <>
    <Grid>
       { <ul className="nav-menuitem" style={{display:isMobile ? 'block' : 'flex'}} >
            {navMenu?.map((item,key)=>(
                columnHide.includes(item.title) ? null : (
                <>

                  <NavLink key={key} item={item} /> 
                </>
                )
            ))}
            
        </ul> 
        // : 
        // <ul className="nav-menuitem" style={{display:isMobile ? 'block' : 'flex'}} >
        //     {navMenu?.map((item,key)=>(
        //         <>

        //           <NavLink key={key} item={item} /> 
        //         </>
        //     ))}
            
        // </ul>
        }
       
    </Grid>
    </>
)
    

}
export default NavMenuItem