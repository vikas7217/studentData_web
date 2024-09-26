import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"

const UserAvatar =({name, height, width, fontSize}) => {

    const [color,setColor]= useState('blue')

    const firstLatter = name?.charAt(0).toUpperCase()
    const secondLatter = name?.charAt(0).toUpperCase()
    useEffect(()=>{
        if(firstLatter==='B') {
            setColor('bisque')
        }
        if(firstLatter==='V') {
            setColor('aqua')
        }
        if(firstLatter==='A') {
            setColor('antiquewhite')
        }
        if(firstLatter==='R') {
            setColor('coral')
        }
        if(firstLatter==='H') {
            setColor('wheat')
        }
        if(firstLatter==='N') {
            setColor('cornsilk')
        }
        if(firstLatter==='P') {
            setColor('darkorange')
        }
        if(firstLatter==='G') {
            setColor('lemonchiffon')
        }
        if(firstLatter==='J') {
            setColor('#f38484')
        }
        if(firstLatter==='M') {
            setColor('#cccc69')
        }
    },[])

    return (
        <>
        <Avatar sx={{backgroundColor:color, height, width, fontSize}} >{firstLatter}{secondLatter}</Avatar>
        </>
    )
}
export default UserAvatar 