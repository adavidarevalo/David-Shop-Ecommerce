import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { type CartState } from '../redux/slices/cart';
import {
  Badge,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

export default function CartOrderSummary(): JSX.Element {
  const [buttonLoading, setButtonLoading] = useState(false);
  const standardShipping = Number(4.99).toFixed(2);

  const cartItems = useSelector((state: { cart: CartState }) => state.cart);
  const { subtotal } = cartItems;

  const navigate = useNavigate();

  const handleClick = (): void => {
    setButtonLoading(true);
    navigate('/checkout');
  };

  return (
    <Stack
      spacing={8}
      borderWidth={'1px'}
      rounded={'ls'}
      padding={'8'}
      w={'full'}
    >
      <Heading size={'md'}>Order Summary</Heading>
      <Stack spacing={'6'}>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={mode('gray.600', 'gray.400')}>
            Subtotal
          </Text>
          <Text fontWeight={'medium'}>${subtotal}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={mode('gray.600', 'gray.400')}>
            Shipping
          </Text>
          <Text fontWeight={'medium'}>
            {subtotal <= 1000 ? (
              `$${standardShipping}`
            ) : (
              <Badge
                rounded={'full'}
                px={2}
                fontSize={'0.8em'}
                colorScheme="green"
              >
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <Text fontSize={'xl'} fontWeight={'extrabold'}>
            Total
          </Text>
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            ${subtotal <= 1000 ? +subtotal + +standardShipping : +subtotal}
          </Text>
        </Flex>
      </Stack>
      <Button
        as={RouterLink}
        to={'/checkout'}
        colorScheme="orange"
        size={'lg'}
        fontSize={'md'}
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={handleClick}
      ></Button>
    </Stack>
  );
}
