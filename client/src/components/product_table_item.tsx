import { Input, Td, Tooltip, Tr, useDisclosure, Image, Textarea, Flex, FormControl, FormLabel, Badge, Switch, VStack, Button, useToast } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/actions/admin.actions';
import { DeleteIcon } from '@chakra-ui/icons';
import ConfirmRemovalAlert from './confirm_removal_alert';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { Product } from '../types/product';
import { AppDispatch } from '../redux/store';

interface Props {
  product: Product
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
  const [image, setImage] = useState(product.image);

  const dispatch: AppDispatch = useDispatch();
  const toast = useToast()

  const onSaveProduct = () => {
    dispatch(
      updateProduct(
        brand,
        name,
        category,
        stock,
        +price,
        image,
        productIsNew,
        description,
        product._id
      )
    );
    toast({
      description: 'Product has been updated',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <>
      <Tr>
        <Td>
          <Input size={'sm'} value={image} onChange={(e) => setImage(e.target.value)} />
          <Tooltip label={product.image} fontSize={'sm'}>
            <Image src={product.image} boxSize={'100px'} fit={'contain'} />
          </Tooltip>
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
        successMessage={"Product has been removed."}
      />
    </>
  );
}
