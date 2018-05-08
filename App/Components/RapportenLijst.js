import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Platform, TouchableOpacity, refreshControl } from 'react-native';
import styles from './Styles/RapportenLijstStyle';
import API from '../Services/Api';
const api = API.create();

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';




export default class RapportenLijst extends Component {

  constructor(){
    super();
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };


  render () {
    
    return (
      <View style={styles.container}>
        <Card>
          <FlatList 
          ItemSeparatorComponent={this.renderSeparator} 
          data={this.props.Rapporten} 
          renderItem={({item}) => <TouchableOpacity disabled={!this.props.isFetched} key={item.id} onPress={() => this.props.navigation.navigate('Detail', item)}><CardItem>
            <Body style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}><ShimmerPlaceHolder colorShimmer={['#f7f7f7', '#e8e8e8', '#f7f7f7']} style={{height:20}} autoRun={true} visible={this.props.isFetched}>
            
            <Text style={{fontSize:15, color: '#595959'}}>{item.title.rendered}</Text></ShimmerPlaceHolder>
            <Icon name={'arrow-forward'} style={{ marginLeft: 0, fontSize: 20, color: '#cccccc', marginTop: 1, }} />

            </Body>
            
          </CardItem></TouchableOpacity>
} keyExtractor={(item, index) => index.toString()}/>
        </Card>
      </View>
    )
  }
}