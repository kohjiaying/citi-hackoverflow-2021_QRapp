import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircle from 'react-native-progress-circle'



export default function PointScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
	    <View style={styles.headerView}>
            <Text style={styles.header} >My Loyalty Points</Text>
			<Icon name="close" size={20} color="white" style={{padding: 10, right:10, position: 'absolute'}} onPress={() => navigation.goBack()}/>
        </View>
        <View style={styles.container}>
		     <ImageBackground
                source={require("../assets/images/pointscreen.jpg")}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  justifyContent: "center",
                }}
                >
              
		
			<View style={{flexDirection: "row", marginTop:10, margin:5, borderRadius: 5}}>
			<Text style={styles.body}>Current Loyalty Points:                              100</Text>
			</View>
			
			<View style={{flexDirection: "row", marginTop:10, margin:5, borderRadius: 5}}>
            <Text style={styles.body}>Current Tier:                                                Gold
			</Text>
			</View>
			
			<View style={{flexDirection: "row", marginTop:10, margin:5, borderRadius: 5}}>
            <Text style={styles.body}>Next Tier:                                             Platinum</Text>
			</View>
			
			<View style={{flexDirection: "row", marginTop:10, margin:5, borderRadius: 5}}>
			<Text style={styles.body}>Total Lifetime Points:                           12,000</Text>
			</View>
			
			<View style={{flexDirection: "row", marginTop:10, margin:5, borderRadius: 5}}>
			<Text style={styles.body}>Points To Next Tier:                                3,000</Text>
			</View>

			<View style={{alignItems: 'center', marginTop:70}}>
			<ProgressCircle
            percent={80}
            radius={130}
            borderWidth={30}
            color="#560CCE"
            shadowColor="#999"
			bgColor= '#fff'

			>
            <Text style={{ fontSize: 18 }}>{'12,000/15,000'}</Text>
			</ProgressCircle>
			</View>
		</ImageBackground>	
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
		marginBottom: 0,
		fontWeight: 'bold'
	},
    container: {
      flex: 1,
      width: '100%',

    },
	
		body: {
		fontSize: 20,
		padding: 5,
		color: 'white'
	},
	
	innerText: {
    color: '#daa520',
	fontWeight: 'bold',
	textAlign: 'right', 
	alignSelf: 'stretch'

	
	
  }
	
	
  })