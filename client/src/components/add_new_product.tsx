import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/actions/admin.actions';
import { Td, Tr, Text, Tooltip, Input, Textarea, FormControl, FormLabel, Badge, Switch, VStack, Button } from '@chakra-ui/react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { AppDispatch } from '../redux/store';

export default function AddNewProduct() {
  const dispatch: AppDispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const createNewProduct = () => {
    dispatch(
       createProduct({
        brand,
        name,
        category,
        stock: +stock,
        price,
        image,
        productIsNew,
        description,
      })
    );
  };

  return (
    <Tr>
      <Td>
        <Text fontSize={'sm'}>Image File Name</Text>
        <Tooltip label={'Set the name of your image e.g., iPhone.jpg'} fontSize={'sm'}>
          <Input
            size={'sm'}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="e.g. iPhone.jpg"
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize={'sm'}>Description</Text>
        <Textarea
          w={'270px'}
          h={'120px'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="sm"
          placeholder={'Description'}
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Brand</Text>
        <Input
          size={'sm'}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Apple or Samsung, etc"
        />
        <Text fontSize={'sm'}>Name</Text>
        <Input
          size={'sm'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Samsung S30"
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Category</Text>
        <Input
          size={'sm'}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Apple or Samsung, etc"
        />
        <Text fontSize={'sm'}>Name</Text>
        <Input
          size={'sm'}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Electronics"
        />
        <Text fontSize={'sm'}>Price</Text>
        <Input
          size={'sm'}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="200.99"
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Stock</Text>
        <Input size={'sm'} value={stock} onChange={(e) => setStock(e.target.value)} />
        <Text fontSize={'sm'}>New Badge shown on product card</Text>
        <FormControl display={'flex'} alignItems={'center'}>
          <FormLabel htmlFor="productIsNewFlag" mb={0} fontSize={'sm'}>
            Enable
            <Badge rounded={'full'} px={1} mx={1} fontSize={'0.8em'} colorScheme="green">
              New
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
            Save Product
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
}
