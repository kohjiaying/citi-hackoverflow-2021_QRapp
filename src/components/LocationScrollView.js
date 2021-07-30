import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions } from 'react-native';

class LocationScrollView extends Component {
   
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
		    <Text style = {styles.header}> Browse by Location </Text>
            <ScrollView horizontal={true}>
				{
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {styles.item}>
                        <Text>{item.name}</Text>
                     </View>
                  ))
                }
            </ScrollView>
         </View>
      )
   }
}
export default LocationScrollView

const styles = StyleSheet.create ({
	scrollView : {}, 
	mainContainer : {
		marginTop: 10
	}, 
	header: {
		fontSize: 20
	},
    item: {
      padding: 75,
      margin: 2,
      borderColor: '#414757',
      borderWidth: 1,
      backgroundColor: '#560CCE',
   }
})