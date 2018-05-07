import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import API from '../Services/Api';
const api = API.create();
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import AfsprakenLijst from '../Components/AfsprakenLijst';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
import OfflineNotice from '../Components/OfflineNotice';


// import TabNavigator from '../Navigation/AppNavigation'

// Styles
import styles from './Styles/AfsprakenScreenStyle'

class AfsprakenScreen extends Component {


  constructor(){
    super();

    this.state = {
      afspraken: [
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
      ],
      isFetched: false,
      refreshing: false,
    };
  }

  componentDidMount(){
    api.getAfspraken()
      .then((response) => {

        const afspraken = response.data
        
        afspraken.sort(function(a, b) {
          a = new Date(a.acf.datum);
          b = new Date(b.acf.datum);
          return a>b ? -1 : a<b ? 1 : 0;
        });

        this.setState({
          afspraken: afspraken,
          isFetched: true,
        });
        
      });
  }


  _onRefresh() {
    this.setState({
      afspraken: [
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
        {title:{rendered:''},acf:{datum:""}},
      ],
      refreshing: true,
      isFetched: false,
    });
    api.getAfspraken()
    .then((response) => {

      const afspraken = response.data
        
        afspraken.sort(function(a, b) {
          a = new Date(a.acf.datum);
          b = new Date(b.acf.datum);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      
      this.setState({
        refreshing: false,
        afspraken: afspraken,
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

          <AfsprakenLijst isFetched={this.state.isFetched} afspraken={this.state.afspraken} navigation={this.props.navigation} />

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

export default connect(mapStateToProps, mapDispatchToProps)(AfsprakenScreen)
