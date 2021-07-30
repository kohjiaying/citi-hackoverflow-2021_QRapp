import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import ScrollViewExample from '../components/BuyScrollView.js';
import SearchBarExample from '../components/SearchBar.js';

export default function QueueScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<View style={styles.container}>
			<SearchBarExample />
        </View>
	    <ScrollViewExample />
        
     </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
    container: {
      marginTop: 30
    },
  })