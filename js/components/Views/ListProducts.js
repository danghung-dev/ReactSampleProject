/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import{
  Alert,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  AsyncStorage
}from 'react-native';
import DataFetcher from './../../common/datafetcher';
import Dimensions from 'Dimensions';
import Cache from '../../common/cache'

var THUMB_URLS = [
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book1.jpg'),
];

export default class ListProducts extends Component{
  cache = new Cache.Cache({
    namespace: 'myapp',
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
  });

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {

          if (r2.image || r1.image) {
            return true;
          } else {
            return (r1 !== r2)
          }
        }});
    this.state = {
       isDataReady: false,
       dataSource: {} ,
    };
    this._renderRow = this._renderRow.bind(this);
    this.load_data = this.load_data.bind(this);
    this._pressRow = this._pressRow.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state.dataSource = ds.cloneWithRows(this._genRows({}));

    this.cache.getItem('http://magedev.hayasw.com/api/rest/products', this.load_data);
    //DataFetcher().fetch( "http://magedev.hayasw.com/api/rest/products" , this.load_data , function(error){console.log('error:'+error)}) ;
  }
  _pressData = ({}: {[key: number]: boolean})

  componentWillMount() {
    this._pressData = {};
  }
  componentDidMount() {

  }

  load_data(error, response) {
    var body = response["_bodyInit"];
    var parsebody = JSON.parse(body);
    var datatmp = this._genRows2(parsebody);
    this.setState({
        dataSource : this.state.dataSource.cloneWithRows(datatmp),
        isDataReady: true,
    });
    this.getImage(datatmp);

  }

  getImage(data) {
    var count = 0;
    var self = this;
    //console.log('data1:' + JSON.stringify(data));
    data.forEach( function(item) {

      self.cache.getItem('http://magedev.hayasw.com/api/rest/products/' + item.entity_id + '/images' , function (error, response) {
        //console.log('response1:' + JSON.stringify(response));
        var body = response["_bodyInit"];
        var parsejson = JSON.parse(body);

        //console.log('response :'+ JSON.stringify(parsejson  ));
        if (parsejson[0])
        if (typeof parsejson[0].url === 'string' || parsejson[0].url instanceof String) {
          item.image = parsejson[0].url;
        }
        count++;
        if (count == data.length) {
          self.setState({
            dataSource : self.state.dataSource.cloneWithRows(data),
            isDataReady: true,
          });
        }
      });

    });

  }

  _genRows2(json) : Array<any> {
    var dataBlob = [];
    for(var x in json){
      dataBlob.push(json[x]);
    }
    return dataBlob;
  }

  render() {

    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView style={{flex:1}}
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        initialListSize={21}
        pageSize={2} // should be a multiple of the no. of visible cells per row
        scrollRenderAheadDistance={500}
        renderRow={this._renderRow}

      />
    );
  }

  _renderRow(rowData , sectionID: number, rowID: number) {
    var imgSource = THUMB_URLS[1 % THUMB_URLS.length];
    if (typeof rowData.image != 'undefined') {
      imgSource = {uri:rowData.image};
      //console.log('image:' + imgSource);
    }
    //console.log('image:' + imgSource);
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
          <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={{textAlign:'center',height:55}}>
              {rowData.name}
            </Text>
              <Text style= {{color:'red'}}>
                {rowData.price}
              </Text>
          </View>
          </View>
      </TouchableHighlight>
    );
  }

  _genRows(pressData: {[key: number]: boolean}): Array<any> {
    // if (this.state.isDataReady) {
    //  return this.state.jsonData;
    // } else {
      var dataBlob = [];
      for (var ii = 0; ii < 100; ii++) {
        var pressedText = pressData[ii] ? ' (X)' : '';
        dataBlob.push('Cell ' + ii + pressedText);
      }
      return dataBlob;
    // }
  }

  _pressRow(rowID: number) {
    // this._pressData[rowID] = !this._pressData[rowID];
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(
    //   this._genRows(this._pressData)
    // )});
  }
}

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  row: {
    padding: 5,
    margin: 10,
    width: screenWidth/2 - 20,
    height: 200,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 96
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});

module.exports = ListProducts;
