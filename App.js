import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {homeStyle} from './style/home';

import {globalStyle} from './style/global';
import AppHeader from './components/AppHeader';
import ScanButton from './components/ScanButton';
import ProductItem from './components/ProductItem';
import {RNCamera} from 'react-native-camera';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
      modalItemsVisible: false,
      modalProduct: undefined,
    };

    this.products = [
      {id: 1, name: 'Coca', date: new Date()},
      {id: 2, name: 'Orangina', date: new Date()},
      {id: 3, name: 'Nestea', date: new Date()},
      {id: 4, name: 'Bière sans alcool', date: new Date()},
    ];

    this.title = 'Ioki';
  }

  handleScanPress = () => {
    this.setModalVisible(true);
    // alert('Je scan un produit')
  };

  setModalItemsVisible = bool => {
    this.setState({modalItemsVisible: bool});
  };

  setModalVisible = bool => {
    this.setState({modalVisible: bool});
  };

  handleProductPress = e => {
    this.setModalItemsVisible(true);
    var nom = e.name;

    console.log(nom);
  };
  async getProductFromApi(barcode) {
    try {
      let response = await fetch(
        'https://fr.openfoodfacts.org/api/v0/produit/' + barcode + '.json',
      );
      let responseJson = await response.json();
      return responseJson.product;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={globalStyle.container}>
        <AppHeader title={this.title} />

        <ScanButton handlePress={this.handleScanPress} />

        <ScrollView style={homeStyle.scrollProductView}>
          {this.products.map(produit => {
            return (
              <ProductItem
                product={produit}
                key={produit.id}
                onPressItem={this.handleProductPress}
              />
            );
          })}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
            <AppHeader title="Scanner" />
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{flex: 1}}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />

            <Text>Hello World!</Text>

            <TouchableHighlight
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                width: '100%',
                height: 70,
                left: 0,
                bottom: 0,
              }}>
              <Text
                title="closeModal"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                Hide Modal
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <Modal
          modalProduct={this.state.modalProduct}
          animationType="slide"
          transparent={false}
          visible={this.state.modalItemsVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          // onShow={this.ShowItems}
        >
          <View
            style={{flex: 1}}
            key={this.products.id}
            nom={this.products.name}>
            <AppHeader title="Scanner" />

            <Text>{this.products.name}</Text>

            <TouchableHighlight
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                width: '100%',
                height: 70,
                left: 0,
                bottom: 0,
              }}>
              <Text
                title="closeModal"
                onPress={() => {
                  this.setModalItemsVisible(!this.state.modalItemsVisible),
                    (modalProduct = undefined);
                }}>
                Hide Modal
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}
