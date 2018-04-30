import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Platform, TouchableOpacity } from 'react-native';
import styles from './Styles/RapportenLijstStyle';
import API from '../Services/Api';
const api = API.create();

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';


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

  state = {
    rapporten: []
  };

  componentDidMount(){
    api.getRapporten()
      .then((response) => {
        this.setState({
          rapporten: response.data
        });
        console.log(this.state.rapporten);
        
      });
  }

  render () {
    return (
      <View style={styles.container}>
        <Card>
          <FlatList 
          keyExtractor={(item) => item.slug} 
          ItemSeparatorComponent={this.renderSeparator} 
          data={this.state.rapporten} renderItem={({item}) => <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')}><CardItem key={item.id}>
          
            <Body><Text>{item.title.rendered}</Text></Body>
            <Right><Icon name={Platform.OS === 'ios' ? 'ios-arrow-forward-outline' : 'md-arrow-dropright'} style={{ marginLeft: 0, }} /></Right>
            
          </CardItem></TouchableOpacity>}
          
          />
        </Card>
      </View>
    )
  }
}


