import React, { useEffect } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ProductCard from '../components/product_card';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/product.actions';
import { ProductState } from '../redux/slices/product';

export default function ProductsPage() {
  const dispatch = useDispatch();

  const productList = useSelector((state: { products: ProductState }) => state.products);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch<any>(getProducts());
  }, [dispatch]);

  return (
    <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
      {error &&
        loading === false && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>We are sorry!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
      {loading && (
        <Stack direction={'row'} spacing={4} display={'flex'} w={'100vw'} justify={'center'}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
        </Stack>
      )}
      {products.length > 0 &&
        loading === false &&
        products.map((product: any) => (
          <WrapItem key={product._id}>
            <Center w='250px' h='550px'>
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))}
    </Wrap>
  );
}
