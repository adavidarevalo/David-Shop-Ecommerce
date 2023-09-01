import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Text, ListItem, Spinner, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, UnorderedList, Wrap } from '@chakra-ui/react';
import { getUserOrders } from '../redux/actions/user.actions';
import { AppDispatch, AppState } from '../redux/store';

export default function YourOrdersPage() {
    const user = useSelector((state: AppState) => state.user);
    const { userInfo, loading, error, orders } = user

    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo?._id) {
            navigate('/login');
        }
    }, [userInfo])

    useEffect(() => {
            dispatch(getUserOrders())
    }, [])
    

  return (
    <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>¡Lo sentimos!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && (
        <Wrap justify={'center'} direction={'column'} align={'center'} mt={'20px'} minH={'100vh'}>
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
      {orders && (
        <Box>
          <Text
            textAlign={'center'}
            mt={'20px'}
            fontWeight={'extrabold'}
            fontSize={'3xl'}
            mb={'40px'}
          >
            Tus ordenes
          </Text>
          <TableContainer minH={'70vh'}>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Orden Id</Th>
                  <Th>Orden Fecha</Th>
                  <Th>Orden Total</Th>
                  <Th>Items</Th>
                  <Th>Recibo Imprimido</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      ${order.totalPrice} via {order.paymentMethod}
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.name} (${item.price} cada uno)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                    <Td display={'flex'} justifyContent={'center'}>
                      <Button variant={'outline'}>Recibo</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Wrap>
  );
}
