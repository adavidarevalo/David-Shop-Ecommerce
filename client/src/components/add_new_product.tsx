import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/actions/admin.actions';
import {
  Td,
  Tr,
  Text,
  Tooltip,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Badge,
  Switch,
  VStack,
  Button,
  Image,
  Box,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { AppDispatch } from '../redux/store';
import { AiOutlineUpload } from 'react-icons/ai';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export const validImageFormats = ['image/jpeg', 'image/png', 'image/webp'];

export default function AddNewProduct() {
  const dispatch: AppDispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any>();
  const [error, setError] = useState('');
  const [readablePicture, setReadablePicture] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const createNewProduct = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('brand', brand);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('productIsNew', productIsNew.toString());
    formData.append('description', description);

    dispatch(createProduct(formData));
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
            colorScheme="orange"
            leftIcon={<AiOutlineUpload />}
            fontSize={'md'}
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
        <Text fontSize={'sm'}>Descripción</Text>
        <Textarea
          w={'270px'}
          h={'120px'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="sm"
          placeholder={'Descripción'}
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Marca</Text>
        <Input
          size={'sm'}
          mb={5}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Apple 0 Samsung, etc"
        />
        <Text fontSize={'sm'}>Nombre</Text>
        <Input
          size={'sm'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Samsung S30"
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Categoria</Text>
        <Input
          size={'sm'}
          mb={5}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Apple o Samsung, etc"
        />

        <Text fontSize={'sm'}>Precio</Text>
        <Input
          size={'sm'}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="200.99"
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Cantidad</Text>
        <Input size={'sm'} value={stock} onChange={(e) => setStock(e.target.value)} />
        <Text fontSize={'sm'}>Nueva insignia mostrada en la tarjeta del producto</Text>
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
      </Td>
      <Td>
        <VStack>
          <Button colorScheme="orange" w={'160px'} variant={'outline'} onClick={createNewProduct}>
            <MdDriveFolderUpload style={{ marginRight: '5px' }} />
            Guardar Producto
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
}
