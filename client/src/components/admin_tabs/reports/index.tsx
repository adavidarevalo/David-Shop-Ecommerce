import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner, Stack, Text, Wrap } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { DateRangePicker } from 'react-date-range';
import { colors, defaultChartData, reports } from './const';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../redux/store';
import { getReport } from '../../../redux/actions/admin.actions';
import { formatDate } from './utils';
import _ from 'lodash';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export default function ReportsTab() {
  const [activeReport, setActiveReport] = useState(0);
  const [selectionRange, setSelectionRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [title, setTitle] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const admin = useSelector((state: AppState) => state.admin);

  const { error, loading, report } = admin;

  const [chartData, setChartData] = useState(null);

  const [isDateOpen, setIsDateOpen] = useState(false);

  useEffect(() => {
    if (report.length) {
      const data = _.cloneDeep(defaultChartData);

      report.forEach((r, index) => {
        data.labels.push(r.name);
        data.datasets[0].label = activeReport ? 'Cantidad vendida' : 'Compras Realizadas $';

        data.datasets[0].backgroundColor.push(`rgba(${colors[index]}, 0.2)`);
        data.datasets[0].borderColor.push(`rgba(${colors[index]}, 1)`);
        data.datasets[0].data.push(r.result);
      });
      setChartData(data);
      
    } else {
      setChartData(null)
    }
    setTitle(reports[activeReport].text);
  }, [report]);

  const getHandleReport = () => {
    const { from, to } = formatDate(selectionRange.startDate, selectionRange.endDate);
    dispatch(getReport(from, to, reports[activeReport].type));
  };

  useEffect(() => getHandleReport(), []);

  return (
    <>
      {error && loading === false && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>¡Lo sentimos!</AlertTitle>
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
      {!error && !loading && (
        <Box>
          <Flex justifyContent={'space-between'} mb={10}>
            <Menu isLazy>
              <MenuButton>Reporte Por: {reports[activeReport].text}</MenuButton>
              <MenuList>
                {reports.map((report) => (
                  <MenuItem onClick={() => setActiveReport(report.value)} key={report.value}>
                    {report.text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Flex>
              <Box>
                <Button onClick={() => setIsDateOpen((prev) => !prev)}>
                  Fecha:{' '}
                  {`${moment(selectionRange.startDate).format('YYYY/MM/DD')} - ${moment(
                    selectionRange.endDate
                  ).format('YYYY/MM/DD')}`}
                </Button>
                <Box position={'absolute'} right={'93px'}>
                  {isDateOpen && (
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={({ selection }) => setSelectionRange(selection as DateRange)}
                    />
                  )}
                </Box>
              </Box>
              <Button
                colorScheme="teal"
                variant="outline"
                marginLeft={'4'}
                onClick={getHandleReport}
              >
                Generate
              </Button>
            </Flex>
          </Flex>
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Box>
              <Text fontSize="3xl" as="b" mb="20px">
                {title}
              </Text>
              {chartData ? (
                <Pie data={chartData} />
              ) : (
                <Box mt="15" textAlign={"center"}>
                  <Text as="b">There are not Data in this date range:</Text>
                  <Text>{`${moment(selectionRange.startDate).format('YYYY/MM/DD')} - ${moment(
                    selectionRange.endDate
                  ).format('YYYY/MM/DD')}`}</Text>
                  <Text mt="25">Por Favor Modifique el Rango de Fechas</Text>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}
