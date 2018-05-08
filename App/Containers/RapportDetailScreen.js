import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, View, FlatList, Modal, Child, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import getDirections from 'react-native-google-maps-directions';

import env from '../../env';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
import { format } from 'date-fns';
import SignatureCapture from 'react-native-signature-capture';


// Styles
import styles from './Styles/AfspraakDetailScreenStyle';

class AfspraakDetailScreen extends Component {

  constructor(){

    super();

    this.state = {
      isHidden: true,
      currentSignature: false,
    }
  }


  closeSignature() {
    this.setState({
      isHidden:true,
    })
  }


  renderSignatureView = () => {
    const { params } = this.props.navigation.state;
    const styles = {
      buttonTab: {
        height: 48,
        flexDirection: 'row'
      },
      button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonStyle: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }

    if(this.state.isHidden){
      return;
    }
    return(
      <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', zIndex: 6}}>
        <TouchableOpacity onPress={() => { this.closeSignature() }} style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', zIndex: 1, backgroundColor: '#919191', opacity: .5 }}></TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "column", position: 'absolute', width: '100%', height: '60%', zIndex: 9, backgroundColor: 'white', bottom: 0, elevation: 10 }}>
            <TouchableOpacity style={{position: 'absolute', top: 0, right: 0, padding: 20, zIndex: 99}}
                    onPress={() => { this.closeSignature() } } >
                    <Icon style={{color: '#8c8c8c'}} name="md-close" />
            </TouchableOpacity>
            <SignatureCapture
                style={{height: '85%'}}
                ref="sign"
                onSaveEvent={this._onSaveEvent}
                onDragEvent={this._onDragEvent}
                saveImageFileInExtStorage={true}
                showNativeButtons={false}
                viewMode={"portrait"}/>

            <View style={{ flexDirection: "row", height: '15%', backgroundColor: '#fff', elevation: 20, borderTopWidth: 1, borderColor: '#e8e8e8' }}>
                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => { this.saveSign() } } >
                    <Text>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => { this.resetSign() } } >
                    <Text>Reset</Text>
                </TouchableOpacity>

            </View>

        </View>
      </View>
    )
  }



  renderSignatureOrButton = () => {

    const styles = {
      subtitle: {
        marginBottom: 5,
        color: '#595959'
      }
    }

    if(!this.state.currentSignature){
      return(
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isHidden: !this.state.isHidden
            })
          }}>
         
        <View style={{flexDirection:'row', alignContent: 'center', alignItems: 'center'}}>
          <Icon style={{fontSize: 19, color: '#2196F3', marginRight: -12, marginLeft:0, marginTop: 1}} name="md-add" />
          <Text style={{color: '#2196F3'}}>Handtekening</Text>
        </View>
        
        </TouchableOpacity>
      );
    }
    // const path = `file://${this.state.currentSignature}`;
    const path = this.state.currentSignature;
    return(
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={[styles.subtitle, {marginBottom: 6}]}>handtekening</Text>
        <Image source={{uri: `data:image/png;base64,${path}`}}  resizeMode={'cover'} style={{height: 300, width: '100%'}}/>
      </View>
    )
  }



  toDateTime(date){
    return format(date, 'dddd DD MMMM HH:mm');
  }


  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
      this.refs["sign"].resetImage();
  }

  _onSaveEvent = (result) => {
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      this.setState({
        // currentSignature: result.pathName,
        currentSignature: result.encoded,
        isHidden: true,
      })
      console.log(result);
  }
  _onDragEvent() {
      // This callback will be called when the user enters signature
      // console.log("dragged");
  }


  render () {
    const { params } = this.props.navigation.state;

      
    const styles = {
      subtitle: {
        // flex: 1, 
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

<Content style={{ padding: 5, marginBottom: 8}}>

  <Card>

    <CardItem header button onPress={() =>this.props.navigation.goBack()}>
      <Icon style={{color:'#2196F3', fontSize: 20, marginTop: 1,}} name="arrow-back" /><Title style={{color:'#2196F3'}}><Text>{ params.title.rendered }</Text></Title>
    </CardItem>


    <CardItem style={styles.cardStyle}>
    <Text style={[styles.subtitle, {marginBottom: 6}]}>
        Afspraak
      </Text>
      <View style={styles.customerStyle}>
        <Icon style={styles.customerIconStyle} name="md-people" />
        <Text style={{fontSize:12}}>
        { params.acf.afspraak[0].acf.klant[0].post_title }
        </Text>
      </View>
      <View style={styles.customerStyle}>
        <Icon style={styles.customerIconStyle} name="md-locate" />
        <Text style={{fontSize:12}}>
          { params.acf.afspraak[0].acf.adres.address }
        </Text>
      </View>
      <View style={styles.customerStyle}>
        <Icon style={styles.customerIconStyle} name="md-calendar" />
        <Text style={{fontSize:12}}>
          { this.toDateTime(params.acf.afspraak[0].acf.datum) }
        </Text>
      </View>
    </CardItem>
  </Card>

  <Card>
    <CardItem style={styles.cardStyle}>
        <Text style={styles.subtitle}>
          Notities
        </Text>
        <Text style={styles.textStyle}>
          { params.acf.notities }
        </Text>
    </CardItem>
  </Card>

  <Card>
    <CardItem style={styles.cardStyle}>

      <View>
        <Text style={styles.subtitle}>
          Foto's
        </Text>

        <FlatList 
          ItemSeparatorComponent={ () => <View style={{marginRight: 15}} />}
          horizontal
          data={params.acf.fotos} 
          style={{marginTop: 5}}
          renderItem={({item}) =>
            <Image resizeMode={'cover'} source={{uri: item.url}} style={{height: 150, width: 200}}/>
        } keyExtractor={(item, index) => index.toString()}/>
      </View>

    </CardItem>
  </Card>

  <Card>
    <CardItem style={{ justifyContent: 'center', flex: 1 }}>
          
        {this.renderSignatureOrButton()}


    </CardItem>
  </Card>
</Content>
  
  {this.renderSignatureView()}

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
