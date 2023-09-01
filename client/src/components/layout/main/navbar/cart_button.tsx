import React from 'react'
import { Box } from '@chakra-ui/react'
import { BiCart } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/store'

export default function CartButton() {
    const cartItems = useSelector((state: AppState) => state.cart);
    const { cart } = cartItems

	return (
		<Box pos="relative" display="inline-block">
			<Box display={'flex'} alignItems={'center'} >
				<BiCart fontSize={'20px'} /> Carrito
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
