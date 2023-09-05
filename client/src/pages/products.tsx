import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ProductCard from '../components/product_card';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/product.actions';
import { ProductState } from '../redux/slices/product';
import { AppDispatch } from '../redux/store';
import { Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function ProductsPage() {
  const dispatch: AppDispatch = useDispatch();
  const [inputSearchValue, setInputSearchValue] = useState("")

  const productList = useSelector((state: { products: ProductState }) => state.products);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  const productsSearched  = useMemo(() => {
    if (!inputSearchValue.length) return products;

    const searchVal = inputSearchValue.toLocaleLowerCase()

    return products.filter(product => {
      return (
        product.name.toLocaleLowerCase().includes(searchVal) ||
        product.brand.toLocaleLowerCase().includes(searchVal) ||
        product.description.toLocaleLowerCase().includes(searchVal) ||
        product.category.toLocaleLowerCase().includes(searchVal)
      );
    })
  }, [products, inputSearchValue]);

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
      )}
      {products.length > 0 && loading === false && (
        <Flex flexDirection={'column'}>
          <Box position={'relative'} mt="10">
            <Input
              placeholder="Buscar Producto"
              value={inputSearchValue}
              onChange={({ target }) => {
                setInputSearchValue(target.value);
              }}
            />
            <SearchIcon position={'absolute'} top="3" right={'10px'} />
          </Box>
          <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
            {productsSearched.map((product) => (
              <WrapItem key={product._id}>
                <Center w="250px" h="550px">
                  <ProductCard product={product} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      )}
    </Wrap>
  );
}
