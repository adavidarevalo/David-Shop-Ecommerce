import React, { useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner, Stack, Table, Text, TableContainer, Tbody, Td, Th, Tr, Wrap, useDisclosure, useToast, Flex, Thead, ButtonGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmRemovalAlert from '../../confirm_removal_alert'
import { deleteOrder, getAllOrders} from '../../../redux/actions/admin.actions'
import { AppDispatch, AppState } from '../../../redux/store'
import { Order } from '../../../types/order'
import OrderRow from './row'

export default function OrdersTab() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)
  const dispatch: AppDispatch = useDispatch();
  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading, orders } = admin

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

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
        <Box maxW={'90vw'}>
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
                    <OrderRow
                      key={order._id}
                      order={order}
                      onOpen={onOpen}
                      setOrderToDelete={setOrderToDelete}
                    />
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
