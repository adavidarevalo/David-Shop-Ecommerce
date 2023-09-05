import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { Td, Tr, Text, Flex, Button, ButtonGroup, useToast, Box } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import {AiFillPrinter} from "react-icons/ai"
import { Order } from '../../../types/order';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { resetErrorAndRemoval, setDelivered } from '../../../redux/actions/admin.actions';
import ReactToPrint from 'react-to-print';
import OrderTemplate from './template';


export default function OrderRow({
  order,
  onOpen,
  setOrderToDelete,
}: {
  order: Order;
  onOpen: () => void;
  setOrderToDelete: React.Dispatch<React.SetStateAction<Order | null>>;
}) {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
    const myRef = useRef(null);

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
    <>
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
              <ButtonGroup>
                <Button variant={'outline'} mt={'4px'} onClick={() => onSetToDelivered(order)}>
                  <TbTruckDelivery />
                  <Text ml={'5px'}>Entregado</Text>
                </Button>
                <Box>
                  <ReactToPrint
                    trigger={() => (
                      <Button variant={'outline'} mt={'4px'}>
                        <AiFillPrinter />
                        <Text ml={'5px'}>Imprimir</Text>
                      </Button>
                    )}
                    content={() => myRef.current}
                  />
                  <Box hidden>
                    <OrderTemplate myRef={myRef} />
                  </Box>
                </Box>
              </ButtonGroup>
            )}
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
