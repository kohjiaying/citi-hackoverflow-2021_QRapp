import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import SearchBarExample from '../components/SearchBar.js';
import MainHeaderScrollView from '../components/MainHeaderScrollView.js';
import LocationScrollView from '../components/LocationScrollView.js';
import CategoryScrollView from '../components/CategoryScrollView.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventBannerScroll from '../components/EventBannerScroll.js';

export default function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<View style={styles.container}>
			<SearchBarExample />
        </View>
		
		<TouchableOpacity onPress={() => {
						  navigation.navigate('StoreQRScanScreen')
		}}>
		<View style={{flexDirection: "row", borderColor:'black', borderWidth: 1, marginTop:20, margin:5}}>
			<Icon name="qrcode" size={30} color="black" style={{padding: 10, marginTop:5}}/>
			<Text style={{fontSize: 18, padding: 5, marginTop: 12}}>Scan store's QR Code to explore vouchers</Text>
		</View>
		</TouchableOpacity>
		<ScrollView>
		<EventBannerScroll /> 
		<TouchableOpacity onPress={() => {
						  navigation.navigate('PointScreen')
		}}>
		<View style={{flexDirection: "row", borderColor:'black', borderWidth: 1, marginTop:20, margin:5}}>
			<Icon name="star" size={20} color="black" style={{padding: 10, marginTop:5}}/>
			<Text style={{fontSize: 18, padding: 5, marginTop: 7}}>You have 100 points for redemption!</Text>
			<Icon name="arrow-right" size={18} color="black" style={{padding: 10, marginTop:5}}/>
		</View>
		</TouchableOpacity>
		
		<MainHeaderScrollView />   
		<LocationScrollView />  
		<CategoryScrollView /> 
		</ScrollView>
     </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
    container: {
      marginTop: 40,
    },
  })