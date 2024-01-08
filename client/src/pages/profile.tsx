import React, { useEffect } from 'react';
import { UserState } from '../redux/slices/user';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import ProfileForm from '../components/form/profile';

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: { user: UserState }) => state.user);
  const { error, userInfo, loading } = user;

  useEffect(() => {
    if (!userInfo?._id) {
      navigate('/login');
    }
  }, [userInfo, error, navigate, location.state]);

  return (
    <Box
      minH={'90vh'}
      maxW={{ base: '3xl', lg: '7xl' }}
      mx={'auto'}
      py={{ base: '4', md: 8, lg: 12 }}
      px={{ base: 6, md: 8, lg: 12 }}
    >
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack pr={{ base: 0, md: 10 }} flex={1.5} mb={{ base: '2xl', md: 'node' }}>
          <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
            Perfil
          </Heading>
          <Stack spacing={6}>
            <Stack spacing={6}>
              {error && loading === false && (
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
                <ProfileForm />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack pr={{ base: 0, md: 10 }} flex={0.75} mb={{ base: '2xl', md: 'node' }}>
          <Flex
            direction={'column'}
            align={'center'}
            flex={1}
            _dark={{ bg: 'gray.900' }}
            mt={{ base: 10, lg: 0 }}
          >
            <Card>
              <CardHeader>
                <Heading size={'md'}>Informe de usuario</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                  <Box pt={2} fontSize={'sm'}>
                    Registrado en {new Date(userInfo?.createAt as string).toDateString()}
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
}
