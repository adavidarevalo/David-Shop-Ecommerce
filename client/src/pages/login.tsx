import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  HStack,
  Heading,
  Stack,
  useBreakpointValue,
  Text,
  Button,
  Box,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { UserState } from '../redux/slices/user';
import LoginForm from '../components/form/login';
import ErrorMessage from '../components/error_message';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const redirect = '/products';

  const user = useSelector((state: { user: UserState }) => state.user);
  const { error, userInfo } = user;

  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBr = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo?._id && location.state?.from) {
      navigate(location.state.from);
    }
    if (userInfo?._id && !location.state?.from) {
      navigate(redirect);
    }
    if (userInfo?._id) {
      toast({ description: 'Login successful.', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  return (
    <Container maxW={'lg'} py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH={'4xl'}>
      <Stack spacing={'8'}>
        <Stack spacing={'6'}>
          <Stack spacing={{ base: '2', md: '3' }} textAlign={'center'}>
            <Heading size={headingBR}>Log in to your account</Heading>
            <HStack spacing={'1'} justify={'center'}>
              <Text color={'muted'}>Don&apos;t have an account?</Text>
              <Button as={RouterLink} to='/registration' variant={'link'} colorScheme='orange'>
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', md: '10' }}
          bg={{ boxBr }}
          boxShadow={{ base: 'none', md: 'xl' }}>
          <Stack spacing={6}>
            {error && <ErrorMessage error={error} />}
            <Stack spacing={5}>
              <FormControl>
                <LoginForm />
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
