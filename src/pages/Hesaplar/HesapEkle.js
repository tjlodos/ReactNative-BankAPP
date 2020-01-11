import React,{ Component } from "react";
import {Formik} from "formik";
import validation from  './validation';
import axios from 'axios';
import global from '../global';

import { Picker,Container,Item, Header,Input, Title, Left, Icon, Right, Button, Body, Content,Text,Form ,Card, CardItem,Thumbnail ,Spinner} from "native-base";
export default class HesapEkle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          eklendi:false
        };
      }
      onValueChange(value) {
        this.setState({
          selected: value
        });
      }
      loadData()
      {
        if(this.state.eklendi)
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
      })
    }
    this.setState({eklendi:false});
      }
      _handleSubmit(values){
        try {
          let self = this;
          let userData = global.user;
          let userId = userData.customerTckn;
          console.log("userrrrrr");
          console.log(global.user);
          let datam ={
            CustomerTckn:userId,
            AddAccName:values.hesapAdi,
            Balance:values.bakiyeTutari,
            AType:self.state.selected
          };
          console.log(datam);
          axios({
            method: 'post',
            url:'http://tesisatkacaklari.com/api/Account/NewAccount', 
            data: JSON.stringify(datam), 
            timeout:8000,
            headers:{'Content-Type': 'application/json;'}
        })    
        .then((response) => {   
          console.log(response); 
          if(response.data=="başarılı")
          {
            alert("Yeni Hesap Eklenmiştir.")
            self.state({eklendi:true})
          }
          else
          {
            alert("hata");
          }
        })
      }catch (e) {
        console.log(e);
      }
    }
    
    render() {
    return (
        <Formik
        initialValues={{
          hesapAdi:'',
          bakiyeTutari:''
        }}
        onSubmit={this._handleSubmit.bind(this)}
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

            <Card>
            
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Hesap Türü Seçiniz"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Vadesiz" value="Vadesiz" />
              <Picker.Item label="Vadeli" value="Vadeli" />
              <Picker.Item label="Birikim" value="Birikim" />
              <Picker.Item label="Euro" value="Euro" />
              <Picker.Item label="Dolar" value="Dolar" />
            </Picker>

                    
            </Card>
            <Item error={errors.hesapAdi && touched.hesapAdi}>
              <Input
                value={values.hesapAdi}
                onChangeText={handleChange('hesapAdi')}
								placeholder='Hesap Adı Giriniz'
								onBlur={() => setFieldTouched('hesapAdi')}
								autoCapitalize={'none'}
							/>
              { (errors.hesapAdi && touched.hesapAdi) && <Text style={{color: 'red'}}>{errors.hesapAdi}</Text>}
						</Item>
              <Item error={errors.bakiyeTutari && touched.bakiyeTutari}>
              <Input
								onChangeText={handleChange('bakiyeTutari')}
								value={values.bakiyeTutari}
								placeholder='Tutar Gir'
								onBlur={() => setFieldTouched('bakiyeTutari')}
								autoCapitalize={'none'}
							/>
              { (errors.bakiyeTutari && touched.bakiyeTutari) && <Text style={{color: 'red'}}>{errors.bakiyeTutari}</Text>}
						</Item>
                            
             

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
