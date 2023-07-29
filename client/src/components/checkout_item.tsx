import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Image,
  Select,
  Spacer,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/actions/cart.actions';
import { type Product } from './product_card';

export default function CheckoutItem({
  cartItem
}: {
  cartItem: Product;
}): JSX.Element {
  const { name, image, price, stock, qty, _id } = cartItem;

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(addCartItem(_id, +e.target.value) as any);
  };
  return (
    <>
      <Flex>
        <Image
          rounded={'lg'}
          w={'120px'}
          h={'120px'}
          fit={'cover'}
          src={image}
          alt={name}
          draggable={false}
          loading="lazy"
        />
        <Flex direction={'column'} align={'stretch'} flex={1} mx={2}>
          <Text noOfLines={2} maxW={'150px'}>
            {name}
          </Text>
          <Spacer />
          <Select
            maxW="64px"
            focusBorderColor={mode('orange.500', 'orange.200')}
            value={qty}
            onChange={handleChange}
          >
            {[...Array(+stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Select>
        </Flex>
        <Box>
          <Text fontWeight={'bold'}>${price}</Text>
        </Box>
      </Flex>
      <Divider bg={mode('gray.400', 'gray.800')} />
    </>
  );
}
