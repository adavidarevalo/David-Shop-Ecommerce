import React, { useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spinner, Stack, Table, Text, TableContainer, Tbody, Td, Th, Tr, Wrap, useDisclosure, useToast, Flex, Thead } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import ConfirmRemovalAlert from '../confirm_removal_alert'
import { getAllOrders, resetErrorAndRemoval, setDelivered } from '../../redux/actions/admin.actions'
import { TbTruckDelivery } from "react-icons/tb"
import { AppDispatch, AppState } from '../../redux/store'

export default function OrdersTab() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [orderToDelete, setOrderToDelete] = useState(null)
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading, deliveredFlag, orders, orderRemoval } = admin

  useEffect(() => {
    dispatch(getAllOrders())
    dispatch(resetErrorAndRemoval())
    if (orderRemoval) {
      toast({ description: "User has been remove", status: "success", isClosable: true })
    }
    if (deliveredFlag) {
      toast({ description: "User has been set to delivered.", status: "success", isClosable: true })
    }
  }, [orderRemoval, dispatch, toast, deliveredFlag])

  const openDeleteConfirmBox = (order: any) => {
    setOrderToDelete(order)
    onOpen()
  }

  const onSetToDelivered = (order: any) => {
    dispatch(resetErrorAndRemoval())
    dispatch(setDelivered(order._id))
  }

  
  return (
    <Box>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
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
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Shipping Info</Th>
                  <Th>Items Ordered</Th>
                  <Th>Payment method</Th>
                  <Th>Shipping Price</Th>
                  <Th>Total</Th>
                  <Th>Delivered</Th>
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
                          <i>Address: </i>
                          {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>City: </i>
                          {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>Country: </i>
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
                            <DeleteIcon mr={'5px'} /> Remove Order
                          </Button>
                          {!order.isDelivered && (
                            <Button
                              variant={'outline'}
                              mt={'4px'}
                              onClick={() => onSetToDelivered(order)}
                            >
                              <TbTruckDelivery />
                              <Text ml={'5px'}>Delivered</Text>
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
      {/* <ConfirmRemovalAlert
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={orderToDelete}
        deleteAction={setOrderToDelete}
      /> */}
    </Box>
  );
}
