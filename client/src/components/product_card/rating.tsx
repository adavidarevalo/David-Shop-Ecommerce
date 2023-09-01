import React from 'react'
import { Flex, HStack, Text } from '@chakra-ui/react';
import {StarIcon} from "@chakra-ui/icons"

interface Props {
  rating: number;
  numReviews: number
}

export default function Rating({ rating, numReviews }: Props) {
  return (
    <Flex>
      <HStack spacing={'2px'}>
        <StarIcon fontSize={'14px'} w="14px" color="orange.500" />
        <StarIcon fontSize={'14px'} w="14px" color={rating >= 2 ? 'orange.500' : 'gray.200'} />
        <StarIcon fontSize={'14px'} w="14px" color={rating >= 3 ? 'orange.500' : 'gray.200'} />
        <StarIcon fontSize={'14px'} w="14px" color={rating >= 4 ? 'orange.500' : 'gray.200'} />
        <StarIcon fontSize={'14px'} w="14px" color={rating >= 5 ? 'orange.500' : 'gray.200'} />
      </HStack>
      <Text fontSize="md" fontWeight={'bold'} ml="4px">
        {`${numReviews} ${numReviews === 1 ? 'Reseña' : 'Reseñas'}`}
      </Text>
    </Flex>
  );
}
