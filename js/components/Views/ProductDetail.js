'use strict';

import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
}from 'react-native';
import Dimensions from 'Dimensions';
import ProductInfor from './ProductDetailView/ProductInfor'



var comment = function(tittle, user, date,commentContent){
    this.tittle = tittle;
    this.user = user;
    this.date = date;
    this.commentContent = commentContent;
};
export default class ProductDetail extends Component{

  render(){
    var commentData = [];
    commentData.push((new comment("fsfs","co","06/06/89","fjfhlfhkfhafklhaflafhaf")));
    commentData.push((new comment("fsfs1","co1","06/06/89","fsadfasfafafafa")));
    return(
      <View style= { styles.index }>
        <ProductInfor name = "san pham test"
                      price = "121.111 VND"
                      productNumber = "4"
                      starNumber = "2.5"
                      productImages = {["CatelogyIcon","CatelogyIcon","CatelogyIcon"]}
                      Promotions = {["Với mỗi 100.000 d trong đơn hàng, quý khách được tặng 100 tiki",
                                     "Với mỗi 100.000 d trong đơn hàng, quý khách được tặng 100 tiki",
                                     "Với mỗi 100.000 d trong đơn hàng, quý khách được tặng 100 tiki"]}
                    productInfo = "Cuốn sách Phát Triển Và Nâng Cao Toán Lớp 1 được biên soạn giúp các thầy cô giáo, các bậc phụ huynh và đặc biệt là các em học sinh tham khảo. Cuốn sách được viết dựa theo chương trình nội dung SGK Toán lớp 1 một cách hệ thống bằng 5 dạng cơ bản dưới đây."
                    commentProps = {commentData}
                    />
       </View>
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
