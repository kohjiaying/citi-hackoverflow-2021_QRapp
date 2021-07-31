import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function StoreQRScanScreen({navigation}) {
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
	    <View style={styles.headerView}>
            <Text style={styles.header} >Scan Store's QR</Text>
			<Icon name="close" size={20} color="white" style={{padding: 10, right:10, position: 'absolute'}} onPress={() => navigation.goBack()}/>
        </View>
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
	headerView:{
		backgroundColor: '#414757',
		marginTop: 30,
	    padding: 15,
		flexDirection: "row",
		alignItems: 'center',
        justifyContent: 'center',
 	},
	header: {
		fontSize: 20,
		color: 'white',
		marginBottom: 0
	},
    container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  })