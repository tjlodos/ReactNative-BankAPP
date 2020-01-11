import React, { Component } from 'react';

import {Button, Content, Input, Item, Spinner, Text} from "native-base";
import {Formik} from "formik";
import {API_BASE} from '../../constant';
import axios from 'axios';
//import api from '../../api/api';
import validations from  './validations';

export default class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state={};
		this.state.isSubmitting=false;
		
	  }
	_handleSubmit(values){
		try {
      let self = this;
      let datam ={
        CustomerTckn:values.CustomerTckn,
		Password:values.Password,
		NameSurname:values.NameSurname,
		PhoneNumber:values.PhoneNumber
      };
      axios({
        method: 'post',
        url:'http://tesisatkacaklari.com/api/Customer/register', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
    })    
    .then((response) => {   
      console.log(response); 
      if(response.data=="ayni")
      {
        
        alert("TC ye ait kullanıcı mevcut");
        self.setState({isSubmitting:false});
        console.log(self.state.isSubmitting);
      }        
      else
      {
        alert("Kayıt Oldunuz Lütfen Giriş Yapın");
        this.props.navigation.navigate('GirisYap');

      }
    })
    .catch((error) => {
        console.log(error)
    });

      console.log(datam);
			//await api(values);
		}catch (e) {
			console.log(e);
		}
	};

  render() {
    return (
			<Formik
				initialValues={{
					CustomerTckn:'',
					NameSurname: '',
					PhoneNumber:'',
					Password: '',
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
					<Content style={{padding: 10}}>
						<Item error={errors.CustomerTckn && touched.CustomerTckn}>
							<Input
								onChangeText={handleChange('CustomerTckn')}
								value={values.CustomerTckn}
								placeholder='TC Kimlik No'
								onBlur={() => setFieldTouched('CustomerTckn')}
								autoCapitalize={'none'}
							/>

							{ (errors.CustomerTckn && touched.CustomerTckn) && <Text style={{color: 'red'}}>{errors.CustomerTckn}</Text>}
						</Item>

						<Item error={errors.NameSurname && touched.NameSurname}>
							<Input
								onChangeText={handleChange('NameSurname')}
								value={values.NameSurname}
								placeholder='Ad Soyad'
								onBlur={() => setFieldTouched('NameSurname')}
								autoCapitalize={'none'}
							/>

							{ (errors.NameSurname && touched.NameSurname) && <Text style={{color: 'red'}}>{errors.NameSurname}</Text>}
						</Item>

						<Item error={errors.PhoneNumber && touched.PhoneNumber}>
							<Input
								onChangeText={handleChange('PhoneNumber')}
								value={values.PhoneNumber}
								placeholder='Telefon'
								onBlur={() => setFieldTouched('PhoneNumber')}
								autoCapitalize={'none'}
							/>

							{ (errors.PhoneNumber && touched.PhoneNumber) && <Text style={{color: 'red'}}>{errors.PhoneNumber}</Text>}
						</Item>

						<Item error={errors.Password && touched.Password}>
							<Input
								onChangeText={handleChange('Password')}
								value={values.Password}
								placeholder='Şifreniz'
								onBlur={() => setFieldTouched('Password')}
								autoCapitalize={'none'}
								secureTextEntry={true}
							/>

							{ (errors.Password && touched.Password) && <Text style={{color: 'red'}}>{errors.Password}</Text>}
						</Item>

						<Button
							block
							disabled={!isValid || isSubmitting}
							onPress={handleSubmit}
							style={{marginTop: 10}}>

							{ isSubmitting && <Spinner size={'small'} color={'white'} /> }
							<Text>Kayıt Ol</Text>
						</Button>
					</Content>
				)}
			</Formik>
    );
  }
}