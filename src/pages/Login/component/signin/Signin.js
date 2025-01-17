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
import './Singin.scss'

const Signin = () => {

    const emailValidate = useSelector((state) => { return state.LoginReducer })
    const isEmailExist = emailValidate?.login?.isValidEmail;
    const isPasswordExist = emailValidate?.isPasswordExist
    const dispatch = useDispatch()

    const [emailChange, setEmailChange] = useState(false);
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
            handelSaveLocal(data)
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
    

    const handelCreatePassword = (e) => {

        if (isEmailExist) {
            dispatch(createNewUserPassword(true));
            dispatch(loginPage(false))
        }
    }
    return (
        <>

            <form onSubmit={formik.handleSubmit} id="login_form" className="login_form_Page">

                <Grid xs={12} mt={5}>
                    <Grid xs={12} mt={5} sx={{ display: 'flex' }}>
                        <Grid xs={11} sm={12} sx={{ width: '100%' }}>


                            <StyledTextFiled
                                id="email_filed"
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
                                <Typography className="error_message" >
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
                    <Grid xs={12} mt={5}>

                        <StyledTextFiled 
                            id="password_filed"
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
                            <Typography className="error_message" >
                                {formik.errors.password}
                            </Typography>
                        }
                    </Grid>
                    <Grid mt={4} sx={{display: 'flex', justifyContent: 'start'}}>
                        { isEmailExist&&isPasswordExist&& emailChange&& <span onClick={handelCreatePassword} id="forget_password" className="forget_password" style={{cursor:'pointer'}} >Forgot Password</span>}
                    </Grid>

                    <Grid mt={4}>
                        {!isPasswordExist & isEmailExist & emailChange ? 
                            <Button id="create_password" variant="contained" disabled={!emailValidate} onClick={() => handelCreatePassword()} > Create Password </Button>
                            : !isLoading ? <Button variant="contained" type="submit" disabled={!isEmailExist || formik.values.password === '' ? true : false}>
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