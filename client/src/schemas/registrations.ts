import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  name: Yup.string().min(5).required('Name is required'),
  email: Yup.string().email('Invalid email.').required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Password is required'),
});
