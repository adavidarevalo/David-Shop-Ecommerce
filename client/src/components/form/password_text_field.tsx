import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Field, useField } from 'formik';

interface Props {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

export default function PasswordTextField({ label, type, name, placeholder }: Props) {
    const [showPassword, setShowPassword] = useState(false)
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} mb={6}>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Field as={Input} {...field} type={showPassword ? "text" : type} name={name} placeholder={placeholder} />
        <InputRightElement h={'full'}>
          <Button variant={'ghost'} onClick={() => setShowPassword((prevState) => !prevState)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
