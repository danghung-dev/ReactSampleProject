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
import ShowStar from './ShowStar';
import ProductInsert from './ProductInsert'
import ProductCommentView from './ProductCommentView'

export default class ProductInfor extends Component{
  render(){
    return(
      <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          horizontal={false}
          style={styles.scrollView}>
          <View style= { styles.index }>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                onScroll={() => { console.log('onScroll!'); }}
                scrollEventThrottle={200}
                horizontal={true}
                >
                <View style = {styles.imageList}>{
                  [...Array(parseInt(this.props.productImages.length))].map((key,i) =>
                    <Image key = {"ProductInfor_imageList" +i} source={ImageUtil.getImageSource(this.props.productImages[i])}  style = {styles.imageShow} resizeMode={Image.resizeMode.contain} />
                  )
                }
                </View>
            </ScrollView>
            <Text style = {styles.productName}> {this.props.name}</Text>
            <Text style = {styles.productPrice}> {this.props.price}</Text>
            <ShowStar starNumber = {this.props.starNumber}/>
            <Text style = {styles.productNumber}> {"số lượng còn "+this.props.productNumber+" sản phẩm"}</Text>
            <View style = {styles.PromotionsView}>{
              [...Array(parseInt(this.props.Promotions.length))].map((key,i) =>
                <Text key = {"ProductInfor_PromotionsView" +i} style = {styles.PromotionsText} >{this.props.Promotions[i]}</Text>
              )
            }
            </View>
            <ProductInsert />
            <Text style ={styles.productInfTilteText}> Thông tin sản phẩm </Text>
            <Text style ={styles.productInfText}>{this.props.productInfo}</Text>
         </View>
         <ProductCommentView commentProps = {this.props.commentProps}/>
      </ScrollView>

    )
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollView:{
    height: screenHeight,
  },
  index:{
    flexDirection: 'column',
  },
  imageList:{
      height : 3*screenHeight/5,
      flexDirection: 'row',
      alignItems:  'center',
  },
  imageShow:{
    width : screenWidth,
  },
  productName:{
    marginLeft:15,
    fontSize:30,
    textAlign:'left',
    color:'black',
  },
  productPrice:{
    marginLeft:15,
    fontSize:20,
    textAlign:'left',
    color:'red',
  },
  commentLink:{
    marginLeft:15,
    fontSize:15,
    textAlign:'left',
    color:'green',
  },
  productNumber:{
    marginLeft:15,
    fontSize:15,
    textAlign:'left',
    color:'black',
  },
  PromotionsView:{
    flexDirection: 'column',
    marginTop:10,
  },
  PromotionsText:{
    marginLeft:30,
    fontSize:15,
    textAlign:'left',
    color:'black',
  },
  productInfTilteText:{
    marginLeft:30,
    marginTop : 5,
    fontSize:20,
    textAlign:'left',
    color:'black',
  },
  productInfText:{
    marginLeft:30,
    marginTop : 5,
    fontSize:15,
    textAlign:'left',
    color:'black',
  },
});
