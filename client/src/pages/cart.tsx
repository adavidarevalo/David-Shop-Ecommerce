import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  Spinner,
  Stack,
  Wrap,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import CartItem from '../components/cart_item';
import CartOrderSummary from '../components/cart_order_summary';
import { useSelector } from 'react-redux';
import { CartState } from '../redux/slices/cart';

export default function CartPage() {
    const cartItems = useSelector((state: { cart: CartState }) => state.cart);
    const { cart, error, loading} = cartItems;
  
  return (
    <Wrap spacing={'30px'} justify={'center'} minHeight={'85vh'}>
      {error && loading === false && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && (
        <Stack direction={'row'} spacing={4} display={'flex'} w={'100vw'} justify={'center'}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
        </Stack>
      )}
      {cart.length <= 0 && loading === false && (
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Your cart is empty.</AlertTitle>
          <AlertDescription>
            <Link as={RouterLink} to='/products'>
              Click here to see our products.
            </Link>
          </AlertDescription>
        </Alert>
      )}
      {cart.length > 0 && loading === false && (
        <Box
          maxW={{ base: '3xl', lg: '7xl' }}
          mx='auto'
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}>
            <Stack spacing={{ base: '8', md: '10' }} flex={2}>
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                Shopping Cart
              </Heading>
              <Stack spacing={'6'}>
                {cart.map((cartItem: any) => (
                  <CartItem key={cartItem._id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction={'column'} align={'center'} flex={1}>
              <CartOrderSummary />
              <HStack mt={6} fontWeight={'semibold'}>
                <p>or</p>
                <Link as={RouterLink} to='/products' color={mode('orange.500', 'orange.200')}>
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
}
