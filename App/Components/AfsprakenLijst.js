import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Platform, TouchableOpacity, refreshControl } from 'react-native';
import styles from './Styles/AfsprakenLijstStyle';
import API from '../Services/Api';
const api = API.create();

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { format } from 'date-fns';




export default class AfsprakenLijst extends Component {

  constructor(){
    super();
  }

  toDateTime(date){
    return format(date, 'dddd DD MMMM HH:mm');
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
          data={this.props.afspraken} 
          renderItem={({item}) => <TouchableOpacity disabled={!this.props.isFetched} key={item.id} onPress={() => this.props.navigation.navigate('Detail', item)}><CardItem>
            <Body style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}} ><View><ShimmerPlaceHolder colorShimmer={['#f7f7f7', '#e8e8e8', '#f7f7f7']} style={{height:20}} autoRun={true} visible={this.props.isFetched}>
            
            <Text style={{fontSize:16, color: '#595959'}}>{item.title.rendered}</Text></ShimmerPlaceHolder><ShimmerPlaceHolder duration={800} colorShimmer={['#f7f7f7', '#e8e8e8', '#f7f7f7']} style={{height:11, marginTop: 4, width:60}} autoRun={true} visible={this.props.isFetched}>
            <Text style={{fontSize:11, color: '#a5a5a5'}}>{this.toDateTime(item.acf.datum)}</Text></ShimmerPlaceHolder></View>
            <Icon name={'arrow-forward'} style={{ marginLeft: 0, fontSize: 20, color: '#cccccc', marginTop: 1, }} />

            </Body>
            
          </CardItem></TouchableOpacity>
          }/>
        </Card>
      </View>
    )
  }
}
