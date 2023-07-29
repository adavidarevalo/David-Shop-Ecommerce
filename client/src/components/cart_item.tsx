import {
  Flex,
  Stack,
  Image,
  Box,
  Text,
  Select,
  useColorModeValue as mode,
  CloseButton
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cart.actions';

export default function CartItem({ cartItem }: any): JSX.Element {
  const { image, name, qty, _id, stock, price } = cartItem;

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(addCartItem(_id, +e.target.value) as any);
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify={'space-between'}
      align={'center'}
    >
      <Stack direction={'row'} spacing={'5'} width={'full'}>
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
        <Box pt={4}>
          <Stack spacing={'0.5'}>
            <Text fontWeight={'medium'}>{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w="full"
        mt={{ base: '4', md: '0' }}
        align={{ base: 'center', md: 'baseline' }}
        justify={'space-between'}
        display={'flex'}
      >
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
        <Text fontWeight={'bold'}>${price}</Text>
        <CloseButton onClick={() => dispatch(removeCartItem(_id) as any)} />
      </Flex>
    </Flex>
  );
}
