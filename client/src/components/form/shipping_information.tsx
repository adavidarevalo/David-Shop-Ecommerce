import React from 'react'
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { validationInformationSchema } from '../../schemas/shipping_information';
import { Box, Flex, Heading, Radio, RadioGroup, Stack, Text, Tooltip } from '@chakra-ui/react';
import TextField from './text_field';
import { setExpress } from '../../redux/actions/cart.actions';
import { setShippingAddress } from '../../redux/actions/order.actions';
import { AppDispatch } from '../../redux/store';

export interface ShippingInformationForm {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export default function ShippingInformation() {
  const dispatch: AppDispatch = useDispatch();
  const handlerSubmit = (values: ShippingInformationForm) => {
    dispatch(setShippingAddress(values))
    
  }
  return (
    <Formik
      initialValues={{ address: '', postalCode: '', city: '', country: '' }}
      validationSchema={validationInformationSchema}
      onSubmit={handlerSubmit}
    >
      {(formik) => (
        <>
          <Form onChange={() => formik.submitForm()}>
            <TextField
              type="text"
              name="address"
              placeholder="Street Address"
              label="Street Address"
            />
            <Flex>
              <Box flex={1} mr={10}>
                <TextField
                  type="number"
                  name="postalCode"
                  placeholder="Postal Code"
                  label="Postal Code"
                />
              </Box>
              <Box flex={2}>
                <TextField type="text" name="city" placeholder="City" label="City" />
              </Box>
            </Flex>
            <TextField type="text" name="country" placeholder="Country" label="Country" />
          </Form>
          <Box w={'100%'} h={'180px'} pr={5}>
            <Heading fontSize={'2xl'} fontWeight={'extrabold'} mb={10}>
              Método de envío
            </Heading>
            <RadioGroup
              defaultValue="false"
              onChange={(e) => {
                dispatch(setExpress(!!e));
              }}
            >
              <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack pr={10} spacing={{ base: 8, md: 10 }} flex={'1.5'}>
                  <Box>
                    <Radio value="true">
                      <Text fontWeight={'bold'}>Expreso $14.99</Text>
                      <Text>Envío en 24 horas.</Text>
                    </Radio>
                  </Box>
                  <Stack spacing={6}>Expresar</Stack>
                </Stack>
                <Radio value="false">
                  <Tooltip label={'Free Shipping for orders of $1000 or more!'}>
                    <Box>
                      <Text fontWeight={'bold'}>Estándar $4.99</Text>
                      <Text>Envío en 2 - 3 dias.</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </>
      )}
    </Formik>
  );
}
