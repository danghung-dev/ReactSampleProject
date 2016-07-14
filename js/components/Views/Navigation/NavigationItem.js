import React,{Component} from 'React';
import Dimensions from 'Dimensions';
import {
  View,
  Text,
  TouchableOpacity,
  Image,

  PropTypes
}from 'react-native';
import ImageUtil from './../../../common/image/ImageUtil';
const StyleSheet = require('MyStyleSheet');
export default class NavigationItem extends Component{

  render(){

    return(



          <View style= { styles.container }>
            <Image source={ImageUtil.getImageSource( this.props.icon)} style={styles.iconLeft} />
            <Text style={styles.title}> {this.props.title} </Text>
            <Text style={styles.iconRight}> &#10133; </Text>
          </View>

    );
  }
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container:{
    marginTop : 0,
    marginBottom : 0,
    flexDirection: 'row',
    height : screenHeight/12 ,
    backgroundColor: '#ffffff'

  },
  iconLeft :{
    marginLeft  : screenWidth/32 ,
    marginTop   : screenHeight/64 ,
    width : screenHeight/20 ,
    height : screenHeight/20 ,
  },
  iconRight :{
    paddingRight:5,
    fontSize:10,
    alignItems: 'flex-end',
    ios : { marginTop   : screenHeight/64 },
  },
  title:{
    marginLeft:15,
    fontSize:15,
    textAlign:'left',
    marginTop   : screenHeight/64
  }
});
