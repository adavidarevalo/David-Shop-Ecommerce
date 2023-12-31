import React from 'react'
import { Image, ButtonGroup, Container, IconButton, Stack, Text, Flex, Link, Box, useColorModeValue } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box w={'100%'} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container as='footer' role='contentinfo' py={{ base: '12', md: '16' }} maxW={"7xl"}>
        <Stack spacing={{ base: '4', md: '5' }}>
          <Stack justify='space-between' direction='row' align='center'>
            <Link as={RouterLink} to='/'>
              <Flex>
                <Image src='/favicon.png' alt='David Shop Logo' w={'30px'} />
                <Text ml={3} fontWeight={'extrabold'}>David Store</Text>
              </Flex>
            </Link>
            <ButtonGroup variant='tertiary'>
              <IconButton as='a' href='#' aria-label='LinkedIn' icon={<FaLinkedin />} />
              <IconButton as='a' href='#' aria-label='GitHub' icon={<FaGithub />} />
              <IconButton as='a' href='#' aria-label='Twitter' icon={<FaTwitter />} />
            </ButtonGroup>
          </Stack>
          <Text fontSize='sm' color='fg.subtle'>
            &copy; {new Date().getFullYear()} David Store, Inc. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
