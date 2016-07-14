import React, {Component} from 'react';
import{
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TextInput,
  TouchableHighlight
}from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,AccessToken
} = FBSDK;

export default class LoginView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      type: null
    };
  }
  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {

      GoogleSignin.configure({
        
        iosClientId: '1069943788781-92qoh4knbabk6um2d8k8uctfse2orfbj.apps.googleusercontent.com',
        webClientId: '',
        offlineAccess: false
      });

      GoogleSignin.currentUserAsync().then((user) => {
        console.log('USER', user);
        this.setState({user: user});
      }).done();

    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    })

    //check user is logined
    AsyncStorage.getItem('user', (err, result) => {
      console.log('did mount---'+result);
      if(result){
        this.setState({
            type:JSON.parse(result).type,
        })
      }

    });
  }



  render(){
    if(!this.state.type){
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Đăng nhập {this.state.user}</Text>
          <TextInput style={styles.input} placeholder="Email"/>
          <TextInput style={styles.input} placeholder="Password"/>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>
              Đăng nhập
            </Text>
          </TouchableHighlight>
          <GoogleSigninButton style={styles.buttonSocial} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Light} onPress={this._signIn.bind(this)}/>
          <LoginButton
          style={styles.buttonSocial}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
                } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                   const { accessToken } = data
                   this.initUser(accessToken)

                 })

              }
            }
          }
          onLogoutFinished={()=>{this.signout();}}/>
        </View>
      );

    }else{
      var buttonLogout
      if(this.state.type=='facebook'){
        buttonLogout=(
          <LoginButton
          style={styles.buttonSocial}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
                } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                   const { accessToken } = data
                   this.initUser(accessToken)

                 })

              }
            }
          }
          onLogoutFinished={()=>{this.signout();}}/>
        );
      }else{
        buttonLogout=(<TouchableHighlight style={styles.button} onPress={this._signOut.bind(this)}>
          <Text style={styles.buttonText}>
            Thoat
          </Text>
        </TouchableHighlight>);
      }
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Trang quản lý tài khoản </Text>
          {buttonLogout}

        </View>
      );


    }

    }

  initUser(token) {
  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {
      this.processResult(json);
  })
  .catch(() => {

  })
}
  processResult(result){
    this.callback({'name':result.name,'avatar':'https://graph.facebook.com/'+result.id+'/picture?type=small','type':'facebook'})
  }
  callback(user){
    AsyncStorage.setItem('user',JSON.stringify({name:user.name,avatar:user.avatar,type:user.type}));
    this.props.navigator.pop();
    this.props.route.callback(user);
  }
  signout(){
    this.callback('')
  }
  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.callback({'name':user.name,'avatar':user.photo,'type':'google'})
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.callback('')
    })
    .done();
  }
}
const styles =StyleSheet.create({
  container:{
    flex:1,
    paddingTop:100,
    alignItems: 'center',
    backgroundColor:'#F5FCFF'
  },
  heading:{
    fontSize:20
  },
  input:{
    height:50,
    fontSize:18,
    padding:5,
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    borderWidth:1,
    borderColor:'#48bbec'
  },
  button:{
    height:50,
    backgroundColor:'#48bbec',
    marginTop:10,
    alignSelf:'stretch',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
  },
  buttonSocial:{
    height:40,
    marginTop:10,
    alignSelf:'stretch',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,

  },
  buttonText:{
    fontSize:22,
    color:'white',
    alignSelf:'center'
  }
});
