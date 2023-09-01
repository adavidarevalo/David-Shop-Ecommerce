import React, { useEffect } from 'react';
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Thead,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../../redux/actions/product.actions';
import ProductTableItem from '../product_table_item';
import AddNewProduct from '../add_new_product';
import { AppDispatch, AppState } from '../../redux/store';

export default function ProductTab() {
  const dispatch: AppDispatch = useDispatch();
  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading } = admin;

  const productInfo = useSelector((state: AppState) => state.products);
  const { products } = productInfo;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={1} textAlign={'right'}>
                    <Box>
                      <Text mr={'8px'} fontWeight={'bold'}>
                        Añadir un nuevo producto
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant={'simple'} size={'lg'}>
            <Thead>
              <Tr>
                <Th>Imagen</Th>
                <Th>Descripción</Th>
                <Th>Marcas y Nombre</Th>
                <Th>Categoría</Th>
                <Th>Stock y Nueva Badge</Th>
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
