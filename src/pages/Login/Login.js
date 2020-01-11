  
import React, {Component} from 'react';
import {Body, Header, Title} from "native-base";

import LoginForm from '././LoginForm';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity
  } from 'react-native';


export default class Login extends Component {
	render() {
		return (
			<React.Fragment>
				<Header>
					<Body>
					<Title>Giriş Yap</Title>
                    
					</Body>
				</Header>
                <View style={styles.headerBackground}></View>
                    <View>
                    <Text style={styles.logo}>M4A Bank</Text>
                    <Text style={styles.logoDesc}>En Profesyonel Banka</Text>
                    </View>
				<LoginForm navigation={this.props.navigation}/>
			</React.Fragment>
		);
	}
}
const styles = StyleSheet.create({
    headerBackground:{
      position:'absolute',
      top:0,
      left:0,
      height:210,
      width:'100%',
      backgroundColor:'#1572de'
    },
    logo:{
      paddingTop:50,
      textAlign:'center',
      fontSize:40,
      fontWeight:'bold',
      color:'#f2f2f2'
    },
    logoDesc:{
      textAlign:'center',
      color:'#f2f2f2'
    }
})