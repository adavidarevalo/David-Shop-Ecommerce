import React from 'react'
import { Spinner, Stack, Wrap } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Wrap justify={'center'}>
      <Stack direction={'row'} spacing={4} display={'flex'} w={'100vw'} justify={'center'}>
        <Spinner
          mt={20}
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.500"
          size={'xl'}
        />
      </Stack>
    </Wrap>
  );
}
