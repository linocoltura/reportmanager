import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import RapportenLijst from '../Components/RapportenLijst';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
// import TabNavigator from '../Navigation/AppNavigation'

// Styles
import styles from './Styles/RapportenScreenStyle'

class RapportenScreen extends Component {


  render () {
    return (

        <Container>

        <Content style={{ padding: 5}}>

          <RapportenLijst navigation={this.props.navigation}/>

        </Content>
        

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
