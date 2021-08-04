import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { SafeAreaView, Alert } from 'react-native';

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import firebase from '../../database/firebaseDB.js'

export default function ScanScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	var scannedItemId = data.slice(0, -16)
	var timeScanned = data.substr(data.length - 8)
	var scannedDate = data.slice(0, -8)
	scannedDate = scannedDate.substr(scannedDate.length - 8)
	var scannedDateTime = new Date(Date.parse(scannedDate + " " + timeScanned))
	var currTime = new Date()
	if (scannedDateTime >= currTime){
		firebase.firestore().collection("purchased").doc(scannedItemId).delete().then(() => {
			Alert.alert(
			  'Alert',
			  'Voucher Redeemed',
			  [
				{text: 'Ok', onPress: () => setScanned(false)},
			  ],
			  {cancelable: false},
			);
		}).catch((error) => {
			Alert.alert(
			  'Alert',
			  'Voucher not found. Check for voucher in Search.',
			  [
				{text: 'Ok', onPress: () => setScanned(false)},
			  ],
			  {cancelable: false},
			);
		})
	} else{
		Alert.alert(
		  'Alert',
		  'QRCode has expired. Please request for customer to regenerate voucher QRCode in the app.',
		  [
			{text: 'Ok', onPress: () => setScanned(false)},
		  ],
		  {cancelable: false},
		);
	}
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
	<View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

