import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Heading,
  Spinner,
  Stack,
  Wrap,
  useToast,
  Text,
  Flex,
  HStack,
  Button,
  Image,
  SimpleGrid,
  Tooltip,
  Input,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import { BiPackage, BiCheckShield, BiSupport, BiSolidTrashAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductState } from '../redux/slices/product';
import { CartState } from '../redux/slices/cart';
import {
  createProductReview,
  deleteProductReview,
  updateProductReview,
  getProduct,
  resetProductError,
} from '../redux/actions/product.actions';
import { MinusIcon, SmallAddIcon, StarIcon } from '@chakra-ui/icons';
import { addCartItem } from '../redux/actions/cart.actions';
import { UserState } from '../redux/slices/user';
import { AppDispatch } from '../redux/store';
import { BsPencilSquare } from 'react-icons/bs';
import { Review } from '../types/product';
import SpeechRecognitionButton from '../components/speech_recognition_button';

export default function ProductPage() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [reviewToUpdate, setReviewToUpdate] = useState<Review | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  const { id } = useParams();
  const products = useSelector((state: { products: ProductState }) => state.products);

  const { loading, error, product, reviewSend } = products;

  const cartContent = useSelector((state: { cart: CartState }) => state.cart);
  const { cart } = cartContent;

  const user = useSelector((state: { user: UserState }) => state.user);

  const { userInfo } = user;

  useEffect(() => {
    id && dispatch(getProduct(id));

    if (reviewSend) {
      toast({ description: 'Product review saved', status: 'success', isClosable: true });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend]);

  const changeAmount = (input: 'minus' | 'plus') => {
    if (input === 'plus') {
      setAmount((prevAmount) => ++prevAmount);
    }
    if (input === 'minus') {
      setAmount((prevAmount) => --prevAmount);
    }
  };

  const hasUserReviewed = useMemo(() => {
    return product?.reviews?.some((item) => item.user === userInfo?._id);
  }, [product, userInfo]);

  const onSubmit = () => {
    dispatch(
      createProductReview(product?._id as string, userInfo?._id as string, comment, rating, title)
    );
  };

  const addItem = () => {
    dispatch(addCartItem(id as string, amount));
    toast({
      description: 'Item has been added.',
      status: 'success',
      isClosable: true,
    });
  };

  const updateReview = (review: Review) => {
    setReviewToUpdate(review);
    setComment(review.comment);
    setRating(review.rating);
    setTitle(review.title);
    setReviewBoxOpen(true);
  };

  const deleteReview = (reviewId: string) => {
    dispatch(deleteProductReview(id as string, reviewId));
    toast({
      description: 'Review has been deleted.',
      status: 'success',
      isClosable: true,
    });
  };

  const handleEditReview = () => {
    dispatch(updateProductReview(id as string, reviewToUpdate?._id as string, {
      comment,
      rating,
      title,
    }));
    setComment('');
    setTitle('');
    setRating(0);
    setReviewToUpdate(null);
    setReviewBoxOpen(false);
  };

  return (
    <Wrap spacing={'30px'} justify={'center'} minH={'90vh'}>
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
      {loading === false && error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>¡Lo sentimos!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading === false && product && (
        <Box
          maxW={{ base: '3xl', lg: '5xl' }}
          mx={'auto'}
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            <Stack
              pr={{ base: '0', md: '12' }}
              spacing={{ base: '8', md: '4' }}
              flex="1.5"
              mb={{ base: '12', md: 'none' }}
            >
              {product.productIsNew && (
                <Badge rounded={'full'} w={'55px'} fontSize={'0.8em'} colorScheme="green">
                  Nuevo
                </Badge>
              )}
              {product.stock <= 0 && (
                <Badge rounded={'full'} w={'70px'} fontSize={'0.8em'} colorScheme="red">
                  Agotado
                </Badge>
              )}
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                {product.name}
              </Heading>
              <Stack spacing={'5'}>
                <Box>
                  <Text fontSize={'xl'}>${product.price}</Text>
                  <Flex>
                    <HStack spacing={'2px'}>
                      <StarIcon color={'orange.500'} />
                      <StarIcon color={product.rating >= 2 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={product.rating >= 3 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={product.rating >= 4 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={product.rating >= 5 ? 'orange.500' : 'gray.200'} />
                    </HStack>
                    <Text fontSize={'md'} fontWeight={'bold'} ml={'4px'}>
                      {product.numberOfReviews} Reseñas
                    </Text>
                  </Flex>
                </Box>
                <Text>{product.description}</Text>
                <Text fontWeight={'bold'}>Cantidad</Text>
                <Flex
                  w="170px"
                  p={'5px'}
                  border={'1px'}
                  borderColor={'gray.200'}
                  alignItems={'center'}
                >
                  <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
                    <MinusIcon />
                  </Button>
                  <Text mx={'30px'}>{amount}</Text>
                  <Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
                    <SmallAddIcon w={'20px'} h={'25px'} />
                  </Button>
                </Flex>
                <Button
                  isDisabled={product.stock === 0}
                  colorScheme="orange"
                  onClick={() => addItem()}
                >
                  Añadir a la cesta
                </Button>
                <Stack w={'270px'}>
                  <Flex alignItems={'center'}>
                    <BiPackage size="20px" />
                    <Text fontWeight={'medium'} fontSize={'sm'} ml={'2'}>
                      Envío gratis si el pedido es superior a $1000
                    </Text>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <BiCheckShield size={'20px'} />
                    <Text fontWeight={'medium'} fontSize={'sm'} ml={'2'}>
                      Garantía extendida de 2 años
                    </Text>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <BiSupport size={'20px'} />
                    <Text fontWeight={'medium'} fontSize={'sm'} ml={'2'}>
                      Estamos aquí para usted 24 horas al día, 7 días a la semana
                    </Text>
                  </Flex>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction={'column'} align={'center'} flex={'1'} _dark={{ bg: 'gray.900' }}>
              <Image mb={'30px'} src={product.image} alt={product.name} />
            </Flex>
          </Stack>
          {userInfo?._id && (
          <>
            <Tooltip
              label={hasUserReviewed ? 'You have already reviewed this product' : ''}
              fontSize={'md'}
            >
              <>
                <Button
                  isDisabled={hasUserReviewed}
                  my="20px"
                  w={'160px'}
                  colorScheme="orange"
                  onClick={() => setReviewBoxOpen((prev) => !prev)}
                >
                  Escribe una reseña
                </Button>
                {reviewBoxOpen && (
                  <Stack mb={'20px'}>
                    <Wrap>
                      <HStack spacing={'2px'}>
                        <Button variant={'outline'} onClick={() => setRating(1)}>
                          <StarIcon color={'orange.500'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(2)}>
                          <StarIcon color={rating >= 2 ? 'orange.500' : 'gray.200'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(3)}>
                          <StarIcon color={rating >= 3 ? 'orange.500' : 'gray.200'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(4)}>
                          <StarIcon color={rating >= 4 ? 'orange.500' : 'gray.200'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(5)}>
                          <StarIcon color={rating >= 5 ? 'orange.500' : 'gray.200'} />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Flex borderRadius={'6px'} border={'1px solid #e2e7f1'} p="2">
                      <Input
                        border={'none'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Review title (optional)"
                      />
                      <SpeechRecognitionButton onChange={setTitle} />
                    </Flex>
                    <Flex borderRadius={'6px'} border={'1px solid #e2e7f1'} p="2">
                      <Textarea
                        border={'none'}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={`The ${product.name} is...`}
                      />
                      <SpeechRecognitionButton onChange={setComment} />
                    </Flex>
                    {reviewToUpdate ? (
                      <Button w={'140px'} colorScheme="orange" onClick={handleEditReview}>
                        Editar reseña
                      </Button>
                    ) : (
                      <Button w={'140px'} colorScheme="orange" onClick={onSubmit}>
                        Publicar reseña
                      </Button>
                    )}
                  </Stack>
                )}
              </>
            </Tooltip>
          </>
          )}
          <Stack>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              Reseñas
            </Text>
            <SimpleGrid minChildWidth={'300px'} spacingX={'40px'} spacingY={'20px'}>
              {(product?.reviews || []).map((review) => (
                <Box key={review._id}>
                  <Flex alignItems={'center'}>
                    <StarIcon color={'orange.500'} />
                    <StarIcon color={review.rating >= 2 ? 'orange.500' : 'gray.200'} />
                    <StarIcon color={review.rating >= 3 ? 'orange.500' : 'gray.200'} />
                    <StarIcon color={review.rating >= 4 ? 'orange.500' : 'gray.200'} />
                    <StarIcon color={review.rating >= 5 ? 'orange.500' : 'gray.200'} />
                    <Text fontWeight={'semibold'} ml={'4px'}>
                      {review?.title && review.title}
                    </Text>
                    {review.user === userInfo?._id && (
                      <Flex ml={10} cursor={'pointer'}>
                        <BsPencilSquare onClick={() => updateReview(review)} />
                        <BiSolidTrashAlt onClick={() => deleteReview(review._id)} />
                      </Flex>
                    )}
                  </Flex>
                  <Box py="12px">{review.comment}</Box>
                  <Text fontSize={'sm'} color={'gray.400'}>
                    Por {review.name}, {new Date(review.createdAt).toDateString()}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
}
