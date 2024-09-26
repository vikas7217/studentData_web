import { useFormik } from "formik"
import SignInSchema from "./LohinSchema"
import { useEffect, useState } from "react"
import { Button, Grid, IconButton, InputAdornment, LinearProgress, Typography } from "@mui/material"
// import { boolean } from "yup"
import { getRequest, postRequest } from "Dada/Axios"
import { useNavigate } from "react-router-dom";
import { createNewUserPassword, loginPage, passwordExist, updateType, validateEmail } from "../../LoginSlice"
import { useDispatch, useSelector } from "react-redux"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { toast } from "react-toastify"
import { StyledTextFiled } from "component/StyledComponent/StyledComponent"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { isCancel } from "axios"
const Signin = () => {

    const emailValidate = useSelector((state) => { return state.LoginReducer })
    const isEmailExist = emailValidate?.login?.isValidEmail;
    const isPasswordExist = emailValidate?.isPasswordExist
    const dispatch = useDispatch()

    const [emailChange, setEmailChange] = useState(false);
    // const [disablePass, setDisabledPass] = useState(true)
    // const [isLoading, setIsLogin] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const navigate = useNavigate()
    const [isLoading, setIsLogin] = useState(false)

    const initialValue = {
        email: '',
        password: '',
        isValidEmail: false
    }


    const checkIsValidate = async () => {
        const email = formik.values.email
        try {
            if (email) {
                const req = await getRequest(`/api/login/validate/${email}`);
                const data = await req.data;

                if (!data.isEmailExist) {
                    toast.error('User is not Exist with this email')
                    dispatch(validateEmail(data.isEmailExist))
                    dispatch(passwordExist(data.isPasswordExist))
                    formik.setFieldValue('isValidEmail', data.isValidate)
                    setEmailChange(true)

                } else {
                    dispatch(validateEmail(data.isEmailExist))
                    dispatch(passwordExist(data.isPasswordExist))
                    formik.setFieldValue('isValidEmail', data.isValidate)
                    setEmailChange(true)
                }
            }
        } catch (error) {
            toast.error('User is not Exist with this email')
            dispatch(validateEmail(false))
        }

    }

    // const handelAccount = async (data) => { 
    //     setIsLogin(true);
    //     const accessToken = data.access_token
    //     const headers = {
    //         Authorization: `Bearer ${accessToken}`
    //     }
    //     const req =await getRequest('/api/profile/user', headers);
    //     if (req?.data?.profile?.isSuccess) {
    //         const userData = req?.data?.profile?.userProfile;
    //         localStorage.setItem('userType', userData.type)
    //         localStorage.setItem('userEmail', userData.email)
    //         localStorage.setItem('userId', userData.id)
    //         dispatch(updateType(userData.type))
    //         toast.success('Login Successfully')
    //         if (userData.type) {
    //             navigate('/home')
    //         }
    //         setIsLogin(false)
    //     } else{
    //         setIsLogin(false)
    //     }

    // }

    const handelSaveLocal = (data) => {
        localStorage.setItem('access_Token', data?.access_token)
        localStorage.setItem('userType', data?.type)
        localStorage.setItem('userEmail', data?.email)
        localStorage.setItem('userId', data?.id)
        localStorage.setItem('userName', data?.userName)
        dispatch(updateType(data?.type))
        toast.success('Login Successfully')
        if (data?.type) {
            navigate('/')
        }
        setIsLogin(false)
    }

    const handelLogin = async () => {
        setIsLogin(true)
        const reqBody = {
            email: formik.values.email,
            password: formik.values.password
        }
        const req = await postRequest('/api/auth/login', reqBody)

        const data = await req.data;
        if (data?.isSuccess === true && data?.access_token) {
            // handelAccount(data)
            handelSaveLocal(data)
            // localStorage.setItem('access_Token', JSON.stringify(data?.access_token))

            setIsLogin(false)
        }
        if (data?.isSuccess === true && data?.message === "Incorrect Password") {
            toast.error(data?.message)
            setIsLogin(false)
        }
    }

    const formik = useFormik({

        initialValues: initialValue,
        validationSchema: SignInSchema,

        onSubmit: handelLogin
    })


    useEffect(() => {

    }, [])
    // debugger
    // const handelCreatePassword = (e) =>{

    //     if(isEmailExist) { 
    //         dispatch(createNewUserPassword(true));
    //         dispatch(loginPage(false))
    //     }
    // }

    const handelCreatePassword = (e) => {

        if (isEmailExist) {
            dispatch(createNewUserPassword(true));
            dispatch(loginPage(false))
        }
    }
    return (
        <>

            <form onSubmit={formik.handleSubmit}>

                <Grid xs={12}>
                    <Grid xs={12} sx={{ display: 'flex' }}>
                        <Grid xs={11} sm={12} sx={{ width: '100%' }}>


                            <StyledTextFiled
                                fullWidth
                                size="small"
                                label='User Email'
                                name="email"
                                value={formik.values.email}
                                onChange={(e) => {
                                    formik.setFieldValue('email', e.target.value)
                                    setEmailChange(false)
                                }}

                                onBlur={(e) => {
                                    formik.handleBlur(e);
                                    checkIsValidate(e);
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
                        <Grid xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "green" }}>

                            {
                                isEmailExist && emailChange ? <span style={{ marginLeft: '0.2rem' }}>  <CheckCircleOutlineOutlinedIcon /> </span> : ""
                            }
                        </Grid>
                    </Grid>
                    <Grid xs={12} mt={2}>

                        <StyledTextFiled
                            fullWidth
                            size="small"
                            label='Password'
                            name="password"
                            value={formik.values.password}
                            type={isVisible ? "text" : 'password'}
                            onChange={(e) => {
                                formik.setFieldValue('password', e.target.value)
                            }}
                            onBlur={(e) => {
                                formik.handleBlur(e)
                            }}

                            error={Boolean(
                                formik.touched.password && formik.touched.password
                            )}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setIsVisible(!isVisible)}
                                            edge="end"
                                        >
                                            {isVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            disabled={!isEmailExist ? true : !isPasswordExist ? true : false}
                        />

                        {
                            Boolean(
                                formik.touched.password && formik.touched.password
                            ) &&
                            <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                {formik.errors.password}
                            </Typography>
                        }
                    </Grid>
                    <Grid sx={{display: 'flex', justifyContent: 'start'}}>
                        { isEmailExist&&isPasswordExist&& emailChange&& <Button onClick={handelCreatePassword}><Typography type='button' sx={{fontSize: '10px',color: '#02a0fc'}}>Forgot Password</Typography></Button>}
                    </Grid>

                    <Grid mt={2}>
                        {!isPasswordExist & isEmailExist & emailChange ? 
                            <Button variant="outlined" disabled={!emailValidate} onClick={() => handelCreatePassword()} > Create Password </Button>
                            : !isLoading ? <Button variant="outlined" type="submit" disabled={!isEmailExist || formik.values.password === '' ? true : false}>
                                Login
                            </Button> :
                                <LinearProgress />}
                    </Grid>
                </Grid>

            </form>
        </>
    )
}

export default Signin