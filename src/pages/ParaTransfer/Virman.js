import React from "react";
import {Formik} from "formik";
import validations from  './validationVirman';
import global from '../global';
import axios from 'axios';import { Picker,Container, Header,Input, Title, Left, Icon, Right, Button, Body, Content,Text,Form ,Card, CardItem,Thumbnail ,} from "native-base";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          GonderenHesabim: undefined,
          AliciHesabim:undefined,
          allAccount:global.Account
        };
      }
      onValueChangeGonderici(value) {
        this.setState({
          GonderenHesabim: value
        });
      }
      onValueChangeAlici(value) {
        this.setState({
          AliciHesabim: value
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
      let gonderenhesap = this.state.GonderenHesabim;
      let miktar = values.paraMiktari;
      let alicihesap = this.state.AliciHesabim;
      let datam ={
        CustomerId:userId,
        AvaibleAccNumber:gonderenhesap,
        Money:miktar,
        SentAccNumber:alicihesap
      };
      console.log(datam);
      axios({
        method: 'post',
        url:'http://tesisatkacaklari.com/api/MoneyTransfer/Virman', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {   
          console.log(response); 
          if(response.data=="Başarılı")
          {
            alert("Virman Başarıyla Gerçekleşti.");
            self.loadData();
          }
          else if(response.data=="yetersiz")
          alert("Bakiyeniz Yetersiz");
          else if(response.data=="hata")
          alert("Hata");
          else if(response.data=="musterinohatasi")
          alert("Hatalı Müşteri Numarası Girdiniz")
          else if(response.data=="Aynı Hesap")
          alert("Aynı Hesaplar arası transfer YAPAMAZSINIZ.")
          else if(response.data=="eksipara")
          alert("Hatalı Para Değeri Girdiniz.")
          else
          alert("sistemsel hata oluştu");

        })
    }
    render() {
    return (
        <Formik
        initialValues={{
            paraMiktari:'',
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
        <Content padder>

        <Card>
            
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Gönderen Hesabım"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.GonderenHesabim}
              onValueChange={this.onValueChangeGonderici.bind(this)}
            >
              {this.state.allAccount.map((item, key) => {
                return(
              <Picker.Item label={item.addAccName+"----- Bakiye :"+item.balance + item.aType} value={item.accountId} />
                );    
            })
              }
            </Picker>

                    
            </Card>
            <Card>
            
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Alıcı Hesap"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.AliciHesabim}
              onValueChange={this.onValueChangeAlici.bind(this)}
            >
              {this.state.allAccount.map((item, key) => {
                return(
              <Picker.Item label={item.addAccName+"----- Bakiye :"+item.balance + item.aType} value={item.accountId} />
                );    
            })
              }
            </Picker>

                    
            </Card>
         
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

                <Text>Gönder</Text>
            </Button>
   

</Content>
</Container>
)}
</Formik>
);
}
}
