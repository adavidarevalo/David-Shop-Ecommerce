import React from 'react'
import { Form, Formik } from 'formik';
import TextField from './text_field';
import PasswordTextField from './password_text_field';
import { Button, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/user.actions';
import { registrationSchema } from '../../schemas/registrations';
import { AppDispatch, AppState } from '../../redux/store';

export default function RegistrationForm() {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = ({ email, password, name }: { email: string; name: string; password: string }) => {
    dispatch(register(name, email, password));
  };


  const user = useSelector((state: AppState) => state.user);
  const { loading } = user;

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <TextField
            type="text"
            name="name"
            placeholder="Your first and last name"
            label="Full name"
          />
          <TextField type="text" name="email" placeholder="user@example.com" label="Email" />
          <PasswordTextField
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
          />
          <PasswordTextField
            type="password"
            name="confirmPassword"
            label="Confirm Your Password"
            placeholder="Confirm your password"
          />
          <Stack spacing={6} mt="10">
            <Button
              colorScheme="orange"
              size={'lg'}
              fontSize={'md'}
              isLoading={loading}
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
