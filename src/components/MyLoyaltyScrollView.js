import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions } from 'react-native';

class MyLoyaltyScrollView extends Component {
   
   state = {
      names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5}
      ]
   }
   render() {
      return (
         <View style={styles.mainContainer}>
		    <Text style = {styles.header}> My Loyalty Cards </Text>
            <ScrollView contentContainerStyle={styles.container}>
				{
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {styles.item}>
                        <Text style = {styles.itemcontent}>{item.name}</Text>
                     </View>
                  ))
                }
            </ScrollView>
         </View>
      )
   }
}
export default MyLoyaltyScrollView

const styles = StyleSheet.create ({
	container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
	alignItems: 'center',
    },
	mainContainer : {
		marginTop: 10,
		marginBottom: 300
	}, 
	header: {
		fontSize: 20
	},
	itemcontent: {
	  fontSize: 20,
	  color: 'white'
	},
    item: {
      padding: 0,
      margin: 2,
      borderColor: '#414757',
      borderWidth: 1,
      backgroundColor: '#560CCE',
	  alignItems: 'center',
      justifyContent: 'center',
	  width: 188,
      height: 250,
   },
})