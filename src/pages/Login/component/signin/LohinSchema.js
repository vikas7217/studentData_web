import * as Yup from 'yup';

const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/;

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailReg, { message: "Invalid email" })
    .required('Required')
 
  .matches(emailReg, { message: "Invalid email" }),
  // .required('Required'),
  password: Yup.string().when(['isEmailVerified'], (value, schema) => {
    const [isEmailVerified] = value
    return isEmailVerified ? schema.required('Password is required') : schema;
  }),
  isEmailVerified: Yup.boolean(),

})

export default SignInSchema;
