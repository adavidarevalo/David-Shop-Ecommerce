import React from 'react'
import { Form, Formik } from 'formik';
import TextField from './text_field';
import PasswordTextField from './password_text_field';
import { Button, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/user.actions';
import { UserState } from '../../redux/slices/user';
import { registrationSchema } from '../../schemas/registrations';

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = ({ email, password, name }: { email: string; name: string; password: string }) => {
    dispatch(register(name, email, password) as any);
  };


  const user = useSelector((state: { user: UserState }) => state.user);
  const { loading } = user;

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: "" }}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <TextField type='text' name='name' placeholder='Your first and last name' label='Full name' />
          <TextField type='text' name='email' placeholder='user@example.com' label='Email' />
          <PasswordTextField type='password' name='password' label='Password' placeholder='Your password' />
          <PasswordTextField
            type='password'
            name='confirmPassword'
            label='Confirm Your Password'
            placeholder='Confirm your password'
          />
          <Stack spacing={6} mt='10'>
            <Button colorScheme='orange' size={'lg'} fontSize={'md'} isLoading={loading} type='submit'>
              Sing up
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
