import React from "react";
import {Formik} from "formik";
import validations from  './validation';
import global from '../global';
import axios from 'axios';
import { Picker,Container, Header,Input, Title, Left, Icon, Right, Button, Body, Content,Text,Form ,Card, CardItem,Thumbnail ,} from "native-base";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          allAccount:global.Account
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
      let gonderilenhesap = values.musteriNo;
      console.log("hesapId");
      console.log(hesapId);
      console.log("gonderilen hesap");
      console.log(gonderilenhesap);
      console.log("miktar");
      console.log(miktar);

      let datam ={
        GonderenId:userId,
        GonderenHesap:hesapId,
        Tutar:miktar,
        AliciId:gonderilenhesap
      };
      console.log(datam);
      axios({
        method: 'post',
        url:'http://tesisatkacaklari.com/api/MoneyTransfer/Havale', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {   
          console.log(response); 
          if(response.data=="Başarılı")
          {
            alert("Havale Başarıyla Gerçekleşti.");
            self.loadData();
          }
          else if(response.data=="yetersiz")
          alert("Bakiyeniz Yetersiz");
          else if(response.data=="hata")
          alert("Hata");
          else if(response.data=="musterinohatasi")
          alert("Hatalı Müşteri Numarası Girdiniz")
          else
          alert("sistemsel hata oluştu");

        })
    }
    render() {
    return (
        <Formik
        initialValues={{
            paraMiktari:'',
            musteriNo:''
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
              placeholder="Hangi Hesaptan Göndereceksiniz"
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

                    
            </Card>
              <Input
              	onChangeText={handleChange('musteriNo')}
								value={values.musteriNo}
								placeholder='Alıcı Müşterinin Numarası'
								onBlur={() => setFieldTouched('musteriNo')}
								autoCapitalize={'none'}
							/>
           
              <Input
                onChangeText={handleChange('paraMiktari')}
								value={values.paraMiktari}
								placeholder='Para Miktarını Girin'
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
