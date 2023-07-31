import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../redux/slices/user';
import { Box, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import UsersTab from '../components/admin_tabs/users';
import OrdersTab from '../components/admin_tabs/orders';
import ProductTab from '../components/admin_tabs/product';
import ReviewsTabs from '../components/admin_tabs/reviews';

export default function AdminConsole() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const { userInfo } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/login');
    }
  }, [userInfo]);

  return (
    <Box p={'20px'} minH={'80vh'}>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack
          pr={{ base: 0, md: 14 }}
          spacing={{ base: 8, md: 10 }}
          flex={1.5}
          mb={{ base: 12, md: 'none' }}
        >
          <Heading fontSize={'2xl'} fontWeight={'extrabold'} textAlign={'center'}>
            Admin Console
          </Heading>
          <Tabs size={'md'} variant={'enclosed'}>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Products</Tab>
              <Tab>Reviews</Tab>
              <Tab>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
              <TabPanel>
                <ProductTab />
              </TabPanel>
              <TabPanel>
                <ReviewsTabs />
              </TabPanel>
              <TabPanel>
                <OrdersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  );
}
