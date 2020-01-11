import * as React from 'react';
import axios from 'axios';
import global from '../global';
import {Button} from 'native-base';
import { Spinner,Text,DataTable } from 'react-native-paper';
export default class HesaplariGoruntule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.GonderenHesabim=undefined;
    this.state.AliciHesabim=undefined;
    this.state.AccountType=[];
  }
  componentDidMount()
      {
        this.loadData();
      }
      loadData()
        {
          let self = this;
          let userData = global.user;
          let userId = userData.customerTckn;
          let datam ={
            CustomerTckn:userId,
          };
          axios({
            method: 'post',
            url:'http://tesisatkacaklari.com/api/Account/TransactionData', 
            data: JSON.stringify(datam), 
            timeout:8000,
            headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {  
          console.log("transaction"); 
          console.log(response.data);
          global.AccountType=response.data;
          self.setState({AccountType:response.data});
        })
        }
    _handleSubmit()
    {

    }
  render() {
    return (
        
        
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>İşlem Türü</DataTable.Title>
          <DataTable.Title>Açıklaması</DataTable.Title>
          <DataTable.Title numeric>Tutar</DataTable.Title>
          <DataTable.Title >Tarih</DataTable.Title>
        </DataTable.Header>
        {this.state.AccountType.map((item, key) => {
          return(
        <DataTable.Row key={item.accountId}>
        <DataTable.Cell>{item.aType}</DataTable.Cell>
        <DataTable.Cell>{item.explanation}</DataTable.Cell>
        <DataTable.Cell>{item.amount}</DataTable.Cell>
        <DataTable.Cell>{item.saveDate}</DataTable.Cell>
        </DataTable.Row>
          );
        }) 
      }
      
        
      </DataTable>
    );
  }
}