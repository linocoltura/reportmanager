import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Platform } from 'react-native';
import styles from './Styles/AfsprakenLijstStyle';
import API from '../Services/Api';
const api = API.create();

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';


export default class AfsprakenLijst extends Component {

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

  state = {
    afspraken: []
  };

  componentDidMount(){
    api.getAfspraken()
      .then((response) => {
        this.setState({
          afspraken: response.data
        });
        console.log(this.state.afspraken);
        
      });
  }

  render () {
    return (
      <View style={styles.container}>
        <Card>
          <FlatList 
          keyExtractor={(item) => item.slug} 
          ItemSeparatorComponent={this.renderSeparator} 
          data={this.state.afspraken} renderItem={({item}) => <CardItem key={item.id}>
          
            <Body><Text>{item.title.rendered}</Text></Body>
            <Right><Icon name={Platform.OS === 'ios' ? 'ios-arrow-forward-outline' : 'md-arrow-dropright'} style={{ marginLeft: 0, }} /></Right>
            
          </CardItem>}/>
        </Card>
      </View>
    )
  }
}
