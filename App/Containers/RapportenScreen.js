import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, RefreshControl, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import API from '../Services/Api';
const api = API.create();
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import RapportenLijst from '../Components/RapportenLijst';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
import OfflineNotice from '../Components/OfflineNotice';

// import TabNavigator from '../Navigation/AppNavigation'

// Styles
import styles from './Styles/RapportenScreenStyle'

class RapportenScreen extends Component {

  constructor(){

    super();

    this.state = {
      Rapporten: [
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
      ],
      isFetched: false,
      refreshing: false,
    };
  }

  componentDidMount(){
    api.getRapporten()
      .then((response) => {
        this.setState({
          Rapporten: response.data,
          isFetched: true,
        });
        
      });
  }


  _onRefresh() {
    this.setState({
      Rapporten: [
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
      ],
      refreshing: true,
      isFetched: false,
    });
    api.getRapporten()
    .then((response) => {
      
      this.setState({
        refreshing: false,
        Rapporten: response.data,
        isFetched: true,
      });
      
    });
  }




  render () {
    return (

      <Container>
        <OfflineNotice/>

        <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }>

        <Content style={{ padding: 5}}>

        

          <RapportenLijst isFetched={this.state.isFetched} Rapporten={this.state.Rapporten} ref="child" navigation={this.props.navigation} />

        </Content>

        </ScrollView>
        
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RapportenScreen)
