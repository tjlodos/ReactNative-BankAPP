import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["ParaEkle", "ParaCek", "Hesaplarim","ParaTransfer","HgsIslemleri","HesapHareketleri"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Text style={{padding:25}}>HIZLI MENÜ</Text>
          
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
