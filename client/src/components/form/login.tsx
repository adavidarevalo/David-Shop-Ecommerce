import React, { Form, Formik } from 'formik';
import { loginSchema } from '../../schemas/login';
import TextField from './text_field';
import PasswordTextField from './password_text_field';
import { Button, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/user.actions';
import { AppDispatch, AppState } from '../../redux/store';

export default function LoginForm() {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = ({ email, password }: { email: string; password: string }) => {
    dispatch(login(email, password));
  };

  const user = useSelector((state: AppState) => state.user);
  const { loading } = user;

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <TextField type="text" name="email" placeholder="user@example.com" label="Email" />
          <PasswordTextField
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
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
