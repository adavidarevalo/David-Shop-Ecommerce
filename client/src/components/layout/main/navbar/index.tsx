import React from 'react'
import {
	Text,
	Box,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	Button,
	Stack,
	useToast,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Image,
	Divider
} from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import NavLink from './navlink'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/actions/user.actions'
import { CgProfile } from 'react-icons/cg'
import { MdLocalShipping, MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md'
import CartButton from './cart_button'
import { AppDispatch, AppState } from '../../../../redux/store'
import { useAuth0 } from '@auth0/auth0-react';

export const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { colorMode, toggleColorMode } = useColorMode()
	const user = useSelector((state: AppState) => state.user);
	const { userInfo } = user
	const dispatch: AppDispatch = useDispatch();
	const toast = useToast()
  const { loginWithRedirect } = useAuth0();
  const { user: u, isAuthenticated, isLoading } = useAuth0();


	const logoutHandler = () => {
		dispatch(logout())
		toast({ description: 'You have been logged out', status: 'success', isClosable: true })
	}	

	return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          aria-label="Menu"
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link as={RouterLink} to="/">
            <Flex alignItems={'center'}>
              <Image alt="David Shop Logo" src={'/favicon.png'} h={6} w={6} />
              <Text ml={3} fontWeight={'extrabold'}>
                Techno Store
              </Text>
            </Flex>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink path={'/products'}>Productos</NavLink>
            <NavLink path={'/cart'}>
              <CartButton />
            </NavLink>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <NavLink>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              alignItems={'center'}
              onClick={toggleColorMode}
            />
          </NavLink>
          {userInfo?._id ? (
            <>
              <Menu>
                <MenuButton px={4} py={2} transition={'all 0.3s'} as={Button}>
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to={'/profile'}>
                    <CgProfile />
                    <Text ml={2}>Perfil</Text>
                  </MenuItem>
                  <MenuItem as={RouterLink} to={'/your-orders'}>
                    <MdLocalShipping />
                    <Text ml={2}>Tus Ordenes</Text>
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <>
                      <MenuDivider />
                      <MenuItem as={RouterLink} to={'/admin-console'}>
                        <MdOutlineAdminPanelSettings />
                        <Text ml={2}>Consola de Administración</Text>
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml={2}>Cerrar Sesión</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={RouterLink}
                // onClick={() => loginWithRedirect()}
                to="/login"
                p={2}
                fontSize={'sm'}
                fontWeight={400}
                variant="link"
              >
                Iniciar Sesión
              </Button>
              <Button
                as={RouterLink}
                to="/registration"
                p={2}
                fontSize={'sm'}
                fontWeight={400}
                variant="link"
                _hover={{ bg: 'orange.400' }}
                bg="orange.500"
                color={'white'}
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Crear Cuenta
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink path={'/products'}>Products</NavLink>
            <NavLink path={'/cart'}>
              <CartButton />
            </NavLink>
            <Divider />
            <NavLink path="/register">Sing Up</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
