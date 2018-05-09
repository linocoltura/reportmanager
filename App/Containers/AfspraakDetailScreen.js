import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import getDirections from 'react-native-google-maps-directions';

import env from '../../env';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail, Fab } from 'native-base';
import { format } from 'date-fns';

import Communications from 'react-native-communications';



// Styles
import styles from './Styles/AfspraakDetailScreenStyle';

class AfspraakDetailScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      active: false,
    }
  }


  handleGetDirections = () => {

     let { params } = this.props.navigation.state;

     let  latitude = params.acf.adres.lat;
     let  longitude = params.acf.adres.lng;

    const data = {

      destination: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }
    getDirections(data)
  }


  toDateTime(date){
    return format(date, 'dddd DD MMMM HH:mm');
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
        
<Container>

<Content style={{ padding: 5}}>

  <Card>
    <CardItem header button onPress={() =>this.props.navigation.goBack()}>
    <Icon style={{color:'#2196F3', fontSize: 20, marginTop: 1,}} name="arrow-back" /><Title style={{color:'#2196F3'}}><Text>{ params.title.rendered }</Text></Title>
    </CardItem>
    
    <CardItem style={styles.cardStyle}>
        <Text style={styles.subtitle}>
          Omschrijving
        </Text>
        <Text style={styles.textStyle}>
          { params.acf.omschrijving }
        </Text>
    </CardItem>
    <CardItem style={styles.cardStyle}>
        <Text style={styles.subtitle}>
          Datum
        </Text>
        <Text style={styles.textStyle}>
          { this.toDateTime(params.acf.datum) }
        </Text>
    </CardItem>
    </Card>
    
    <Card>
    <CardItem >
        <Text style={[styles.subtitle, {marginBottom: -8}]}>
          Adres
        </Text>
    </CardItem>
    <CardItem cardBody>
        <TouchableOpacity style={{flex: 1}} onPress={this.handleGetDirections}>
        <Image
          style={{marginTop: 10, width: '100%', height: 150, flex: 1, alignItems: 'stretch'}}
          // source={{uri: 'https://maps.googleapis.com/maps/api/staticmap?center="'+ params.acf.adres.lat +','+ params.acf.adres.lng +'"&zoom=14&size=500x300&key=AIzaSyBdfX8epSZcNT3IqlC8bdjby5MzQZK0-S8'}}
          source={{uri: `https://maps.googleapis.com/maps/api/staticmap?center="${params.acf.adres.lat},${params.acf.adres.lng}"&zoom=14&size=500x300&key=${env.GOOGLE_MAPS_API_KEY}`}}/>
        </TouchableOpacity>
    </CardItem>
    <CardItem style={{borderBottomWidth: 1, borderColor: '#f2f2f2'}}>
    <Left style={{flexDirection:'row', flex:1}}>
        <Icon style={{fontSize: 17, color: '#a0a0a0', marginTop: 2, marginRight: 6,}} name="md-locate" />
        <Text style={{fontSize:12}}>
          { params.acf.adres.address }
        </Text>
      </Left>
      <Body style={{flex:1, flexDirection:'row', justifyContent: 'flex-end'}}>
        <Button transparent style={{margin: 0, padding: 0}} onPress={this.handleGetDirections}>
        <Icon style={{fontSize: 17, color: '#2196F3', marginTop: 2, marginLeft: 6, marginRight: 6,}} name="navigate" />
        <Text style={{color: '#2196F3'}}>
          Navigeren
        </Text>
        </Button>
      </Body>
    </CardItem>
    </Card>

    <Card style={{marginBottom:20}}>
      <CardItem style={styles.cardStyle}>
      <Text style={[styles.subtitle, {marginBottom: 6}]}>
          Klant
        </Text>
        <View style={styles.customerStyle}>
          <Icon style={styles.customerIconStyle} name="md-people" />
          <Text style={{fontSize:12}}>
            { params.acf.klant[0].post_title }
          </Text>
        </View>
        <View style={styles.customerStyle}>
          <Icon style={styles.customerIconStyle} name="md-person" />
          <Text style={{fontSize:12}}>
            { params.acf.klant[0].acf.contactpersoon }
          </Text>
        </View>
        <View style={styles.customerStyle}>
          <Icon style={[styles.customerIconStyle, {color: '#2196F3'}]} name="md-call" />
          <TouchableOpacity onPress={() => Communications.phonecall(params.acf.klant[0].acf.telefoon, true)}>
          <Text style={{fontSize:12, color: '#2196F3'}}>
            { params.acf.klant[0].acf.telefoon }
          </Text>
          </TouchableOpacity>
        </View>
      </CardItem>
    </Card>
    
    {/* <Card>
    <CardItem style={{ justifyContent: 'center', flex: 1 }}>
          <Button style={{ backgroundColor:'white', borderWidth: 1, borderColor: '#2196F3', padding: 12, paddingTop:0, paddingBottom:0}} iconLeft light>
            <Icon style={{fontSize: 19, color: '#2196F3', marginRight: 10, marginLeft:0, marginTop: 1}} name="md-add" />
            <Text style={{color: '#2196F3'}}>Rapport</Text>
          </Button>
    </CardItem>

  </Card> */}

</Content>

<Fab
  containerStyle={{ }}
  style={{ backgroundColor: '#2196F3' }}
  position="bottomRight"
  onPress={() => this.props.navigation.navigate('NieuwRapport', params)}>
  <Icon name="md-add" />
</Fab>


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

export default connect(mapStateToProps, mapDispatchToProps)(AfspraakDetailScreen)
