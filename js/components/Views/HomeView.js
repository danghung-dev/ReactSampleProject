import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
}from 'react-native';
import Dimensions from 'Dimensions';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import HomeCategoryView from './HomeCategoryView';
import ListProducts from './ListProducts'
const StyleSheet = require('MyStyleSheet');
export default class HomeView extends Component{
  render(){
    return(
      <View style= { styles.index }>
         <View style= { styles.indexHeader }>
           <TouchableOpacity onPress={()=>{this.props.RootView.drawer.openDrawer();}}>
             <Image  source={require('../../common/image/CatelogyIcon.jpg')} style={styles.indexHeaderIcon} />
           </TouchableOpacity>
           <Text style={{flex : 5 ,marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}>Fahasa.com </Text>
           <Image source = {require('../../common/image/SearchIcon.png')} style={styles.indexHeaderIconRight}  resizeMode={Image.resizeMode.contain} />
           <TouchableOpacity onPress={()=>{this.props.navigator.push({name:'cart'});}}>
           <Image source = {require('../../common/image/GioHangIcon.png')} style={styles.indexHeaderIconRight}  resizeMode={Image.resizeMode.contain}/>
           </TouchableOpacity>
           <Image source = {require('../../common/image/ThanhChonIon.png')} style={styles.indexHeaderIconRight} resizeMode={Image.resizeMode.contain} />
         </View>
         <ScrollableTabView
           style={{marginTop:0 ,}}
           initialPage={0}
           tabBarUnderlineColor = '#ffffff'
           tabBarBackgroundColor  = '#cc0000'
           tabBarTextStyle = {{marginTop :screenHeight/24 ,marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}
           renderTabBar={() => <ScrollableTabBar />} >
            <HomeCategoryView tabLabel="HOME" navigator = {this.props.navigator}/>
            <ListProducts tabLabel="BESTSELLER" navigator = {this.props.navigator}/>

             <Text tabLabel="TOP 100"  > Top 100 sach</Text>

         </ScrollableTabView>

       </View>
    );
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

  index:{
    marginTop : 0,
    marginBottom : 0,
    flexDirection: 'column',
    flex:1
  },
  indexHeader:{
    ios : {
      marginTop : 0,
      marginBottom : 0,
      flexDirection: 'row',
      alignItems: 'center',
      height : screenHeight/8,
      backgroundColor: '#cc0000' ,
      marginVertical: 9
    },
    android : {
      marginTop : 0,
      marginBottom : 0,
      flexDirection: 'row',
      alignItems: 'center',
      height : screenHeight/11,
      backgroundColor: '#cc0000' ,
      marginVertical: 9
    },

  },
  indexHeaderIcon :{
    flex : 1 ,
    marginLeft  : screenWidth/30 ,
    height : screenHeight/16 ,
    width : screenHeight/16
  },
  indexHeaderIconRight :{
    flex : 1,
    marginRight  : screenWidth/30 ,
    height : screenHeight/16
  },

});
