import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import Loading from './loading';

interface Props {
  error: string | null;
  loading: boolean
}

export default function LoadingErrorAlert({ error, loading }: Props) {
  return (
    <>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && <Loading />}
    </>
  );
}
