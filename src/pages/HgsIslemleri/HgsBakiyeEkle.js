import React,{ Component } from "react";
import {Formik} from "formik";
import validation from  './validation';
import { Picker,Container, Header,Input, Title, Left, Icon, Right, Button, Body, Content,Text,Form ,Card, CardItem,Thumbnail ,} from "native-base";
export default class HgsBakiyeEkle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined
        };
      }
      onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    _handleSubmit()
    {

    }
    render() {
    return (
        <Formik
        initialValues={{
            plaka:'',
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
              placeholder="HGS Hesabı Seçiniz"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>

                    
            </Card>
              <Input
								value={values.paraMiktari}
								placeholder='Para Miktarını Girin'
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
