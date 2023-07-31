import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Spinner,
  Stack,
  Table,
  Text,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Wrap,
  useDisclosure,
  useToast,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Thead,
  Textarea,
  Spacer
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminState } from '../../redux/slices/admin';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import ConfirmRemovalAlert from '../confirm_removal_alert';
import {
  removeReview,
  resetErrorAndRemoval,
  setDelivered,
} from '../../redux/actions/admin.actions';
import { TbTruckDelivery } from 'react-icons/tb';
import { ProductState } from '../../redux/slices/product';
import { getProducts } from '../../redux/actions/product.actions';
import { AppDispatch } from '../../redux/store';

export default function ReviewsTabsTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const admin = useSelector((state: { admin: AdminState }) => state.admin);

  const { error, loading, deliveredFlag, orders, orderRemoval } = admin;

    const productInfo = useSelector((state: { products: ProductState }) => state.products);
    const { products, reviewRemoval } = productInfo;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetErrorAndRemoval());

    if (reviewRemoval) {
      toast({
        description: 'Review has been removed.',
        status: 'success',
        isClosable: true,
      });
    }
  }, [reviewRemoval, dispatch, toast]);

  const openDeleteConfirmBox = (order: any) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order: any) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  const onRemoveReview = (productId: string, reviewId: string) => {
    dispatch(removeReview(productId, reviewId));
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
          {products.length > 0 &&
            products.map((product) => (
              <Box key={product._id}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex={1}>
                          <Flex>
                            <Text mr={'8px'} fontWeight={'bold'}>
                              {product.name}
                            </Text>
                            <Spacer />
                            <Text mr={'8px'} fontWeight={'bold'}>
                              ({product.reviews?.length} Reviews)
                            </Text>
                          </Flex>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <TableContainer>
                        <Table size={'sm'}>
                          <Thead>
                            <Tr>
                              <Th>Username</Th>
                              <Th>Rating</Th>
                              <Th>Title</Th>
                              <Th>Comment</Th>
                              <Th>Created</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {product.reviews?.map((review) => (
                              <Tr key={review._id}>
                                <Td>{review.name}</Td>
                                <Td>{review.rating}</Td>
                                <Td>{review.title}</Td>
                                <Td>
                                  <Textarea isDisabled value={review.comment} size={'sm'} />
                                </Td>
                                <Td>{new Date(review.createdAt).toDateString()}</Td>
                                <Td>
                                  <Button
                                    variant={'outline'}
                                    colorScheme="red"
                                    onClick={() => onRemoveReview(product._id, review._id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
}
