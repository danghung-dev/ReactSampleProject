'use strict';

import React,{Component} from 'react';
import {
  color,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
}from 'react-native';
import Dimensions from 'Dimensions';
import ImageUtil from './../../../common/image/ImageUtil';


export default class ShowStar extends Component{
  render(){
    let star, blackStar ;
    if((parseFloat(this.props.starNumber)- parseInt(this.props.starNumber))>0)
    {
      star = (
        <Image source={ImageUtil.getImageSource("halfStar")}  style = {styles.starImage} resizeMode={Image.resizeMode.contain} />
      )
      blackStar = (
        [...Array(4- parseInt(this.props.starNumber))].map((key,i) =>
          <Image  key = {"blackStar" + i}source={ImageUtil.getImageSource("blackStar")}  style = {styles.starImage} resizeMode={Image.resizeMode.contain} />
        )
      )
    }
    else {
      blackStar = (
        [...Array(5- parseInt(this.props.starNumber))].map((key,i) =>
          <Image key = {"blackStar"+ i} source={ImageUtil.getImageSource("blackStar")}  style = {styles.starImage} resizeMode={Image.resizeMode.contain} />
        )
      )
    }

    return(
        <View style = {styles.starView}>
          {
            [...Array(parseInt(this.props.starNumber))].map((key,i) =>
              <Image  key = {"ShowStar"+i} source={ImageUtil.getImageSource("Star")}  style = {styles.starImage} resizeMode={Image.resizeMode.contain} />
            )
          }
          {star}
          {blackStar}
        </View>
    )
  }
}
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  starView:{
    flexDirection: 'row',
    marginLeft:15,
    marginTop:5,
  },
  starImage:{
    height : screenHeight/20,
    width : screenHeight/20,
  },
});
