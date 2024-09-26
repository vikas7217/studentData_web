import { Password } from '@mui/icons-material';
import * as Yup from 'yup';

const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/;

const CreatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8,"Password must be at least 8 character")
    .required('Password is  required'),
  // .required('Required'),
  confPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must be matched")
  .required("Conform password is required"),
  isEmailVerified: Yup.boolean(),

})

export default CreatePasswordSchema;