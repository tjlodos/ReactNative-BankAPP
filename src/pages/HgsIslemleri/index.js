import React, { Component } from 'react';
import {Picker,Tabs,Container, Tab,Header,Input,ScrollableTab, Title, Left, Icon, Right, Button, Body, Content,Text,Form ,Card, CardItem,Thumbnail ,} from "native-base";
import Tab1 from './HgsGoruntule';
import {Formik} from "formik";
import validation from  './validation';
import validationBakiyeEkle from  './validationBakiyeEkle';
import Tab2 from './HgsBakiyeEkle';
import global from '../global';
import axios from 'axios';
import { Spinner,DataTable } from 'react-native-paper';


export default class TabsScrollableExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      allAccount:[]
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  componentDidMount()
  {
    this.loadData();
  }
  _handleSubmit(values)
  {
    let self = this;
      let userData = global.user;
      let userId = userData.customerTckn;
      let plaka = this.state.selected;
      let miktar = values.tutar
      let datam ={
        CustomerTckn:userId,
        Plaka:plaka,
        HgsBakiye:miktar
      };
      console.log(datam)
      axios({
        method: 'post',
        url:'http://apici.tesisatkacaklari.com/api/HGS/hgsode', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {   
          console.log(response); 
          if(response.data=="başarılı")
          {
            alert("Bakiye Eklendi");
            self.loadData();
          }
          else if(response.data=="yanlis")
          alert("Hata");
          else
          alert("sistemsel hata oluştu");

        })
  }
  _handleSubmitPlakaEkle(values)
  {
      let self = this;
      let userData = global.user;
      let userId = userData.customerTckn;
      let plaka = values.plaka;
      let datam ={
        CustomerTckn:userId,
        Plaka:plaka
      };
      console.log(datam)
      axios({
        method: 'post',
        url:'http://apici.tesisatkacaklari.com/api/HGS/hgsac', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {   
          console.log(response); 
          if(response.data=="var")
          {
            alert("HGS Hesabı Açıldı.");
            self.loadData();
          }
          else if(response.data=="hata")
          alert("Hata");
          else
          alert("sistemsel hata oluştu");

        })
  }
  Click(key, other_argument) {
    console.log(key);
    let plaka = key;
    let self=this;
    let userData = global.user;
    let userId = userData.customerTckn;
    console.log("hesaplar");
    console.log(this.state.allAccount);
    let data ={
      Plaka:plaka,
      CustomerTckn:userId,
    };
    console.log("data");
    console.log(data);
    axios({
      method: 'post',
      url:'http://apici.tesisatkacaklari.com/api/HGS/hgssil', 
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
    else if(response.data=="yanlis")
    alert("hesap mevcut değil")
    else if(response.data=="hata")
    alert("sistemsel hata oluştu")
    else
    alert("bilmiyom");
  })
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
            url:'http://apici.tesisatkacaklari.com/api/HGS/Listele', 
            data: JSON.stringify(datam), 
            timeout:8000,
            headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {  
          console.log("hesaplar"); 
          console.log(response.data);
          self.setState({allAccount:response.data});
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
            <Title>HGS İŞLEMLERİ</Title>
          </Body>
          <Right />
        </Header>

      <Content>
        <Header hasTabs/>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="HGS Hesaplarım">
          <DataTable>
        <DataTable.Header>
          <DataTable.Title>Araç Plakası</DataTable.Title>
          <DataTable.Title numeric>Bakiye</DataTable.Title>
          <DataTable.Title numeric>Sil</DataTable.Title>
        </DataTable.Header>

        {this.state.allAccount.map((item, key) => {
          return(
        <DataTable.Row key={item.accountId}>
          <DataTable.Cell>{item.plaka}</DataTable.Cell>
          <DataTable.Cell>{item.hgsBalance}</DataTable.Cell>
        <Button key={item.plaka}
    onPress={(other_argument) => (this.Click.bind(this))(item.plaka, other_argument)}><Text>Sil</Text></Button>
        </DataTable.Row>
          );
        }) 
      }
      </DataTable>
          </Tab>
          <Tab heading="Hesap Aç">
          <Formik
        initialValues={{
            plaka:'',
        }}
        onSubmit={this._handleSubmitPlakaEkle.bind(this)}
        validationSchema={validation}
    >
        {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldTouched,
                isValid,
                isSubmitting
            }) => (
      <Container>
        
        <Content padder>
              <Input
                onChangeText={handleChange('plaka')}
								value={values.plaka}
								placeholder='Plaka Girin'
								onBlur={() => setFieldTouched('plaka')}
								autoCapitalize={'none'}
							/>
            

<Button
                block
                onPress={handleSubmit}
                style={{marginTop: 10}}>

                <Text>Plaka Ekle</Text>
            </Button>
   

</Content>
</Container>
)}
</Formik>
          </Tab>
          <Tab heading="HGS Bakiye Ekle">
          <Formik
        initialValues={{
          tutar:'',
        }}
        onSubmit={this._handleSubmit.bind(this)}
        validationSchema={validationBakiyeEkle}
    >
        {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldTouched,
                isValid,
                isSubmitting
            }) => (
      <Container>
        
        <Content padder>
            <Card>
            
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="HGS Hesabı Seçiniz"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              {this.state.allAccount.map((item, key) => {
                return(
              <Picker.Item label={item.plaka+"----- Bakiye :"+item.hgsBalance} value={item.plaka} />
                );    
            })
              }
            </Picker>

                    
            </Card>
              <Input
              onChangeText={handleChange('tutar')}
								value={values.tutar}
								placeholder='Para Miktarını Girin'
								onBlur={() => setFieldTouched('tutar')}
								autoCapitalize={'none'}
							/>
            

<Button
                block
                onPress={handleSubmit}
                style={{marginTop: 10}}>

                <Text>Bakiye Ekle</Text>
            </Button>
   

</Content>
</Container>
)}
</Formik>
          </Tab>
          
        </Tabs>
      </Content>
      </Container>
    );
  }
}