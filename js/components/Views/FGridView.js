'use strict';

import React, { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
}from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import ProductDetail from './ProductDetail';

var FGridView = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        scrollEnabled={false}
      />

    );
  },

  _renderRow: function(rowData, sectionID: number, rowID: number) {
    
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor='rgba(0,0,0,0)'>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={rowData.img} />
            <Text style={{textAlign:'center',height:55}}>
              {rowData.name}
            </Text>
              <Text style= {{color:'red'}}>
                {rowData.price2}
              </Text>
              <Text style= {{textDecorationLine :'line-through'}}>
                {rowData.price}
              </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<any> {
    var dataBlob = [];
    this.props.books.forEach(function(bookitem) {
      let tmp = {
        img: bookitem.img,
        name : bookitem.name,
        price : bookitem.price,
        price2 : bookitem.price_2
      };
      dataBlob.push(tmp);
    });
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this.props.navigator.push({name: 'productDetail'});
  },
});

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  row: {

    padding: 5,
    margin: 10,
    width: 130,
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
  }
});

module.exports = FGridView;
