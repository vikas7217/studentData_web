import * as Yup from 'yup';

const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/;

const VerifyOtpSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailReg, { message: "Invalid email" })
    .required('Required')
 
  .matches(emailReg, { message: "Invalid email" }),
  isEmailVerified: Yup.boolean(),

})

export default VerifyOtpSchema;