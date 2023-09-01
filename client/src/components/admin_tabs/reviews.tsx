import React, { useRef, useState } from 'react';

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
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Spacer,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { AdminState } from '../../redux/slices/admin';
import { DeleteIcon } from '@chakra-ui/icons';
import { removeReview } from '../../redux/actions/admin.actions';
import { ProductState } from '../../redux/slices/product';
import { AppDispatch } from '../../redux/store';

export default function ReviewsTabsTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [reviewToDelete, setReviewToDelete] = useState<{
    productId: string;
    reviewId: string;
  } | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const admin = useSelector((state: { admin: AdminState }) => state.admin);

  const { error, loading } = admin;

  const productInfo = useSelector((state: { products: ProductState }) => state.products);
  const { products } = productInfo;

  const openReviewModal = (productId: string, reviewId: string) => {
    setReviewToDelete({
      productId,
      reviewId,
    });
    onOpen();
  };

  const onDeleteItem = () => {
    dispatch(removeReview(reviewToDelete!.productId, reviewToDelete!.reviewId));
    toast({
      description: 'Review has been removed.',
      status: 'success',
      isClosable: true,
    });
    onClose();
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
                              ({product.reviews?.length} Reseñas)
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
                              <Th>Nombre de usuario</Th>
                              <Th>Clasificación</Th>
                              <Th>Titulo</Th>
                              <Th>Comentario</Th>
                              <Th>Creado</Th>
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
                                    onClick={() => openReviewModal(product._id, review._id)}
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
          {reviewToDelete && (
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogBody>
                    ¿Está seguro? No podrás deshacer esta acción posteriormente.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onDeleteItem} ml={3}>
                      Eliminar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          )}
        </Box>
      )}
    </Box>
  );
}
