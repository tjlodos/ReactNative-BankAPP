import * as React from 'react';
import { Spinner,Text,DataTable, Button } from 'react-native-paper';
export default class HgsGoruntule extends React.Component {
    _handleSubmit()
    {

    }
  render() {
    return (
        
        
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Araç Plakası</DataTable.Title>
          <DataTable.Title numeric>Bakiye</DataTable.Title>
          <DataTable.Title numeric>Sil</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>35 EZS 08</DataTable.Cell>
          <DataTable.Cell numeric>150</DataTable.Cell>
          <Button><Text>Sil</Text></Button>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>35 EZS 08</DataTable.Cell>
          <DataTable.Cell numeric>150</DataTable.Cell>
          <Button><Text>Sil</Text></Button>
        </DataTable.Row>
      </DataTable>
    );
  }
}