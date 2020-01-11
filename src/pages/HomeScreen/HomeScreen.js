import React from "react";
import global from '../global';
import { StatusBar,Image } from "react-native";
import axios from 'axios';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem,Thumbnail ,} from "native-base";
export default class HomeScreen extends React.Component {
  componentDidMount() {
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
            <Title>Ana Sayfa</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
              <Text style={{paddingBottom:10}}> Sayın {global.user.nameSurname}</Text>
                <Text>M4A Bank Mobil Şubeye Hoşgeldiniz</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: '../../images/1200x630bb.png'}} />
                <Body>
                  <Text>Mobil Uygulama Açılmıştır.</Text>
                  <Text note>Admin</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/53/eb/85/53eb858c-2963-6f8e-c6e8-22d6f77d0cb8/appicon.png/1200x630bb.png'}} style={{height: 350, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Beğeni</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Yorum</Text>
                </Button>
              </Body>
              <Right>
                <Text>11 saat önce</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
