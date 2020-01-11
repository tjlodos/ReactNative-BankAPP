import  React from 'react';
import{
    createBottomTabNavigator,
} from "react-navigation-tabs";
import {Icon} from 'native-base';
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer"
import GirisYap from "./Login/Login";
import KayitOl from "./SingUp/index";
import AnaSayfa from "./HomeScreen/HomeScreen";
import SideBar from "./SideBar/SideBar";
import ParaCek from "./ParaCek/index";
import ParaEkle from "./ParaEkle/index";
import ParaTransfer from "./ParaTransfer/index";
import Havale from "./ParaTransfer/Havale";
import Virman from "./ParaTransfer/Virman";
import HgsGoruntule from "./HgsIslemleri/HgsGoruntule";
import HgsBakiyeEkle from "./HgsIslemleri/HgsBakiyeEkle";
import HgsIslemleri from "./HgsIslemleri";
import Hesaplarim from "./Hesaplar";
import HesapEkle from "./Hesaplar/HesapEkle";
import HesaplariGoruntule from "./Hesaplar/HesaplariGoruntule";
import HesapHareketleri from "./HesapHareketleri";
import HesapHareket from "./HesapHareketleri/HesapHareket";


const AuthStack = createBottomTabNavigator({
    GirisYap:{
        screen:GirisYap,
        navigationOptions:{
            title:"Giriş Yap",
            tabBarIcon:({tintColor})=><Icon name="log-in" style={{color:tintColor}} />
        }
    },
    KayitOl:{
        screen:KayitOl,
        navigationOptions:{
            title:"Kayıt Ol",
            tabBarIcon:({tintColor})=><Icon name="person-add" style={{color:tintColor}} />
        }
    },
    
},

{
    initialRouteName:'GirisYap',
    tabBarOptions:{
        activeTintColor:'#fff',
        inactiveTintColor:'#586589',
        style:{
            backgroundColor:'#171f33',
        }
    }
});
const App = createDrawerNavigator({
    AnaSayfa: {
      screen: AnaSayfa,
    },
    Auth: {
      screen: AuthStack,
    },
    SideBar:{
        screen:SideBar,
        drawerWidth:300,
        contentComponent:SideBar
    },
    ParaCek:{
        screen:ParaCek,
    },
    ParaEkle:{
        screen:ParaEkle
    },
    ParaTransfer:{
        screen:ParaTransfer
    },
    Havale:{
        screen:Havale
    },
    Virman:{
        screen:Virman
    },
    HgsBakiyeEkle:
    {
        screen:HgsBakiyeEkle
    },
    HgsGoruntule:
    {
        screen:HgsGoruntule
    },
    HgsIslemleri:
{
    screen:HgsIslemleri
},
Hesaplarim:
{
    screen:Hesaplarim
},
HesapEkle:
{
    screen:HesapEkle
},
HesaplariGoruntule:
{
    screen:HesaplariGoruntule
},
HesapHareketleri:
{
    screen:HesapHareketleri
},
HesapHareket:
{
    screen:HesapHareket
},

  },
  {
    contentComponent: SideBar,
    drawerWidth: 300,
    initialRouteName:'Auth',
    
});
export default createAppContainer(App);