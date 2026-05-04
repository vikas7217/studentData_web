import { Grid } from '@mui/material'
import employeeImage from '../../assets/teams-teamwork.avif'
import './companyIndex.scss';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAccountDetailPage } from 'pages/Login/LoginSlice';
import { getRequest } from 'Dada/Axios';
import GetTimePeriod from 'component/TimePeriod';

const CompanyIndex =()=>{

const [name,setName] = useState()
const dispatch = useDispatch()
    
      const getAccount = async () => {
     
        try {
          const res = await getRequest(`/api/profile/user`);
          if (res?.data?.profile?.isSuccess) {
            setName(res?.data?.profile?.userProfile?.userName)
          }
        } catch (error) {
          console.error("error", error);
        }
      };

      const getTime = GetTimePeriod()

   


    useEffect(() => {     
        dispatch(onAccountDetailPage(false))
    }, [])

    useMemo(()=>{
      getAccount()
    },[])
return (
  <Grid className="index">
  <div className="image-container">
    <img src={employeeImage} alt="image" className="employeeImage" />
    <span className="employee-name">{getTime+' '+ name}</span>
  </div>
</Grid>
)
} 
export default CompanyIndex