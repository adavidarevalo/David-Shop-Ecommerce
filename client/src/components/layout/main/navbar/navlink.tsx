import React, { ReactNode } from 'react'
import { Link, useColorModeValue } from '@chakra-ui/react';
import {Link as RouterLink} from "react-router-dom"

interface Props {
    path?: string,
    children: ReactNode
}

export default function NavLink({path="#", children}: Props) {
  return (
    <Link 
    as={RouterLink}
    to={path}
    px={2}
    py={2}
    rounded="md"
    _hover={{textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700")}}
    >
        {children}
    </Link>
  )
}
