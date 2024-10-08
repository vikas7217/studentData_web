import * as Yup from 'yup';

// const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/;

const ChangePasswordSchema = Yup.object().shape({
     currentPassword: Yup.string()
   //   .min(8,"Password must be at least 8 character")
     .required('Password is  required'),
      newPassword: Yup.string()
     .min(8,"Password must be at least 8 character")
     .required('Password is  required'),
  // .required('Required'),
     confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], " Confirm password must be matched")
     .required("Confirm password is required"),
     isEmailVerified: Yup.boolean(),

})

export default ChangePasswordSchema;