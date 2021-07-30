import React, { useState, useEffect, Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity,Modal,Alert,Pressable } from 'react-native';

class QRmodal extends Component {
   
   state = {
      names: [
         {'name': 'Ben', 'id': 123874872347},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5}
      ]
   }
	  
   render() {
	  
      return (
         <View style={styles.mainContainer}>
		    <Text style = {styles.header}> My Vouchers </Text>
         </View>
      )
   }
}
export default QRmodal

const styles = StyleSheet.create ({
	scrollView : {}, 
	mainContainer : {
		marginTop: 10
	}, 
	header: {
		fontSize: 20
	},
    item: {
      padding: 100,
      margin: 2,
      borderColor: '#414757',
      borderWidth: 1,
      backgroundColor: '#560CCE',
   }
})