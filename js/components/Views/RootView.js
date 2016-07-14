import React ,{Component} from 'react';
import {
  Navigator,

  Image,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage
}from 'react-native';
import NavigationView from './Navigation/NavigationView';
import Dimensions from 'Dimensions';
import NavigationBar from './Navigation/NavigationBar';
import HomeView from './HomeView';
import CartView from './CartView'
import LoginView from './LoginView'
import ProductDetail from './ProductDetail'
import CustomNavigationBar from './Navigation/CustomNavigationBar'
const StyleSheet = require('MyStyleSheet');
import UserManager from './UserManager'
import SoDiaChi from './UserManager/SoDiaChi'
var DrawerLayout = require('react-native-drawer-layout');
import HomeCategoryView from './HomeCategoryView';
var NavigationBarRouteMapper = {
  LeftButton: function( route, navigator, index, navState ){
    switch (route.name) {
      case 'home':
      return null;
        return(
          <TouchableOpacity onPress={()=>{route.drawer.refs['DRAWER'].openDrawer();}}>
            <Image  source={require('../../common/image/CatelogyIcon.jpg')} style={styles.LeftButton} />
          </TouchableOpacity>
        );
        case 'cart':
        case 'productDetail':
        case 'login':
        case 'userManager':
        case 'SoDiaChi':
        return(
          <TouchableOpacity onPress={()=>{navigator.pop();}}>
            <Image  source={require('../../common/image/leftarrow.png')} style={styles.LeftButton} />
          </TouchableOpacity>
        );
    }
  },
  Title: function( route, navigator, index, navState ){
    switch (route.name) {
      case 'home':
        return null;
        return(
          <Text style ={styles.navBarTitleText}>Fahasa.com</Text>
        )
      default:
    }
  },
  RightButton: function( route, navigator, index, navState ){
    switch (route.name) {
      case 'home':
      return null;
      return(
        <View style={styles.index}>
        <Image source = {require('../../common/image/SearchIcon.png')} style={styles.indexHeaderIconRight}  resizeMode={Image.resizeMode.contain} />
        <TouchableOpacity onPress={()=>{navigator.push({name:'cart'})}}>
          <Image  source={require('../../common/image/GioHangIcon.png')} style={styles.indexHeaderIconRight} resizeMode={Image.resizeMode.contain} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigator.push({name:'product'})}}>
          <Image  source={require('../../common/image/ThanhChonIon.png')} style={styles.indexHeaderIconRight} resizeMode={Image.resizeMode.contain} />
        </TouchableOpacity>
        </View>
      );

    }

  }
}

export default class RootView extends Component{
  constructor(props){
    super(props)
  }

  render(){
    var navigationView;

        navigationView =(<NavigationView RootView={this} user={this.props.user}/>);

    return(
      <DrawerLayout
       ref={(drawer)=>{this.drawer=drawer;}}
       drawerWidth={4*screenWidth/5}
       drawerPosition={DrawerLayout.positions.Left}
       drawerBackgroundColor= '#FFFFFF'
       renderNavigationView={() =>navigationView}>

       <Navigator
       ref ={(navigator)=>{this._navigator=navigator}}
       initialRoute={{name:'home' }}
       renderScene={this.renderScene.bind(this)}
       navigationBar={
         <NavigationBar
           routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
         />
         }
       />

      </DrawerLayout>
    );
  }
  renderScene(route,navigator){

    switch (route.name) {
      case 'home':
        route.display = false;
        return (<HomeView RootView={this} navigator={navigator}/>);
      case 'cart':
        route.display = true;
        return(<CartView navigator={navigator}/>);
      case 'productDetail':
        route.display = true;
        return ( <ProductDetail navigator={navigator} />);
      case 'login':
        route.display = true;
        return ( <LoginView navigator={navigator} route={route}/>);

      case 'userManager':
        route.display = true;
        return (<UserManager navigator={navigator} />);
        case 'SoDiaChi':
          route.display = true;
          return (<SoDiaChi navigator={navigator} />);

      case 'viewCategory':
        route.display = false;
        return ( <View><CustomNavigationBar title={route.title} RootView={this} /><HomeCategoryView navigator={navigator} /></View>);

    }
  }

}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  index:{
  marginTop : 0,
  marginBottom : 0,
  flexDirection: 'row',
  alignItems: 'center',
  height : screenHeight/8,
  backgroundColor: '#cc0000' ,
  marginVertical: 9,
  flex:1,
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navBar:{
    backgroundColor:'#cc0000',

  },
  LeftButton:{
    flex : 1 ,
    marginLeft  : 10,
    height : 30 ,
    width : 30,
    android : {
      marginLeft  : 10,
      marginTop: 10,
      justifyContent: 'flex-start',
      alignItems:"center",
    }

},
  navBarTitleText:{
    color:'white',
    paddingTop:10,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -150,
    textAlign:'left',

  },
  indexHeaderIcon :{
    flex : 1 ,
    marginLeft  : 10,
    height : 30 ,
    width : 30
  },
  indexHeaderIconRight :{
    //flex : 1,
    //marginRight  : screenWidth/30 ,
    height : screenHeight/16
    //height: 40
  },
});
