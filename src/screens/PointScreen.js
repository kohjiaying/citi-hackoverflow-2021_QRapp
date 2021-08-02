import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PointScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
	    <View style={styles.headerView}>
            <Text style={styles.header} >My Loyalty Points</Text>
			<Icon name="close" size={20} color="white" style={{padding: 10, right:10, position: 'absolute'}} onPress={() => navigation.goBack()}/>
        </View>
        <View style={styles.container}>
            <Text> Points Screen</Text>
            <Text> Points Screen</Text>
            <Text> Points Screen</Text>
            <Text> Points Screen</Text>
            <Text> Points Screen</Text>
            <Text> Points Screen</Text>
        </View>
     </SafeAreaView>
  )
}



const styles = StyleSheet.create({
	headerView:{
		backgroundColor: '#414757',
		marginTop: 40,
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
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })