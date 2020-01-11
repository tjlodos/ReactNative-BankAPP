import React, { Component } from 'react';
import global from '../global';
import axios from 'axios';
import {Tabs,Container, Tab,Header,Input,ScrollableTab, Title, Left, Icon, Right, Button, Body, Content,Form ,Card, CardItem,Thumbnail ,} from "native-base";
import Tab1 from './HesaplariGoruntule';
import { Spinner,Text,DataTable } from 'react-native-paper';
import Tab2 from './HesapEkle';


export default class Hesaplar extends Component {
  constructor(props) {
    super(props);
    this.state={};
    this.state.allAccount=global.Account;
    this.state.counter=false;
    
  }
  componentDidMount()
  {
    this.loadData();
  }
  tabChanged(ref){
    this.loadData();
    }
  loadData()
      {
        debugger;
        let self = this;
        let userData = global.user;
        let userId = userData.customerTckn;
        let datam ={
          CustomerTckn:userId,
        };
        axios({
          method: 'post',
          url:'http://tesisatkacaklari.com/api/Account/AllAccount', 
          data: JSON.stringify(datam), 
          timeout:8000,
          headers:{'Content-Type': 'application/json;'}
      })    
      .then((response) => {  
        console.log("hesaplar"); 
        console.log(response.data);
        global.Account=response.data; 
        self.setState({allAccount:response.data});
      })
      }
      Click(key, other_argument) {
        console.log(key);
        let accountId = key;
        let self=this;
        let userData = global.user;
        let userId = userData.customerTckn;
        console.log("hesaplar");
        console.log(this.state.allAccount);
        let data ={
          AccountId:accountId,
          CustomerTckn:userId,
        };
        console.log("data");
        console.log(data);
        axios({
          method: 'post',
          url:'http://tesisatkacaklari.com/api/Account/RemoveAccount', 
          data: JSON.stringify(data), 
          timeout:8000,
          headers:{'Content-Type': 'application/json;'}
      })    
      .then((response) => {  
        console.log(response.data);
        if(response.data=="başarılı")
        {
        alert("hesap silindi");
        self.loadData();
        }
        else if(response.data=="paravar")
        alert("hesapta para olduğu için silinemedi")
        else if(response.data=="hata")
        alert("sistemsel hata oluştu")
        else
        alert("bilmiyom");
      })
    }
  render() {
    return (
        <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
            
          </Left>
          <Body>
            <Title>Hesaplarım</Title>
          </Body>
          <Right />
        </Header>

      <Content>
        <Header hasTabs/>
        <Tabs
   renderTabBar={() => <ScrollableTab />}
   onChangeTab={({ ref }) => this.tabChanged(ref.props.heading)}
>
          <Tab heading="Hesaplarım">
          <DataTable>
        <DataTable.Header>
          <DataTable.Title>Hesap No</DataTable.Title>
          <DataTable.Title>Hesap Adı</DataTable.Title>
          <DataTable.Title numeric>Bakiye</DataTable.Title>
          <DataTable.Title>Sil</DataTable.Title>
        </DataTable.Header>
        {this.state.allAccount.map((item, key) => {
          return(
        <DataTable.Row key={item.accountId}>
          <DataTable.Cell>{item.addAccNumber}</DataTable.Cell>
          <DataTable.Cell>{item.addAccName}</DataTable.Cell>
        <DataTable.Cell>{item.balance} {item.aType}</DataTable.Cell>
        <DataTable.Cell></DataTable.Cell>
        <Button key={item.id}
    onPress={(other_argument) => (this.Click.bind(this))(item.accountId, other_argument)}><Text>Sil</Text></Button>
        </DataTable.Row>
          );
        }) 
      }
      </DataTable>
          </Tab>
          <Tab heading="Hesap Ekle">
            <Tab2 />
          </Tab>
        </Tabs>
      </Content>
      </Container>
    );
  }
}