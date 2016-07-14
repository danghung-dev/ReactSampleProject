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

export default class ProductCommentView extends Component{
  render(){
    return(
      <View style = {styles.index}>
        <View style = {styles.tittleView}>
          <Text style = {styles.tittle}> Nhận xét </Text>
        </View>
        {
          [...Array(parseInt(this.props.commentProps.length))].map((key,i) =>
              <View key = {"ProductCommentView" +i} style = {styles.index}>
                <Text style= {styles.commentTittle}>{this.props.commentProps[i].tittle} </Text>
                  <View style = {styles.user_date}>
                  <Text style = {styles.user}>{this.props.commentProps[i].user}</Text>
                  <Text style = {styles.date}>{this.props.commentProps[i].date}</Text>
                  </View>
                  <Text style = {styles.comment}>{this.props.commentProps[i].commentContent} </Text>
              </View>
         )
        }
      </View>
    )
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  index:{
    flexDirection: 'column',
  },
  tittleView:{
    height: screenHeight/20,
    backgroundColor: '#D3D3D3',
  },
  tittle:{
    marginLeft:30,
    marginTop : 0,
    fontSize:20,
    textAlign:'left',
    color:'black',
  },
  commentTittle:{
    fontWeight: 'bold',
    marginLeft:30,
    marginTop : 5,
    fontSize:20,
    textAlign:'left',
    color:'black',
  },
  user_date:{
    marginVertical:10,
    flexDirection: 'row',
  },
  user:{
    flex:9,
    marginLeft:30,
    marginTop : 5,
    fontSize:10,
    textAlign:'left',
    color:'black',
  },
  date:{
    flex: 1,
    marginRight:30,
    marginTop : 5,
    fontSize:10,
    textAlign:'center',
    color:'black',
  },
  comment:{
    marginLeft:30,
    marginTop : 5,
    fontSize:15,
    textAlign:'left',
    color:'black',
  },
});
