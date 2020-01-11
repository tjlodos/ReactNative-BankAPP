import React from "react";
import { StatusBar,Image } from "react-native";
import {Formik} from "formik";
import global from '../global';
import axios from 'axios';
import validations from  './validation';
import { Picker,Container, Header,Input, Title, Left, Icon, Right, Button, Body, Content,Text,Form ,Card, CardItem,Thumbnail ,} from "native-base";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          allAccount:global.Account,
          counter:false
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
    _handleSubmit(values)
    {
      let self = this;
      let userData = global.user;
      let userId = userData.customerTckn;
      let hesapId = this.state.selected;
      let miktar = values.paraMiktari;
      console.log("hesapId");
      console.log(hesapId);
      console.log("miktar");
      console.log(miktar);
      let datam ={
        CustomerTckn:userId,
        addAccNumber:hesapId,
        Balance:miktar,
      };
      console.log(datam);
      axios({
        method: 'post',
        url:'http://tesisatkacaklari.com/api/Account/AddMoney', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
    })    
    .then((response) => {   
      console.log(response); 
      if(response.data=="başarılı")
      {
        alert("Hesabınıza Bakiye Eklenmiştir.");
        self.loadData();
        self.state({eklendi:true})
      }
      else if(response.data=="eksipara")
      alert("Eksi Değer Girdiniz");
      else
      alert("sistemsel hata oluştu");

    })
  }
    render() {
    return (
        <Formik
        initialValues={{
            tutar:'',
        }}
        onSubmit={this._handleSubmit.bind(this)}
        validationSchema={validations}
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
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Para Ekle</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>

            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Hesap Seç"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              {this.state.allAccount.map((item, key) => {
                return(
              <Picker.Item label={item.addAccName+"----- Bakiye :"+item.balance + item.aType} value={item.addAccNumber} />
                );    
            })
              }
            </Picker>
            <Input
								onChangeText={handleChange('paraMiktari')}
								value={values.paraMiktari}
								placeholder='Tutar Gir'
								onBlur={() => setFieldTouched('paraMiktari')}
								autoCapitalize={'none'}
							/>
          
            <Button
							block
							onPress={handleSubmit}
							style={{marginTop: 10}}>

							<Text>Ekle</Text>
						</Button>
               

        </Content>
      </Container>
      )}
      </Formik>
    );
  }
}
