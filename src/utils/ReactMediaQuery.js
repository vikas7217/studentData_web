import useMediaQuery  from "@mui/material/useMediaQuery"

export const MediaQuery = () =>{
    // const useMedia =()=>{
        const isMobile = useMediaQuery('(max-width:500px)')
        return isMobile
    // }
}