import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spinner, Stack, Table, TableContainer, Tbody, Td, Th, Tr, Wrap, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../redux/slices/user'
import { AdminState } from '../redux/slices/admin'
import { deleteUser, getAllUsers, resetErrorAndRemoval } from '../redux/actions/admin.actions'
import { CheckCircleIcon } from '@chakra-ui/icons'
import ConfirmRemovalAlert from './confirm_removal_alert'

export default function UsersTab() {
    const { isOpen,onOpen, onClose} = useDisclosure()
    const cancelRef =  useRef(null)
    const [userToDelete, setUserToDelete] = useState("")
    const dispatch = useDispatch()
    const toast = useToast();

    const user = useSelector((state: { user: UserState }) => state.user);
    const admin = useSelector((state: { admin: AdminState }) => state.admin);

    const { error, loading, userRemoval, userList} = admin

    const {userInfo} = user

    useEffect(() => {
        dispatch(getAllUsers() as any)
        dispatch(resetErrorAndRemoval() as any)
        if (userRemoval) {
            toast({description: "User has been remove", status: "success", isClosable: true})
        }
    }, [userRemoval])

    const openDeleteConfirmBox = (user: any) => {
        setUserToDelete(user)
        onOpen()
    }
    
  return (
    <Box>
          {error && loading === false && (
              <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>We are sorry!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
          {loading && (
            <Wrap justify={"center"}>
              <Stack direction={'row'} spacing={4} display={'flex'} w={'100vw'} justify={'center'}>
                  <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
              </Stack>
              </Wrap>
          )}
          {loading === false && error === null && (
            <Box>
                <TableContainer>
                    <Table variant={"simple"}>
                        <Tr>
                              <Th>Name</Th>
                              <Th>Email</Th>
                              <Th>Registered</Th>
                              <Th>Admin</Th>
                              <Th>Action</Th>
                        </Tr>
                    </Table>
                    <Tbody>
                        {userList && userList.map(user => (
                            <Tr key={user._id}>
                                <Td>{user.name} {user._id === userInfo?._id && "(You)"}</Td>
                                <Td>{user.email}</Td>
                                <Td>{new Date(user.createdAt).toDateString()}</Td>
                                <Td>{user.isAdmin && <CheckCircleIcon color={"orange.500"}/>}</Td>
                                <Td>
                                    <Button isDisabled={user._id === userInfo?._id} variant={"outline"} onClick={() => openDeleteConfirmBox(user)}>Remove User</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </TableContainer>
                  <ConfirmRemovalAlert isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} itemToDelete={userToDelete} deleteAction={deleteUser}/>
            </Box>
          )}
    </Box>
  )
}
