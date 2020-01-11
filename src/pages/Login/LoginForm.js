import React, { Component } from 'react';

import {Button, Content, Input, Item, Spinner, Text} from "native-base";
import {Formik} from "formik";
import {API_BASE} from '../../constant';
import axios from 'axios';
//import api from '../../api/api';
import validations from  './validations';
import global from '../global';

export default class LoginForm extends Component {
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
        Password:values.Password
      };
      axios({
        method: 'post',
        url:'http://tesisatkacaklari.com/api/Customer/login', 
        data: JSON.stringify(datam), 
        timeout:8000,
        headers:{'Content-Type': 'application/json;'}
    })    
    .then((response) => {   
      console.log(response); 
      if(response.data=="Hatalı")
      {
        
        alert("Hatalı TC veya Şifre");
        self.setState({isSubmitting:false});
        console.log(self.state.isSubmitting);
      }        
      else
      {
		global.user = response.data;
		console.log(response.data);
        alert("başarılı");
        this.props.navigation.navigate('AnaSayfa');

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
							disabled={!isValid || this.state.isSubmitting}
							onPress={handleSubmit}
							style={{marginTop: 10}}>

							{ this.state.isSubmitting && <Spinner size={'small'} color={'white'} /> }
							<Text>Giriş Yap</Text>
						</Button>
					</Content>
				)}
			</Formik>
    );
  }
}