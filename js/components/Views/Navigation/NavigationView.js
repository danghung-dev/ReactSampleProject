import React,{Component} from 'react';
import Dimensions from 'Dimensions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
}from 'react-native';
var MyButton = require('../../../common/MyButton');
import NavigationItem from './NavigationItem';
export default class NavigationView extends Component{
  constructor(props){
    super(props);
    this.state={
      userName:null,
      userAvatar:null
    }
  }

  componentDidMount(){
    console.log('did mount');
    AsyncStorage.getItem('user', (err, result) => {
      console.log('did mount---'+result);
      if(result){
        this.setState({
            userName:JSON.parse(result).name,
            userAvatar:JSON.parse(result).avatar,

        })
      }

    });
  }
  render(){
    var HeaderNavigation;
    console.log('avartat= '+this.state.userAvatar)
    if(this.state.userName){
      HeaderNavigation=(<View style= { styles.navigationViewHeader }>

          <Image source={{uri:this.state.userAvatar}} style={styles.girl_icon} />
          <Text style={{marginLeft: 10, fontSize: 15, textAlign: 'left'}}> {this.state.userName}</Text>
          <TouchableOpacity onPress={()=>{
            this.props.RootView.drawer.closeDrawer();
            this.props.RootView._navigator.push({name:'login',callback:this.updateUser.bind(this)});
          }} >
          <Text style={{marginRight: 10, fontSize: 15, textAlign: 'left',color:'blue'}}> Quản lý tài khoản </Text>
          </TouchableOpacity>
      </View>);
    }else{
      HeaderNavigation= (<View style= { styles.navigationViewHeader }>
        <View style = {{alignItems:'center', justifyContent:'center'}} >
        <MyButton
          style = {{marginTop: 50, width : 100,}}
          caption="Log in"
          type = 'bordered'
          onPress = { () => {this.props.RootView.drawer.closeDrawer(); this.props.RootView._navigator.push({name:'login',callback:this.updateUser.bind(this)});}}
        />
        </View>

      </View>);
    }
    var listCategory=[
      {name:'Van Hoa Pham',icon:'VanHoaPham_Icon'},
      {name:'Do Luu Niem',icon:'Do_Luu_Niem_Icon'},
      {name:'Sach Tieng Viet',icon:'SachTiengViet_Icon'},
      {name:'Van Hoa Pham',icon:'VanHoaPham_Icon'},
      {name:'Do Luu Niem',icon:'Do_Luu_Niem_Icon'},
      {name:'Sach Tieng Viet',icon:'SachTiengViet_Icon'},
      {name:'Van Hoa Pham',icon:'VanHoaPham_Icon'},
      {name:'Do Luu Niem',icon:'Do_Luu_Niem_Icon'},
      {name:'Sach Tieng Viet',icon:'SachTiengViet_Icon'}
    ]
    return(

      <View style= { styles.container }>
        {HeaderNavigation}
        <ScrollView
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}
            style={styles.navigationView}>
            <TouchableOpacity onPress={()=>{this.props.RootView.drawer.closeDrawer();this.props.RootView._navigator.push({name:'userManager'});}}>
              <NavigationItem title='Thông tin tài khoản'  icon ='SachTiengViet_Icon'/>
            </TouchableOpacity>

            <NavigationItem title='Trang Chủ'  icon ='SachTiengViet_Icon'/>

            {listCategory.map(function(categoryItem,i) {
              return(
                <TouchableOpacity key={i} onPress={()=>{
                  this.props.RootView.drawer.closeDrawer();
                  this.props.RootView._navigator.push({name:'viewCategory',callback:this.updateUser.bind(this),title:categoryItem.name});
                }} >
                <NavigationItem title={categoryItem.name}  icon ={categoryItem.icon}/>
                </TouchableOpacity>
              );

            },this)}

          </ScrollView>
       </View>

    );
  }
  updateUser(result){
    if(result){
      this.setState({
          userName:result.name,
          userAvatar:result.avatar
      })
    }else{
      this.setState({
          userName:'',
          userAvatar:''
      })
    }

  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  navigationView:{
    marginTop : 0,
    marginBottom : 0,
      flexDirection: 'column',
      backgroundColor: '#ffffff',

  },
  navigationViewHeader :{
    marginTop : 0,
    marginBottom : 0,
    flexDirection: 'column',
    height : screenHeight/4 ,
    backgroundColor: '#ff5d5e'
  },

  girl_icon :{
    marginLeft  : screenWidth/16 ,
    marginTop   :screenHeight/32 ,
    width : screenHeight/8 ,
    height : screenHeight/8 ,
  },



});
