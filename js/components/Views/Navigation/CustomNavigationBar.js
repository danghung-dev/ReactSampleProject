import React,{Component} from 'react'
import{
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import Dimensions from 'Dimensions';
const StyleSheet = require('MyStyleSheet');
export default class CustomNavigationBar extends Component{
  render(){
    return(
      <View style= { styles.container }>
        <TouchableOpacity onPress={()=>{this.props.RootView.drawer.openDrawer();}}>
          <Image  source={require('../../../common/image/CatelogyIcon.jpg')} style={styles.leftIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.title} </Text>
        <Image source = {require('../../../common/image/SearchIcon.png')} style={styles.rightIcon}  resizeMode={Image.resizeMode.contain} />
        <Image source = {require('../../../common/image/ThanhChonIon.png')} style={styles.rightIcon} resizeMode={Image.resizeMode.contain} />
      </View>
    )
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles= StyleSheet.create({
  container:{
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
  title:{
    flex : 5 ,
    marginLeft: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left'
  },
  leftIcon :{
    flex : 1 ,
    marginLeft  : screenWidth/30 ,
    height : screenHeight/16 ,
    width : screenHeight/16
  },
  rightIcon :{
    flex : 1,
    marginRight  : screenWidth/30 ,
    height : screenHeight/16
  },
})
