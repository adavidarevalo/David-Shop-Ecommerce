import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.MutableRefObject<null>;
  itemToDelete: any;
  deleteAction: any;
  successMessage?: string
}

export default function ConfirmRemovalAlert({
  isOpen,
  onClose,
  cancelRef,
  itemToDelete,
  deleteAction,
  successMessage,
}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  const onDeleteItem = () => {
    dispatch(deleteAction(itemToDelete._id));
    successMessage &&
      toast({
        description: 'User has been remove',
        status: 'success',
        isClosable: true,
      });
    onClose();
  };
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize={'lg'} fontWeight={'bold'}>
            Delete {itemToDelete.name}
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDeleteItem} ml={3}>
              Delete {itemToDelete.name}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
