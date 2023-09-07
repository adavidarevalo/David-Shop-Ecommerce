import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text } from '@chakra-ui/react';
import React from 'react';
import { AppState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function ReportTable() {
  const admin = useSelector((state: AppState) => state.admin);

  const { report } = admin;
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Identificador</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {report.map((r, index) => (
            <Tr key={index}>
              <Td>
                <Text>Name: {r.name}</Text>
                {r.email && <Text>Email: {r.email}</Text>}
                <Text>ID: {r?.user || r?._id}</Text>
              </Td>
              <Td>{r.result}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th isNumeric>{_.sumBy(report, 'result')}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
