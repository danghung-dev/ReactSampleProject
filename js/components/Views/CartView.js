'use strict';

import React, { Component } from 'react';
import {
  Alert,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
}from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

var number =1;
var sum =0;
var CartView = React.createClass({
  statics: {
    title: '<ListView>',
    description: 'Performant, scrollable list of data.'
  },

  getInitialState: function() {
    var ischeck =false;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
    this.state={
      checked:true,
      number:1
    }
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      <ListView
      style={{marginTop:50}}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        //renderHeader ={this._renderheader}
        renderFooter={this._renderfooter}
        //renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        //renderSeparator={this._renderSeperator}
      />
    );
  },

  _renderheader: function() {
          if(this.state.checked){
              return (
                <TouchableHighlight onPress={()=>{
                  books.forEach(function(bookitem) {
                    bookitem.check =1;
                  });
                  sum=0;
                  this._pressRow(0);
                  this.setState({checked:false});
                }}>
                <View style={styles.rowHeader}>
                  <Image source = {require('../../common/image/uncheck.png')} style={styles.checkbox}  resizeMode={Image.resizeMode.contain}/>
                  <Text style={styles.checkAll}>Chọn tất cả sản phẩm </Text>
                </View>
              </TouchableHighlight>
            );
          }else{
              return (
                <TouchableHighlight onPress={()=>{
                  this.setState({checked:true});
                  books.forEach(function(bookitem) {
                  bookitem.check =0;
                  });
                  sum=0;
                    this._pressRow(0);
                }}>
              <View style={styles.rowHeader}>
              <Image source = {require('../../common/image/check.png')} style={styles.checkbox}  resizeMode={Image.resizeMode.contain}/>
              <Text style={styles.checkAll}>Chọn tất cả sản phẩm </Text>

              </View>
                </TouchableHighlight>
            );
          }
  },

  _renderfooter: function() {
    return (
        <View style={styles.row}>
          <Text style={{left:20, color: 'black', fontSize: 15}}>Tổng:</Text>
          <Text style={{left:20,color: 'red', fontSize: 15}}>{sum}</Text>
            <Image source = {require('../../common/image/bill.png')} style={styles.bill}  resizeMode={Image.resizeMode.contain}/>
        </View>
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    var rowNumber = parseInt(rowData[0]);
    var checknNumber = parseInt(rowData[1]);
    var imgSource = THUMB_URLS[rowID];
    var imgcheck =CHECK_URLS[0];
    
    return (
        <View style={{flex:1}}>
          <View style={styles.row}>

            <Image style={styles.thumb} source={imgSource} />
            <View style={styles.text}>
            <Text >
              {books[rowID].name}
            </Text>
              <Text style= {{color:'red'}}>
                {books[rowID].price_2}
              </Text>
              <Text style= {{textDecorationLine :'line-through'}}>
                {books[rowID].price}
              </Text>
              <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                  console.log('press')
                  sum =0;
                  if (books[rowID].number>0){
                    books[rowID].number-=1;
                    this._pressRow(rowID);
                    highlightRow(sectionID, rowID);
                  }else books[rowID].number=0;

                  console.log('press book'+books[rowID].number)
                  }}>
                  <Image source = {require('../../common/image/minus.png')} style={styles.minus}  />

                </TouchableOpacity>
                <Text style={{width:30,height:30, backgroundColor: 'red', fontSize: 20,textAlign:'center'}}>{rowNumber}</Text>
                <TouchableOpacity onPress={() => {
                      if (books[rowID].number>=0)
                      books[rowID].number+=1;
                      sum =0;
                      this._pressRow(rowID);
                      highlightRow(sectionID, rowID);
                      }}>
                    <Image source = {require('../../common/image/plus.png')} style={styles.plus}  />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {


                        sum =0;
                        books.splice(rowID,1);
                        THUMB_URLS.splice(rowID,1);
                        this._pressRow(rowID);


                        }}>
                      <Image source = {require('../../common/image/bin.png')} style={{width:30,height:30,marginLeft: 60}}  />
                    </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    books.forEach(function(bookitem) {
      //var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push(''+bookitem.number+bookitem.check);
      sum+=bookitem.number*bookitem.price_2*bookitem.check;
    });
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )
  });
  },

  _renderSeperator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
});

var THUMB_URLS = [
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book2.jpg'),
  require('./../../common/image/book3.jpg'),
  require('./../../common/image/book1.jpg'),
  require('./../../common/image/book2.jpg'),
  require('./../../common/image/book3.jpg'),
];
var CHECK_URLS = [
  require('./../../common/image/uncheck.png'),
  require('./../../common/image/check.png'),

];
  var books = [
    {name:"Harry Potter And The Cursed Child - Parts I & II (Special Rehearsal Edition)", price:65000, price_2: 57000,number : 2,check :1},
    {name:"Girl Online", price:55000, price_2: 37000,number : 1,check :1},
    {name:"Me Before You: A Novel (Movie Tie-In)", price:35000, price_2: 17000,number : 5,check :1},
    {name:"Harry Potter And The Cursed Child - Parts I & II (Special Rehearsal Edition)", price:65000, price_2: 57000,number : 2,check :1},
    {name:"Girl Online", price:55000, price_2: 37000,number : 1,check :1},
    {name:"Me Before You: A Novel (Movie Tie-In)", price:35000, price_2: 17000,number : 5,check :1},
  ];
var LOREM_IPSUM = 'muaHang';

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  rowHeader: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  chooseAll: {flex : 1, color: 'black', fontSize: 15, textAlign: 'center'},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  button: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding :10,
    marginLeft:-50,
  },
  thumb: {
    width: 64,
    height: 96,
    left :20,
  },
  checkbox: {
    height: 20,
    left: 20,
    width: 80,

    },
    checkbox_row: {
      height: 20,
      width:20,
      top:40,

      },
    minus: {

      height: 30,
      width:40,

    },
    number: {

      height: 30,
      width:30,

    },
    plus: {

      height: 30,
      width:40,

    },
      bill: {
        flex:3,
        width:50,
        height: 30,
        marginRight:-150,

        },
  text: {
    flex: 1,
    left: 30,

  },
  price: {

  top:50,
  },
});

module.exports = CartView;
