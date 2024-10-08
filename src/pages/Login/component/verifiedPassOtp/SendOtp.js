import { Button, Grid, Typography } from "@mui/material"
import { StyledTextFiled } from "component/StyledComponent/StyledComponent"
import { useFormik } from "formik"
// import { Boolean } from "yup"
import VerifyOtpSchema from "./SendOtpSchema"
import {  postRequest } from "Dada/Axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { sendOtp, setUserEmail, validateEmail, verifiedOtp } from "pages/Login/LoginSlice"
import { useState } from "react"

const SendOtp = () => {


    const [verifyOtp, setVerifyOtp] = useState()
    const [hideVerification, setHideVerification] =useState(true)

    const getRedux = useSelector((state)=>{return state.LoginReducer});

    const dispatch = useDispatch()

    const initialValue={
        email:'',
        isEmailExist:''
    }
debugger
const handelSandOtp = async () =>{
    const obj = {
        sendTo: formik.values.email,
        subject: 'verification code'
    }
    try {
        const response = await postRequest('/api/login/sendMailOtp',obj)
        if (response.data.isSuccess) {
            toast.success(response.data.message);
            dispatch(sendOtp(true))
            setHideVerification(false)
        }
    } catch (error) {
        toast.error(error)
    }

}

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: VerifyOtpSchema,
        onSubmit: handelSandOtp,
    })


    const handelVerifyOtp = async() =>{
        const obj = {
            otp: verifyOtp
        }
        try {
            
            const res =  await postRequest(`/api/login/verified/${formik.values.email}`, obj);
            if ((await res).data.isSuccess) {
                    toast.success(res.data.message)
                    dispatch(verifiedOtp(true))
                    dispatch(setUserEmail(formik.values.email))
                    dispatch(validateEmail(false))

            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error(error)
        }

    }



    return (
        <>
            <Grid>
                
                { getRedux?.isCreateNewUserPass &&  hideVerification &&<Grid>
                    <Grid sx={{}}>
                        <StyledTextFiled 
                        fullWidth
                        size="small"
                        label='Enter valid email '
                        name="email" 
                        // type="email" 
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value)
                        }}

                        onBlur={(e) => {
                            formik.handleBlur(e);
                            // checkIsValidate(e);
                        }}

                        error={Boolean(
                            formik.touched.email && formik.touched.email
                        )
                        }

                    />
                    {
                        Boolean(
                            formik.touched.email && formik.touched.email
                        ) &&
                        <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                            {formik.errors.email}
                        </Typography>
                    }
                    </Grid>
                    <Grid mt={2} >
                        <Button onClick={()=>formik.handleSubmit()}> Send OTP</Button>
                    </Grid>
                </Grid>}

                { getRedux?.isOtpSend && <Grid>
                    <Grid sx={{}}>
                        <StyledTextFiled 
                        fullWidth
                        size="small"
                        label='Enter your otp '
                        // name="email" 
                        // type="email" 
                        value={verifyOtp}
                        onChange={(e) => {
                            setVerifyOtp(e.target.value)
                        }}

                    />
                    
                    </Grid>
                    <Grid mt={2} >
                        <Button onClick={handelVerifyOtp}> Verify </Button>
                    </Grid>
                </Grid>}

            </Grid>
        </>
    )
}
export default SendOtp