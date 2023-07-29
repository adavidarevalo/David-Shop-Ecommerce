import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Field, useField } from 'formik'

interface Props {
    label: string
    type: string
    name: string
    placeholder: string
}

export default function TextField({label, type, name, placeholder}: Props) {
    const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} mb={6}>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field as={Input} {...field} type={type} name={name} placeholder={placeholder} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
