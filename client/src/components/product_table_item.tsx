import {
  Input,
  Td,
  Tooltip,
  Tr,
  useDisclosure,
  Image,
  Textarea,
  Flex,
  FormControl,
  FormLabel,
  Badge,
  Switch,
  VStack,
  Button,
  useToast,
  Box,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/actions/admin.actions';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import ConfirmRemovalAlert from './confirm_removal_alert';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { Product } from '../types/product';
import { AppDispatch } from '../redux/store';
import { AiOutlineUpload } from 'react-icons/ai';
import { validImageFormats } from './add_new_product';

interface Props {
  product: Product;
}

export default function ProductTableItem({ product }: Props) {
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [productIsNew, setProductIsNew] = useState<boolean>(product.productIsNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState<any>();
  const [readablePicture, setReadablePicture] = useState<string>(product.image);
  const [error, setError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  const onSaveProduct = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('brand', brand);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('stock', '' + stock);
    formData.append('price', '' + price);
    formData.append('productIsNew', productIsNew.toString());
    formData.append('description', description);
    formData.append('id', product._id);

    dispatch(updateProduct(formData));
    toast({
      description: 'Product has been updated',
      status: 'success',
      isClosable: true,
    });
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
     setImage(null);
     setReadablePicture('');
    const pic = e.target.files![0];

    if (!validImageFormats.includes(pic.type)) {
      setError(`${pic.name} format is not supported.`);
      return;
    }

    if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed.`);
      return;
    }
    setError('');
    setImage(pic);
    const reader = new FileReader();
    reader.readAsDataURL(pic);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setReadablePicture(e.target.result);
      }
    };
  };

  const handleChangePic = () => {
    inputRef?.current?.click();
  };

  const handleDeleteImage = () => {
    setError('');
    setImage(null);
    setReadablePicture('');
  };

  return (
    <>
      <Tr>
        <Td>
          {readablePicture ? (
            <Box position={'relative'}>
              <Image boxSize="100px" objectFit="cover" src={readablePicture} alt="Image Upload" />
              <ButtonGroup mt="2">
                <IconButton
                  onClick={handleChangePic}
                  aria-label="Edit uploaded Image"
                  colorScheme="orange"
                  variant={'outline'}
                  icon={<EditIcon />}
                />
                <IconButton
                  onClick={handleDeleteImage}
                  aria-label="Delete uploaded Image"
                  icon={<DeleteIcon />}
                  variant={'outline'}
                  colorScheme="red"
                />
              </ButtonGroup>
            </Box>
          ) : (
            <Button
              type={'button'}
              leftIcon={<AiOutlineUpload />}
              colorScheme="teal"
              variant="outline"
              className="bg-[#BF59CF] rounded-full"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              Subir Imagen
            </Button>
          )}
          <input
            type="file"
            hidden
            multiple
            ref={inputRef}
            accept={'image/jpeg'}
            onChange={imageHandler}
          />
        </Td>
        <Td>
          <Textarea
            w={'270px'}
            h={'120px'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="sm"
          />
        </Td>
        <Td>
          <Flex direction={'column'} gap={2}>
            <Input size={'sm'} value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input size={'sm'} value={name} onChange={(e) => setName(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction={'column'} gap={2}>
            <Input size={'sm'} value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input size={'sm'} value={price} onChange={(e) => setPrice(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction={'column'} gap={2}>
            <Input
              type="number"
              size={'sm'}
              value={stock}
              onChange={(e) => setStock(+e.target.value)}
            />
            <FormControl display={'flex'} alignItems={'center'}>
              <FormLabel htmlFor="productIsNewFlag" mb={0} fontSize={'sm'}>
                Enable
                <Badge rounded={'full'} px={1} mx={1} fontSize={'0.8em'} colorScheme="green">
                  Nuevo
                </Badge>{' '}
                badge?
              </FormLabel>
              <Switch
                id="productIsNewFlag"
                onChange={() => setProductIsNew((prev) => !prev)}
                isChecked={productIsNew}
              />
            </FormControl>
          </Flex>
        </Td>
        <Td>
          <VStack>
            <Button colorScheme="red" w={'160px'} variant={'outline'} onClick={onOpen}>
              <DeleteIcon mr={'5px'} /> Eliminar Producto
            </Button>
            <Button colorScheme="orange" w={'160px'} variant={'outline'} onClick={onSaveProduct}>
              <MdOutlineDataSaverOn style={{ marginRight: '5px' }} />
              Guardar cambios
            </Button>
          </VStack>
        </Td>
      </Tr>
      <ConfirmRemovalAlert
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={product}
        deleteAction={deleteProduct}
        successMessage={'Product has been removed.'}
      />
    </>
  );
}
