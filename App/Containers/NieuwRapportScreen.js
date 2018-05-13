import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';
import API from '../Services/Api';
const api = API.create();


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail, Fab, Textarea, Form, Item, Input, Toast } from 'native-base';

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





  submitRapport = () => {

    const { params } = this.props.navigation.state;

    console.log(params);
    

    const propsToPassAlong = {
      "title": {
        "rendered": this.state.titel,
      },
      "acf":{
        "notities": this.state.notities,
        "afspraak":[
          {
            "acf":{
              "klant":[
                {
                  "post_title": params.acf.klant[0].post_title,
                }
              ],
              "datum": params.acf.datum,
              "adres":{
                "address": params.acf.adres.address,
              }
            }
          }
        ]
      }
    }

    api.putRapport({
      titel: this.state.titel,
      notities: this.state.notities,
      afspraak: params.id,
    }).then(() => {

      const navigateAction = NavigationActions.navigate({
        routeName: 'Rapporten',
        // navigate can have a nested navigate action that will be run inside the child router
        action: NavigationActions.navigate({ routeName: 'DetailRapport', params: propsToPassAlong }),
      });
      this.props.navigation.dispatch(navigateAction);


    })
  }
  





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
              <Title style={{color:'#2196F3', textAlign:'left', marginLeft: 3}}>
                <Text style={{textAlign:'left'}}> Nieuw rapport </Text>
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
                  <Button onPress={() => this.submitRapport()} transparent primary>
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
