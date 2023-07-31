import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Stack,
  Table,
  Text,
  Tbody,
  Th,
  Tr,
  Wrap,
  useDisclosure,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Thead,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminState } from '../../redux/slices/admin';
import {
  resetErrorAndRemoval,
  setDelivered,
} from '../../redux/actions/admin.actions';
import { ProductState } from '../../redux/slices/product';
import { getProducts, resetProductError } from '../../redux/actions/product.actions';
import ProductTableItem from '../product_table_item';
import AddNewProduct from '../add_new_product';
import { AppDispatch, AppState } from '../../redux/store';

export default function ProductTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading} = admin;

  const productInfo = useSelector((state: AppState) => state.products);
  const { products, productUpdate } = productInfo;
  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (productUpdate) {
      toast({
        description: 'Product has been updated.',
        status: 'success',
        isClosable: true,
      });
    }
  }, [productUpdate, dispatch, toast]);

  const openDeleteConfirmBox = (order: any) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order: any) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

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
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={1} textAlign={'right'}>
                    <Box>
                      <Text mr={'8px'} fontWeight={'bold'}>
                        Add a new Product
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Table>
                  <Tbody>
                    <AddNewProduct/>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant={'simple'} size={'lg'}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Description</Th>
                <Th>Brands & Name</Th>
                <Th>Category</Th>
                <Th>Stock & New Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((product) => <ProductTableItem key={product._id} product={product} />)}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
