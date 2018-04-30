import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import AfsprakenLijst from '../Components/AfsprakenLijst';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
// import TabNavigator from '../Navigation/AppNavigation'

// Styles
import styles from './Styles/AfsprakenScreenStyle'

class AfsprakenScreen extends Component {


  render () {
    return (

      <Container>

        <Content style={{ padding: 5}}>

          <AfsprakenLijst  navigation={this.props.navigation} />

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

export default connect(mapStateToProps, mapDispatchToProps)(AfsprakenScreen)
