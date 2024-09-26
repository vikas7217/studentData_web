import { createSlice } from "@reduxjs/toolkit";

const initialState={

    userType:'',
    login:{
        email:'',
        isValidEmail:false
    },
    isPasswordForgot: false,
    isPasswordChanged: false,
    isChangePassword: false,
    isResetPassword: false,
    isOtpIsVerified: false,
    isOtpSend: false,
    isPasswordExist: false,
    isLoginPage:true,
    isNewUserPasswordCreated:false,
    isCreateNewUserPass: false,
    isOnAccountDetailPage: false,
    isChangePassToken:''
    
}

const loginSlice =createSlice({
    name:'LoginSlice',
    initialState,
    reducers:{
        updateType: (state,action) => {
            state.userType = action.payload;
        },
        validateEmail: (state,action) => {
            state.login.isValidEmail = action.payload;
        },
        setUserEmail: (state,action) => {
            state.login.email = action.payload;
        },
        forgotPassword: (state,action) => {
            state.isPasswordForgot = action.payload;
        },
        verifiedOtp: (state,action) => {
            state.isOtpIsVerified = action.payload;
        },
        resetPassword: (state,action) => {
            state.isResetPassword = action.payload;
        },
        passwordChanged: (state,action) => {
            state.isPasswordChanged = action.payload;
        },
        passwordExist: (state,action) => {
            state.isPasswordExist = action.payload;
        },
        sendOtp: (state,action) => {
            state.isOtpSend = action.payload;
        },
        loginPage: (state,action) => {
            state.isLoginPage = action.payload;
        },
        createPassword: (state,action) => {
            state.isNewUserPasswordCreated = action.payload;
        },
        createNewUserPassword: (state,action) => {
            state.isCreateNewUserPass = action.payload;
        },
        changePassword: (state,action) => {
            state.isChangePassword = action.payload;
        },
        onAccountDetailPage: (state,action) => {
            state.isOnAccountDetailPage = action.payload
        }, 
        changePassToken: (state,action) => {
            state.isChangePassToken = action.payload
        }
        
    }
})

export const { loginPage, updateType, validateEmail, forgotPassword, verifiedOtp, resetPassword, passwordChanged, passwordExist, sendOtp, createPassword,createNewUserPassword, setUserEmail,onAccountDetailPage, changePassword, changePassToken } =loginSlice.actions

export default loginSlice.reducer