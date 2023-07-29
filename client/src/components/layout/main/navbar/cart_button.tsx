import React from 'react'
import { Box } from '@chakra-ui/react'
import { BiCart } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { CartState } from '../../../../redux/slices/cart'

export default function CartButton() {
    const cartItems = useSelector((state: { cart: CartState }) => state.cart)
    const { cart } = cartItems

	return (
		<Box pos="relative" display="inline-block">
			<Box display={'flex'} alignItems={'center'} >
				<BiCart fontSize={'20px'} /> Cart
			</Box>
			<Box
				pos="absolute"
				top="-4px"
				right="0px"
				px={2}
				py={1}
				fontSize="xs"
				fontWeight="bold"
				lineHeight="none"
				color="red.100"
				transform="translate(50%,-50%)"
				rounded="full"
				bg={'orange.500'}
			>
                {cart.length}
			</Box>
		</Box>
	)
}
