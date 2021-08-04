import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import MyVouchersScrollView from '../components/MyVouchersScrollView.js';

export default function MyVoucherScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<View style={styles.headerView}>
			<Text style={styles.header} >My Vouchers</Text>
		</View>
		<MyVouchersScrollView /> 
     </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    headerView:{
		backgroundColor: '#414757',
		marginTop: 40,
		alignItems: 'center',
        justifyContent: 'center',
	    padding: 15
 	},
	header: {
		fontSize: 20,
		color: 'white'
	},
	
  })