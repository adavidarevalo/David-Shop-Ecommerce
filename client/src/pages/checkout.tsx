import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '../redux/slices/user';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import ShippingInformation from '../components/form/shipping_information';
import CheckoutOrderSummary from '../components/checkout/order_summary';

export default function CheckoutPage() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const { userInfo } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?._id) {
      navigate('/login');
    }
  }, [userInfo]);

  return (
    <Box
      minH={'90vh'}
      maxW={{ base: '3xl', lg: '7xl' }}
      mx={'auto'}
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 6, md: 8, lg: 12 }}
    >
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack spacing={{ base: 8, md: 10 }} flex={1.5} mb={{ base: 12, md: 'none' }}>
          <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
            Información de envío
          </Heading>
          <Stack spacing={6}>
            <ShippingInformation />
          </Stack>
        </Stack>
        <Flex direction={'column'} align={'center'} flex={1}>
          <CheckoutOrderSummary />
        </Flex>
      </Stack>
    </Box>
  );
}
