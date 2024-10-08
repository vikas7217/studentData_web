import axios from 'axios'
import { toast } from 'react-toastify'

export const getRequest = async (url) => {
    // const baseUrl = 'http://localhost:4000'
    // let baseUrlNest = 'http://localhost:5000' 
    // const baseUrlNest = process.env.REACT_BASE_URL;
    const baseUrlNest = process.env.REACT_APP_API_URL;
    const accessToken = localStorage.getItem("access_Token")

    const headers = {
                Authorization: `Bearer ${accessToken}`
            }

    try {
        const response = await axios.get(`${baseUrlNest}${url}`,{headers})
        if (response.data) {
            
            return response
            
        } else {
            alert('token expire')
        }

    }
    catch (error) {
        console.error('error', error)
        toast.error(error)
        if(error.response.data.statusCode === 401){
            localStorage.clear()
            window.location.reload();
            toast.error('Login token is expired')
           
        }
    }
}

export const postRequest =async(url,payload)=>{



    // const baseUrl = 'http://localhost:4000'
    // let baseUrlNest = 'http://localhost:5000' ;
    const baseUrlNest = process.env.REACT_APP_API_URL;

    // const baseUrlNest = process.env.REACT_BASE_URL;

    try {
        const response = await axios.post(`${baseUrlNest}${url}`,{...payload})
        if (response.data) {
            return response
        }
    }
    catch (error) {
        console.error('error', error)
        toast.error(error)
        if(error.response.data.statusCode === 401){
            localStorage.clear()
            window.location.reload()
            toast.error('Login token is expired')
        }
    }
}


export const putRequest =async(url,payload)=>{



    // const baseUrl = 'http://localhost:4000'
    // let baseUrlNest = 'http://localhost:5000' ;
    const baseUrlNest = process.env.REACT_APP_API_URL;

    // const baseUrlNest = process.env.REACT_BASE_URL;
    const accessToken = localStorage.getItem("access_Token")

    const headers = {
                Authorization: `Bearer ${accessToken}`
            }

    try {
        const response = await axios.put(`${baseUrlNest}${url}`,{...payload},{headers})
        if (response.data) {
            return response

        }else{
            toast.error('error')
        }
    }
    catch (error) {
        console.error('error', error)
        toast.error(error)
        if(error.response.data.statusCode === 401){
            localStorage.clear()
            window.location.reload()
            toast.error('Login token is expired')

        }
    }
}