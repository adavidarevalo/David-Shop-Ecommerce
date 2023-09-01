import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Wrap
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentsErrorModal({
  isOpen,
  onClose
}: Props): JSX.Element {
  return (
    <>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap justify={'center'} direction={'column'} align={'center'} mt={'20px'}>
              <Alert
                status="error"
                variant={'subtle'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                textAlign={'center'}
                height={'auto'}
              >
                <AlertIcon boxSize={'55px'} />
                <AlertTitle pt={'8px'} fontSize={'xl'}>
                  ¡Pago fallido!
                </AlertTitle>
                <AlertDescription>No pudimos procesar su pago.</AlertDescription>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
