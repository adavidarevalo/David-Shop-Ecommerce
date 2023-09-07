import React, { useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Badge, Box, Divider, Flex, Heading, Link, Stack, Text, useColorModeValue as mode, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutItem from './item';
import { ChatIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import PaypalButton, { OnApproveData } from './paypal_button';
import { createOrder, resetOrder } from '../../redux/actions/order.actions';
import { resetCart } from '../../redux/actions/cart.actions';
import PaymentsErrorModal from './../modals/payments_error';
import PaymentsSuccessModal from './../modals/payments_success';
import { AppDispatch, AppState } from '../../redux/store';

export default function CheckoutOrderSummary() {
  const { onClose: onErrorClose, onOpen: onErrorOpen, isOpen: isErrorOpen } = useDisclosure()
  const { onClose: onSuccessClose, onOpen: onSuccessOpen, isOpen: isSuccessOpen } = useDisclosure()
    const dispatch: AppDispatch = useDispatch();
    const colorMode = mode("gray.600", "gray.400")
    const cartItems = useSelector((state: AppState) => state.cart);
    const {cart, subtotal, expressShipping} = cartItems

      const user = useSelector((state: AppState) => state.user);
  const { userInfo } = user;

  const shippingInfo = useSelector((state: AppState) => state.order);
  const { shippingAddress} = shippingInfo  

  const shipping = useCallback(() => {
    if (expressShipping) return 14.99
    if (subtotal <= 1000) return 4.99
    return 0
  }, [expressShipping, subtotal])

  const total = useCallback(() => {
    if (shipping() === 0) return +subtotal
    return (+subtotal + shipping()).toFixed(2)
  }, [shipping, subtotal])


  const onPaymentSuccess = async (data: OnApproveData) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCart());
    onSuccessOpen();
  };

  const onPaymentError = () => {
    onErrorOpen()
  }

  return (
    <Stack spacing={8} rounded={'xl'} padding={8} w={'full'}>
      <Heading size={'md'}>Resumen del pedido</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item._id} cartItem={item} />
      ))}
      <Stack spacing={6}>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight={'medium'} color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={colorMode}>
            Envio
          </Text>
          <Text fontWeight={'medium'} color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded={'full'} px={2} fontSize={'0.8em'} colorScheme="green">
                Gratis
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontWeight={'semibold'} fontSize={'lg'} color={colorMode}>
            Total
          </Text>
          <Text fontSize={'xl'} fontWeight={'extrabold'} color={colorMode}>
            ${total()}
          </Text>
        </Flex>
      </Stack>
      <PaypalButton
        total={+total()}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        isButtonDisabled={Boolean(shippingAddress) === false}
      />
      <Box>
        <Text fontSize={'sm'}>¿Tiene preguntas? ¿O necesitas ayuda para completar tu pedido?</Text>
        <Flex justifyContent={'center'} color={mode('orange.500', 'orange.100')}>
          <Flex align={'center'}>
            <ChatIcon />
            <Text m={2}>Llamada en vivo</Text>
          </Flex>
          <Flex align={'center'}>
            <PhoneIcon />
            <Text m={2}>Telefono</Text>
          </Flex>
          <Flex align={'center'}>
            <EmailIcon />
            <Text m={2}>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent={'center'} my={6} fontWeight={'semibold'}>
        <p>o</p>
        <Link as={RouterLink} to="/products" ml={1}>
          Continuar Comprando
        </Link>
      </Flex>
      <PaymentsErrorModal isOpen={isErrorOpen} onClose={onErrorClose} />
      <PaymentsSuccessModal isOpen={isSuccessOpen} onClose={onSuccessClose} />
    </Stack>
  );
}
