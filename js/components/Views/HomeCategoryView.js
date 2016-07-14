'use strict';
import getData from './Database'
import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
}from 'react-native';
import Dimensions from 'Dimensions';
import FGridView from './FGridView'

type Props = {
  navigator: Navigator;

};

export default class HomeCategoryView extends Component{
  props: Props;

  render(){
    var books = getData()
    var listComponent=[{text:"Sach Tieng Viet",data:books},{text:"Sach Tieng Anh",data:books},{text:"Sach Tieng Nhat",data:books}];
    return(
      <ScrollView style= { styles.index }>
      {listComponent.map(function(bookitem,i) {
        return(
          <View key={i}>
            <Text> {bookitem.text}</Text>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal={true}>
              <FGridView navigator = {this.props.navigator} books={bookitem.data}/>
            </ScrollView>
          </View>
        );

      },this)}
       </ScrollView>
    )
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
    marginTop : 0,
    marginBottom : 0,
    flexDirection: 'row',
    alignItems: 'center',
    height : screenHeight/8,
    backgroundColor: '#cc0000' ,
    marginVertical: 9
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
