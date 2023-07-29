import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function ConfirmRemovalAlert({isOpen, onClose, cancelRef, itemToDelete, deleteAction}: any) {
    const dispatch = useDispatch()

    const onDeleteItem = () => {
        dispatch(deleteAction(itemToDelete._id))
        onClose()
    }
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>Delete {itemToDelete.name}</AlertDialogHeader>
                  <AlertDialogBody>Are you sure? You can&apos;t undo this action afterwards.</AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                    <Button colorScheme='red' onClick={onDeleteItem} ml={3}>Delete {itemToDelete.name}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>

      </AlertDialog>
  )
}
