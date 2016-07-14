'use strict';

import React,{Component} from 'react';
import {
  color,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Picker,
}from 'react-native';

import Dimensions from 'Dimensions';
import ImageUtil from './../../../common/image/ImageUtil';

export default class ProductInsert extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      number: 5,
    };
    this.onclickButton = this.onclickButton.bind(this);
  }
 onclickButton(key) {
    switch (key) {
      case 'decreaseNumber': this.setState({number:this.state.number -1}) ;break;
      case 'increaseNumber': this.setState({number:this.state.number +1}) ;break;
    }
  }
  render(){
    return(
        <View style = {styles.index}>
          <Text style = {styles.title}>Số lượng: </Text>
          <View style = {styles.box}>
            <View style={styles.numberInput}>
            <TouchableOpacity  onPress={() => this.onclickButton("decreaseNumber")} >
              <Image source = {ImageUtil.getImageSource("minus")} style={styles.minus}  />
             </TouchableOpacity >
                <View style = {styles.numberTextView}>
                  <Text style={styles.numberText} >{ this.state.number}</Text>
                </View>
            <TouchableOpacity  onPress={() => this.onclickButton("increaseNumber")} >
              <Image source = {ImageUtil.getImageSource("plus")} style={styles.minus}  />
             </TouchableOpacity >
            </View>
             <TouchableOpacity  onPress={() => this.onclickButton("insertCart")} >
                <View style = {styles.insertcartButton}>
                    <Text style = {styles.insertcartText}>Thêm vào giỏ hàng</Text>
                </View>
              </TouchableOpacity >
          </View>
          <TouchableOpacity  onPress={() => this.onclickButton("insertfavouriteProduct")} >
            <View style = {styles.insertfavouriteProductButton}>
                <Text style = {styles.insertfavouriteProductText}>Thêm vào yêu thích</Text>
            </View>
           </TouchableOpacity >

        </View>
    );
  }
}

const Item = Picker.Item;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  index:{
    marginTop : 5,
    flexDirection: 'column',
  },
  title:{
    marginLeft:15,
    fontSize:20,
    textAlign:'left',
    color:'black',
  },
  box:{
    flexDirection: 'row',
    height: screenHeight/12,
  },
  numberInput:{
     flexDirection: 'row',
     alignItems : 'center',
     justifyContent: 'center',
     marginLeft:20,
  },
  numberTextView:{
    width:30,
    height: screenHeight/12,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  numberText:{
    fontSize: 20,
    textAlign:'center'
  },
  minus:{
    width:30,
    height: screenHeight/12,
  },
  insertcartButton:{
    marginLeft: screenWidth/9,
    width: screenWidth/2,
    height: screenHeight/12,
    justifyContent: 'center',
    backgroundColor: '#cc0000' ,
  },
  insertcartText:{
    textAlign : 'center' ,
    color: '#FFFFFF' ,
    fontSize:18,
  },
  insertfavouriteProductButton:{
    marginTop: screenHeight/40,
    marginLeft: screenWidth/9,
    height: screenHeight/12,
    width: 3*screenWidth/4,
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF' ,
  },
  insertfavouriteProductText:{
    textAlign : 'center' ,
    color: '#000000' ,
    fontSize:18,
  },
});
