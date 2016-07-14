import React ,{Component} from 'react';
import Dimensions from 'Dimensions';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Navigator,
}from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import SoDiaChi from './UserManager/SoDiaChi'


export default class UserManager extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.navigationView}>

          <Image source={require('../../common/image/480x800.jpg')} style= {styles.backgroundImage} resizeMode={Image.resizeMode.cover}>
            <Text style={{flex:1,textAlign:'center',fontSize:20,marginTop:screenHeight*3/14}}>Hayabusa </Text>
          </Image>

          <View style={{width:screenWidth,height:screenHeight*2/10,flexDirection:'row'}}>
              <View style={{width:screenWidth/3,height:screenHeight*2/10}}>
              <Text style={{textAlign:'center',fontSize:20,color:'black',marginTop:screenHeight/20}}>0 </Text>
              <Text style={{textAlign:'center',fontSize:20,color:'black'}}>Bookcare </Text>

              </View>
              <View style={{width:1, height:screenHeight/10,backgroundColor:'black',marginTop:screenHeight/30}}></View>
              <View style={{width:screenWidth/3,height:screenHeight*2/10}}>
              <Text style={{textAlign:'center',fontSize:20,color:'black',marginTop:screenHeight/20}}>0 </Text>
              <Text style={{textAlign:'center',fontSize:20,color:'black'}}>Fahasa xu </Text>
              </View>
              <View style={{width:1, height:screenHeight/10,backgroundColor:'black',marginTop:screenHeight/30}}></View>
              <View style={{width:screenWidth/3,height:screenHeight*2/10}}>
              <Text style={{textAlign:'center',fontSize:20,color:'black',marginTop:screenHeight/20}}>0 </Text>
              <Text style={{textAlign:'center',fontSize:20,color:'black'}}>Thông báo </Text>
              </View>
          </View>
          <TouchableOpacity onPress={()=>{
            console.log('so dia chi');
            this.props.navigator.push({name:'SoDiaChi'});
          }}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Sổ địa chỉ </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Đơn hàng của tôi </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Sản phẩm yêu thích </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Sản phẩm mua sau </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Sản phẩm đã xem </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Nhận xét của tôi </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Thông tin thanh toán </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Cài đặt </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Thông tin Fahasa </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}}>
          <View style ={styles.row_line}>
          <Image source = {require('../../common/image/SachTiengViet_Icon.jpg')}  style={styles.left_icon} />
            <Text style={styles.text_line}>Bookcare của tôi </Text>
          <Image source = {require('../../common/image/arrow_right.png')}  style={styles.right_icon}/>
          </View>
          </TouchableOpacity>


        </ScrollView>

    );
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  navigationView:{
    marginTop : screenHeight/10,
    backgroundColor: '#F6F6F6',
  },
  navigationViewHeader :{
    marginTop : 0,
    marginBottom : 0,
    flexDirection: 'column',
    height : screenHeight/4 ,
    backgroundColor: '#ff5d5e'
  },
  row_line:{
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight/10,
  },

  left_icon :{
    width : screenHeight/16 ,
    height : screenHeight/16 ,
    marginLeft: screenWidth/16,
  },
  right_icon :{

    width : screenHeight/30 ,
    height : screenHeight/30,
    marginTop:10,
  },

  text_line:{
    marginTop:5,
    marginLeft: 15,
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    width:screenWidth*3/5,
  },

  backgroundImage: {
    flex: 1,
    width: screenWidth,
    height: screenHeight*3/10,
}

});
