import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react';

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <Alert
      status="error"
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      textAlign={'center'}
    >
      <AlertIcon />
      <AlertTitle>We are sorry!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
