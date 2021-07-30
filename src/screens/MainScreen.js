import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import SearchBarExample from '../components/SearchBar.js';
import MainHeaderScrollView from '../components/MainHeaderScrollView.js';
import LocationScrollView from '../components/LocationScrollView.js';
import CategoryScrollView from '../components/CategoryScrollView.js';

export default function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<View style={styles.container}>
			<SearchBarExample />
        </View>
		<ScrollView>
		<MainHeaderScrollView />   
		<LocationScrollView />  
		<CategoryScrollView /> 
		</ScrollView>
     </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
    container: {
      marginTop: 30
    },
  })