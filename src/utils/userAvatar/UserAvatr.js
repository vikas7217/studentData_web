import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import userJson from './user.json'
const UserAvatar =({name, height, width, fontSize}) => {

    const [color,setColor]= useState('#aed7eb')
  
    const firstLatter = name?.split(' ')?.map((m)=> {return m[0].toUpperCase()})?.join('')?.slice(0,2)

    useEffect(()=>{
        for( const user of userJson.data) {
            if(user.userName === firstLatter) {
                setColor(user.color)

            }
        }
    },[firstLatter])
    return (
        <>
        <Avatar sx={{backgroundColor:color, height, width, fontSize}} >{firstLatter}</Avatar>
        </>
    )
}
export default UserAvatar 