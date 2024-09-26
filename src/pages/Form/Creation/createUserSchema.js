import * as Yup from 'yup';

const CreateUserSchema = Yup.object().shape({
    email: Yup.string()
    .email('invalid email address')
    .required('email is required'),

    userName: Yup.string()
    .required('name is required'),

    age: Yup.number()
    .typeError('age is must be a number')
    .required('age is required')
    .positive('age must be positive number'),

    gender: Yup.string().required('gender is required'),

    roll: Yup.string().required('roll is required'),

    type: Yup.string().required('user Type is required'),

    // password: Yup.string().required('password Type is required'),
    
    phoneNumber:Yup.string()
    .matches(/^\d+$/, 'Phone number must be a valid number')
    .test('is-ten-digits', 'Phone number must be exactly 10 digits', (value) => {
        if (!value) return false;  // Ensure value is not empty
        const digits = value.replace(/\D/g, ''); // Remove non-digit characters
        return digits.length === 10; // Check if the length is exactly 10 digits
    })
    .required('Phone number is required'),
})
export default CreateUserSchema;