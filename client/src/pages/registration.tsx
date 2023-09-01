import React, { useEffect } from 'react';
import {
  Text,
  Container,
  HStack,
  Heading,
  Stack,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../redux/slices/user';
import RegistrationForm from '../components/form/registration';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const redirect = '/products';

  const user = useSelector((state: { user: UserState }) => state.user);
  const { error, userInfo } = user;

  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBr = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo?._id) {
      navigate(redirect);
      toast({ description: 'Account created. Welcome aboard.', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Container maxW={'lg'} py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH={'4xl'}>
      <Stack spacing={'8'}>
        <Stack spacing={'6'}>
          <Stack spacing={{ base: '2', md: '3' }} textAlign={'center'}>
            <Heading size={headingBR}>Crea una cuenta</Heading>
            <HStack spacing={'1'} justify={'center'}>
              <Text color={'muted'}>¿Ya eres usuario?</Text>
              <Button as={RouterLink} to="/login" variant={'link'} colorScheme="orange">
                Login
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', md: '10' }}
          bg={{ boxBr }}
          boxShadow={{ base: 'none', md: 'xl' }}
        >
          <Stack spacing={6}>
            {error && (
              <Alert
                status="error"
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                textAlign={'center'}
              >
                <AlertIcon />
                <AlertTitle>¡Lo sentimos!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Stack spacing={5}>
              <RegistrationForm />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
