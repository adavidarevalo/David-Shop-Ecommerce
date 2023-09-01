import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../redux/actions/admin.actions';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ConfirmRemovalAlert from '../confirm_removal_alert';
import { AppDispatch, AppState } from '../../redux/store';
import { User } from '../../types/user';

export default function UsersTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user);
  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading, userList } = admin;

  const { userInfo } = user;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const openDeleteConfirmBox = (user: User) => {
    setUserToDelete(user);
    onOpen();
  };

  return (
    <Box>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && (
        <Wrap justify={'center'}>
          <Stack direction={'row'} spacing={4} display={'flex'} w={'100vw'} justify={'center'}>
            <Spinner
              mt={20}
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size={'xl'}
            />
          </Stack>
        </Wrap>
      )}
      {loading === false && error === null && (
        <Box>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Email</Th>
                  <Th>Registrado</Th>
                  <Th>Administrador</Th>
                  <Th>Acciónes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.name} {user._id === userInfo?._id && '(You)'}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{new Date(user.createdAt).toDateString()}</Td>
                      <Td>{user.isAdmin && <CheckCircleIcon color={'orange.500'} />}</Td>
                      <Td>
                        <Button
                          isDisabled={user._id === userInfo?._id}
                          variant={'outline'}
                          onClick={() => openDeleteConfirmBox(user)}
                        >
                          Eliminar Usuario
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          {userToDelete && (
            <ConfirmRemovalAlert
              isOpen={isOpen}
              onClose={onClose}
              cancelRef={cancelRef}
              itemToDelete={userToDelete}
              deleteAction={deleteUser}
              successMessage={"Usuario ha sido eliminado"}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
