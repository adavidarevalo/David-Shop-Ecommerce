import React, { useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spinner, Stack, Table, Text, TableContainer, Tbody, Td, Th, Tr, Wrap, useDisclosure, useToast, Flex, Thead } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import ConfirmRemovalAlert from '../confirm_removal_alert'
import { deleteOrder, getAllOrders, resetErrorAndRemoval, setDelivered } from '../../redux/actions/admin.actions'
import { TbTruckDelivery } from "react-icons/tb"
import { AppDispatch, AppState } from '../../redux/store'
import { Order } from '../../types/order'

export default function OrdersTab() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading, orders } = admin

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  const openDeleteConfirmBox = (order: Order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order: Order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
    toast({ description: 'User has been set to delivered.', status: 'success', isClosable: true });
  };

  
  return (
    <Box>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>¡Lo sentimos!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && (
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
      )}
      {loading === false && error === null && (
        <Box>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Nombre</Th>
                  <Th>Email</Th>
                  <Th>Envio Info</Th>
                  <Th>Items Ordenados</Th>
                  <Th>Metodos de pagos</Th>
                  <Th>Precio de Envio</Th>
                  <Th>Total</Th>
                  <Th>Entregado</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toDateString()}</Td>
                      <Td>{order.username}</Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>
                          <i>Direccion: </i>
                          {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>Ciudad: </i>
                          {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>Pais: </i>
                          {order.shippingAddress.country}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item.name}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>{order.shippingPrice}</Td>
                      <Td>{order.totalPrice}</Td>
                      <Td>{order.isDelivered ? <CheckCircleIcon /> : 'Pending'}</Td>
                      <Td>
                        <Flex direction={'column'}>
                          <Button variant={'outline'} onClick={() => openDeleteConfirmBox(order)}>
                            <DeleteIcon mr={'5px'} /> Eliminar Orden
                          </Button>
                          {!order.isDelivered && (
                            <Button
                              variant={'outline'}
                              mt={'4px'}
                              onClick={() => onSetToDelivered(order)}
                            >
                              <TbTruckDelivery />
                              <Text ml={'5px'}>Entregado</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {orderToDelete && (
        <ConfirmRemovalAlert
          isOpen={isOpen}
          onClose={onClose}
          cancelRef={cancelRef}
          itemToDelete={orderToDelete}
          deleteAction={deleteOrder}
          successMessage={'Order has been deleted'}
        />
      )}
    </Box>
  );
}
