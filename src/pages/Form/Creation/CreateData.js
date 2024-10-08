import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest } from "../../../Dada/Axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom"
import {  useFormik } from "formik";
import CreateUserSchema from "./createUserSchema";
import { StyledTextFiled,StyledSelectedFiled } from "component/StyledComponent/StyledComponent";

const gender = ['Male', 'Female',];
const userType = ['Admin', 'user']

const CreateData = () => {

    // const [save, setSave] = useState({})
    const [viewMode, setViewMode] = useState('post')
    // const [isEdit, setIsEdit] =useState(false)
    // const [userId, setUserId] = useState('')
    // const isMobile = useMediaQuery('(max-width:500px)')
    const navigate = useNavigate()

    const location = useLocation()
    const id = location?.state ? location?.state?.id : ''

    const initialValue = {
        id:  '',
        userName: '',
        age: '',
        gender: '',
        email: '',
        roll: '',
        type: '',
        phoneNumber: ''
    }    

    useEffect(() => {
        if (id !== '') {
            EditDataById(id)
            // setIsEdit(true)
        }
    }, [id])


    const handelSave = async () => {
        const obj = {
            userName: formik.values.userName,
            age: formik.values.age,
            gender: formik.values.gender,
            email: formik.values.email,
            roll: formik.values.roll,
            type: formik.values.type,
            phoneNumber: formik.values.phoneNumber
        }
        if (viewMode === 'post') {

            const response = await postRequest('/api/service/user', { ...obj });
            if (response.data.isSuccess) {

                toast.success('user added successfully')
                navigate('/')
            }
        }
        else {

            const obj = {
                userName: formik.values.userName,
                age: formik.values.age,
                gender: formik.values.gender,
                email: formik.values.email,
                roll: formik.values.roll,
                type: formik.values.type,
                // password: formik.values.password,
                phoneNumber: formik.values.phoneNumber
            }

            const response = await putRequest(`/api/service/${id}`,obj );
            if (response) {
                navigate('/')
            }

        }

    }
    const formik = useFormik({
        initialValues: initialValue ,
        validationSchema: CreateUserSchema,
        onSubmit: handelSave
    });
    // const userIdCreator = () => {
    //     const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    //     var randomId = ""
    //     for (let i = 0; i < 2; i++) {
    //         const randomAlphabet = alphabet[Math.floor(Math.random() * alphabet.length)];
    //         randomId += randomAlphabet
    //         for (let j = 0; j < 2; j++) {
    //             randomId += Math.floor(Math.random() * 10);
    //         }
    //     }
    //     setUserId(randomId)
    //     formik.setFieldValue('id', randomId)
    // }

    // useEffect(() => {
    //     if (id === '') {
    //         userIdCreator()
    //     }
    // }, [id])

    const handelSetFormikValue = (save) =>{
        formik.setValues({
        // "id": save.,
        "userName": save?.userName, 
        "age": save.age,
        "gender": save.gender,
        "email": save?.email,
        "roll": save?.roll,
        "type": save?.type,
        "phoneNumber":save.phoneNumber,
        })

    }
  

    const EditDataById = async () => {
        const res = await getRequest(`/api/service/${id}`)
        if (res?.data?.isSuccess) {
            const data = res.data.userById;
            handelSetFormikValue(data)
            setViewMode('put')
        } else {
            toast.error('data not found ')

        }
    }

    // const handelSetFormikValue = (save) => {
    //     formik.setFieldValue('userName', save?.userName);
    //     formik.setFieldValue('age', save?.age);
    //     formik.setFieldValue('gender', save?.gender);
    //     formik.setFieldValue('email', save?.email);
    //     formik.setFieldValue('roll', save?.roll);
    //     formik.setFieldValue('type', save?.type);
    //     formik.setFieldValue('phoneNumber', save?.phoneNumber);
    //   };




    const handelCancel = () => {
        window.history.back()
        setViewMode('post')
    }

    return (
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
            <form onSubmit={formik.handleSubmit}>
                <Grid sx={{ display: 'flex', justifyContent: 'center ', }} xs={12} sm={6}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>


                        {/* <TextField userName='id' label='id' variant='outlined' size='small' value={save.id} onChange={handelChangeData} sx={{ marginTop: '1rem' }} /> */}

                        <Grid>
                            <StyledTextFiled
                                userName='userName'
                                label='Name'
                                variant='outlined'
                                size='small'
                                value={formik?.values?.userName}
                                onChange={(e) => {
                                    formik.setFieldValue('userName', e.target.value)
                                }}
                                sx={{ marginTop: '1rem' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.userName && formik?.touched?.userName
                                )}
                            />
                            {
                                Boolean(
                                    formik?.touched?.userName && formik?.touched?.userName
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                    {formik?.errors?.userName}
                                </Typography>

                            }
                        </Grid>
                        <Grid>

                            <StyledTextFiled
                                userName='age'
                                label='Age'
                                variant='outlined'
                                size='small'
                                value={formik.values.age}
                                onChange={(e) => {
                                    formik.setFieldValue('age', e.target.value)
                                }}
                                sx={{ marginTop: '1rem' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.age && formik?.touched?.age
                                )}
                            />
                            {
                                Boolean(
                                    formik?.touched?.age && formik?.touched?.age
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                    {formik?.errors?.age}
                                </Typography>

                            }
                        </Grid>
                        {/* <Grid>

                            <StyledTextFiled
                                userName='password'
                                label='Password'
                                variant='outlined'
                                size='small'
                                value={formik.values.password}
                                onChange={(e) => {
                                    formik.setFieldValue('password', e.target.value)
                                }}
                                sx={{ marginTop: '1rem' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.password && formik?.touched?.password
                                )}
                            />
                            {
                                Boolean(
                                    formik?.touched?.password && formik?.touched?.password
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                    {formik?.errors?.password}
                                </Typography>

                            }
                        </Grid> */}
                        

                        <FormControl variant="outlined" size="small" sx={{ marginTop: '1rem' }}>
                            <InputLabel id="gender-label" sx={{ color: formik.values.gender ? '#1976d2' : formik?.touched?.gender === true ? 'red' : '' }}>Gender</InputLabel>
                            <StyledSelectedFiled
                                labelId="gender-label"
                                userName="gender"
                                label="Gender"
                                value={formik.values.gender}
                                onChange={(e) => {
                                    formik.setFieldValue('gender', e.target.value);
                                }}
                                sx={{ textAlign: 'left' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.gender && formik?.touched?.gender
                                )}
                            >
                                {gender.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </StyledSelectedFiled>
                            {
                                Boolean(
                                    formik?.touched?.gender
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }}>{formik?.errors?.gender}</Typography>
                            }
                        </FormControl>
                        <Grid>

                            <StyledTextFiled
                                userName='roll'
                                label='Roll'
                                variant='outlined'
                                size='small'
                                value={formik.values.roll}
                                onChange={(e) => {
                                    formik.setFieldValue('roll', e.target.value)
                                }}
                                sx={{ marginTop: '1rem' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.roll && formik?.touched?.roll
                                )}
                            />
                            {
                                Boolean(
                                    formik?.touched?.roll && formik?.touched?.roll
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                    {formik?.errors?.roll}
                                </Typography>

                            }
                        </Grid>

                        <FormControl variant="outlined" size="small" sx={{ marginTop: '1rem' }}>
                            <InputLabel id="user-type-label" sx={{color: formik.values.type ? '#1976d2' : formik?.touched?.type === true ? 'red' : ''}}>User Type</InputLabel>
                            <StyledSelectedFiled
                                labelId="user-type-label"
                                userName="type"
                                label="User Type"
                                value={formik.values.type}
                                onChange={(e) => {
                                    formik.setFieldValue('type', e.target.value);
                                }}
                                sx={{ textAlign: 'left' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(formik?.touched?.type)}
                            >
                                {userType.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </StyledSelectedFiled>
                            {
                                Boolean(
                                    formik?.touched?.type
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }}>{formik?.errors?.type}</Typography>
                            }
                        </FormControl>
                        <Grid>

                            <StyledTextFiled
                                userName='email'
                                label='Email'
                                variant='outlined'
                                size='small'
                                value={formik.values.email}
                                onChange={(e) => {
                                    formik.setFieldValue('email', e.target.value)
                                }}
                                sx={{ marginTop: '1rem' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.email && formik?.touched?.email
                                )}
                            />
                            {
                                Boolean(
                                    formik?.touched?.email && formik?.touched?.email
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                    {formik?.errors?.email}
                                </Typography>

                            }
                        </Grid>

                        <Grid>

                            <StyledTextFiled
                                userName='phoneNumber'
                                label='Phone Number'
                                variant='outlined'
                                size='small'
                                value={formik.values.phoneNumber}
                                onChange={(e) => {
                                    formik.setFieldValue('phoneNumber', e.target.value)
                                }}
                                sx={{ marginTop: '1rem' }}
                                onBlur={(e) => { formik.handleBlur(e) }}
                                error={Boolean(
                                    formik?.touched?.phoneNumber && formik?.touched?.phoneNumber
                                )}
                            />
                            {
                                Boolean(
                                    formik?.touched?.phoneNumber && formik?.touched?.phoneNumber
                                )
                                &&
                                <Typography sx={{ color: 'red', width: "100%", textAlign: 'start', fontSize: '12px' }} >
                                    {formik?.errors?.phoneNumber}
                                </Typography>

                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: '1rem' }} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '12rem' }}>
                        <Button variant='contained' type="submit">
                            Save
                        </Button>
                        <Button variant='outlined' onClick={handelCancel}>
                            Cancel
                        </Button>

                    </Box>

                </Grid>
            </form>
        </Grid>
    )
}

export default CreateData