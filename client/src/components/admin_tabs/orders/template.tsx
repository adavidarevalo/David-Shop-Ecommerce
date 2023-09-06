import {
  Image,
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
} from '@chakra-ui/react';
import React from 'react'
import { Order } from '../../../types/order';

export default function OrderTemplate({ myRef, order }: { myRef: React.MutableRefObject<null>, order: Order }) {
  return (
    <Box ref={myRef} m={10}>
      <Flex alignItems={'center'} justifyContent={'center'} mb="10">
        <Image
          boxSize="50px"
          objectFit="cover"
          src="http://localhost:3000/favicon.png"
          alt="Logo"
        />
        <Text as="b" marginLeft={5}>
          Techno Store.
        </Text>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Techno Store.</TableCaption>
          <Thead>
            <Tr>
              <Th>Remitente</Th>
              <Th>Destinatario</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Ruc: 99999999</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td>Nombre: Techno Store</Td>
              <Td>Nombre: {order.username}</Td>
            </Tr>
            <Tr>
              <Td>Direccion: Ambato - Ecuador</Td>
              <Td>Direccion: {order.shippingAddress.address}</Td>
            </Tr>
            <Tr>
              <Td>Ciudad: Ambato - Ecuador</Td>
              <Td>
                Ciudad: {order.shippingAddress.city} - {order.shippingAddress.country}
              </Td>
            </Tr>
            <Tr>
              <Td>Codigo Postal: 0000</Td>
              <Td>
                Codigo Postal: {order.shippingAddress.postalCode}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
