import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import TextField from './text_field';
import PasswordTextField from './password_text_field';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUpdateSuccess, updateProfile } from '../../redux/actions/user.actions';
import { UserState } from '../../redux/slices/user';
import { registrationSchema } from '../../schemas/registrations';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';

export default function ProfileForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: { user: UserState }) => state.user);
  const { loading, userInfo, updateSuccess } = user;
  const toast = useToast();

  const handleSubmit = ({
    email,
    password,
    name,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    dispatch(resetUpdateSuccess());
    dispatch(updateProfile(userInfo?._id as string, name, email, password));
  };

  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetUpdateSuccess());
      toast({ description: 'User updated successful.', status: 'success', isClosable: true });
      navigate('/products');
    }
  }, [updateSuccess]);

  return (
    <Formik
      initialValues={{
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        password: '',
        confirmPassword: '',
      }}
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
              Actualizar
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
