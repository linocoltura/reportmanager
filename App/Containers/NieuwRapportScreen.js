import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native';
import { connect } from 'react-redux';
import API from '../Services/Api';
const api = API.create();


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail, Fab, Textarea, Form, Item, Input } from 'native-base';

// Styles
import styles from './Styles/NieuwRapportScreenStyle'

class NieuwRapportScreen extends Component {


  constructor(){

    super();

    this.state = {
      titel: '',
      notities: '',
    };


  }




  // submitRapport = () => {
  //   // future: need type toggle (Suggestie/Probleem)

  //     api.nieuwRapport({
  //       notities: this.state.notities,
  //       beschrijving: description,
  //       adres: address,
  //       coords_lat: newMarker.latitude,
  //       coords_lon: newMarker.longitude,
  //       image: imageSource,
  //     }).then(() => {
  //       this.abortAddProblem();
  //       this.getLocations();
  //       Toast.show({
  //         text: 'Suggestie toegevoegd',
  //         position: 'top',
  //         buttonText: 'OK',
  //         duration: 5000,
  //       });
  //     })
  //   } else {
  //     // toast shows below modal: https://github.com/GeekyAnts/NativeBase/issues/985
  //     /* Toast.show({
  //       text: 'Vul aub alle velden in',
  //       position: 'top',
  //       buttonText: 'OK',
  //       duration: 7000,
  //       type: 'danger',
  //     }); */
  //     this.setState({ showErrors: true });
  //   }
  // }





  render () {
    const { params } = this.props.navigation.state;

    const styles = {
      subtitle: {
        flex: 1, 
        // fontWeight: 'bold', 
        marginBottom: 5,
        color: '#595959'
      },
      cardStyle: {
        borderBottomWidth: 1, 
        borderColor: '#f2f2f2', 
        flexDirection: 'column', 
        alignItems: 'flex-start'
      },
      textStyle: {
        fontSize: 12,
      },
      customerStyle: {
        flexDirection:'row', flex:1, alignItems: 'flex-start', alignContent: 'flex-start', marginTop: 3
      },
      customerIconStyle: {
        fontSize: 16, color: '#a0a0a0', marginRight: -12,
      }
    }

    return (
      <Container style={{backgroundColor: '#e2f2ff'}}>
        <Content style={{ padding: 5}}>

          <Card>
            <CardItem header button onPress={() =>this.props.navigation.goBack()}>
            <Icon style={{color:'#2196F3', fontSize: 20, marginTop: 1,}} name="arrow-back" />
            <View style={{flexDirection: 'column'}}>
              <Title style={{color:'#2196F3'}}>
                <Text> Nieuw rapport </Text>
              </Title>
              <Text style={{marginLeft:8, fontStyle: 'italic', color: '#595959'}}>{params.title.rendered}</Text>
              </View>
            </CardItem>
            <CardItem style={styles.cardStyle}>
                <Form style={{flex:1}}>
                  <Item style={{flex:1, width: '100%', marginLeft: 0, marginBottom: 6}}>
                    <Input onChangeText={(titel) => this.setState({titel})} style={{width:'100%', borderWidth:1, borderColor:'#e8e8e8', fontSize:15, paddingLeft:9}} placeholder="Titel" />
                  </Item>
                  <Item style={{flex:1, width: '100%', marginLeft: 0}}>
                    <Textarea onChangeText={(notities) => this.setState({notities})} style={{width:'100%', borderColor:'#e8e8e8', fontSize:15}} rowSpan={5} bordered placeholder="Notities" /> 
                  </Item>
                  <Button transparent primary>
                    <Body><Text style={{color:'#2196F3'}}>Opslaan</Text></Body>
                  </Button>
                </Form>
            </CardItem>
          </Card>

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

export default connect(mapStateToProps, mapDispatchToProps)(NieuwRapportScreen)
