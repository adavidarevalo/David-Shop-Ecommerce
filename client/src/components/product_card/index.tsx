import React from 'react'
import { Circle, Stack, useColorModeValue, Image, Box, Badge, Flex, Link, Tooltip, Button, Icon, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {FiShoppingCart} from "react-icons/fi"
import Rating from './rating';
import { addCartItem } from '../../redux/actions/cart.actions';
import { useDispatch, useSelector } from 'react-redux';
import { CartState } from '../../redux/slices/cart';
import { Product } from '../../types/product';
import { AppDispatch } from '../../redux/store';

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { productIsNew, stock, image, name, _id, price, rating, numberOfReviews } = product;

  const dispatch: AppDispatch = useDispatch();

  const toast = useToast()

  const { cart } = useSelector((state: { cart: CartState }) => state.cart);

  const addItem = (id: string) => {
    if (cart.some(cartItem => cartItem._id === id)) {
      toast({
        description: 'Este artículo ya está en tu carrito. Ve a tu carrito para cambiar.',
        status: 'error',
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(id, 1))
      toast({
        description: 'Se ha añadido el artículo.',
        status: 'success',
        isClosable: true,
      });
    }
  }

  return (
    <Stack
      p={2}
      spacing={'3px'}
      bg={useColorModeValue('white', 'gray.800')}
      minW={'240px'}
      h={'450px'}
      borderWidth={'1px'}
      rounded="lg"
      shadow={'lg'}
      position={'relative'}
    >
      {productIsNew && (
        <Circle size="10px" position="absolute" top={2} right={2} bg={'green.300'} />
      )}
      {stock <= 0 && <Circle size="10px" position="absolute" top={2} right={2} bg={'red.300'} />}
      <Flex h={'230px'} justifyContent={'center'} alignItems={'center'}>
        <Image objectFit={'cover'} h={'full'} src={image} alt={name} roundedTop={'lg'} />
      </Flex>
      <Box flex="1" maxH="5" alignItems={'baseline'}>
        {stock <= 0 && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            Agotado
          </Badge>
        )}
        {productIsNew && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
            Nuevo
          </Badge>
        )}
        <Flex mt="1" justifyContent={'space-between'} alignContent={'center'}>
          <Link as={RouterLink} to={`/product/${_id}`} pt={2} cursor="pointer">
            <Box fontSize={'2xl'} fontWeight={'semibold'} lineHeight={'tight'}>
              {name}
            </Box>
          </Link>
        </Flex>
        <Flex justifyContent={'space-between'} alignContent={'center'} py="2">
          <Rating rating={rating} numReviews={numberOfReviews} />
        </Flex>
        <Flex justify={'space-between'}>
          <Box fontSize={'2xl'} color={useColorModeValue('gray.800', 'white')}>
            <Box as="span" color={'gray.600'} fontSize={'lg'}>
              $
            </Box>
            {(+price).toFixed(2)}
          </Box>
          <Tooltip
            label="Add to cart"
            bg="white"
            placement="top"
            color="gray.800"
            fontSize="1.2em"
          >
            <Button
              variant="ghost"
              display={'flex'}
              disabled={stock <= 0}
              onClick={() => stock > 0 && addItem(product._id)}
            >
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
    </Stack>
  );
}