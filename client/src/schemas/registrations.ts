import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  name: Yup.string().min(5).required('Name is required'),
  email: Yup.string().email('Invalid email.').required('Email is required'),
  password: Yup.string()
    .min(8, 'El password debe tener al menos 8 caracteres')
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      'El password debe contener al menos una letra, un dígito y un carácter especial'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Password is required'),
});
