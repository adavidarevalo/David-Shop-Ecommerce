import * as Yup from 'yup';

export const validationInformationSchema = Yup.object({
    address: Yup.string().min(5).required('Address is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
});
