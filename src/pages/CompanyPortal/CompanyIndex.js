import { Grid } from '@mui/material'
import employeeImage from '../../assets/coworkers-office-working-together.jpg'
import companyIndex from './companyIndex.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAccountDetailPage } from 'pages/Login/LoginSlice';
const CompanyIndex =()=>{

    const dispatch = useDispatch()
    useEffect(() => {
    
        dispatch(onAccountDetailPage(false))
    }, [])
return (
    <>
    <Grid className='index'>
    <img src={employeeImage} alt='image' className = 'employeeImage'/>
    </Grid>
    </>
)
} 
export default CompanyIndex