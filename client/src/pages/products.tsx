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
import SpeechRecognitionButton from '../components/speech_recognition_button';

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
    <>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>¡Lo sentimos!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && (
        <Stack
          direction={'row'}
          spacing={4}
          display={'flex'}
          w={'100vw'}
          minH={'80vh'}
          justify={'center'}
        >
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
      {!loading && !error && (
        <>
          <Flex align={'center'} justify={'center'} w="full" mt="10">
            <Box position={'relative'} maxWidth={'700px'} justifyContent={'center'} width={'full'}>
              <Input
                outline={'none'}
                placeholder="Buscar Producto"
                value={inputSearchValue}
                onChange={({ target }) => {
                  setInputSearchValue(target.value);
                }}
              />
              <SearchIcon position={'absolute'} top="3" right={'10px'} />
            </Box>
            <Box ml={'10px'}>
              <SpeechRecognitionButton onChange={setInputSearchValue} />
            </Box>
          </Flex>
          <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
            {products.length > 0 && loading === false && (
              <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
                {productsSearched.map((product) => (
                  <WrapItem key={product._id}>
                    <Center w="250px" h="550px">
                      <ProductCard product={product} />
                    </Center>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </Wrap>
        </>
      )}
    </>
  );
}
