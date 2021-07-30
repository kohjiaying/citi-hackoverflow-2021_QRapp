import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';

class MainHeaderScrollView extends Component {
   
	state = {
			modalVisible: false,
		stores: [
			{'name': 'Starbucks', 'location': 'place1', 'info': '50% off', 'id': 1},
         	{'name': 'KFC', 'location': 'place2', 'info': '$5 off', 'id': 2},
         	{'name': 'LIHO', 'location': 'place3', 'info': '$10 off selected items', 'id': 3},
         	{'name': 'Burger King', 'location': 'place4', 'info': 'Buy 1 Get 1 Free', 'id': 4},
         	{'name': 'KOI', 'location': 'place5', 'info': '20% off', 'id': 5}
      	],

      	selectedItem: {'name': 'KOI', 'location': 'place5', 'info': '20% off', 'id': 5},
	    tempStr: 'dummy1'
   }

  setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  }
  setSelectedItem(newItem) {
    	this.setState({selectedItem: newItem});
  }
  onPressButton() {
    	alert('Added to cart!')
  }

  render() {
	  
      	return (
          	<View style={styles.mainContainer}>
		    		<Text style = {styles.header}> Featured Deals Of The Day </Text>
            	<ScrollView horizontal={true}>
				          {
              		this.state.stores.map((item, index) => (
                		<TouchableOpacity key = {item.id} style = {styles.item} 
							onPress={() => {
                    			this.setModalVisible(true);
			              		this.setSelectedItem(item); 
                  }}>
                    		<Text>{item.name}</Text>
                		</TouchableOpacity>
                ))
                }
            	</ScrollView>
					<Modal
			          	animationType="slide"
			          	transparent={true}
			          	visible={this.state.modalVisible}
			          	onRequestClose={() => {
					    	this.setModalVisible(!this.state.modalVisible);
					      }}>
			          	<View style={styles.modalcontainer}>
						<View style={styles.modalcard}>
						<Text style={{fontSize: 20, padding: 5}}>{this.state.selectedItem.name}</Text>
                		<Text style={{fontSize: 15, padding: 5}}>{this.state.selectedItem.location}</Text>
                		<Text style={{fontSize: 12, padding: 5}}>{this.state.selectedItem.info}</Text>
                		<Text style={styles.space}></Text>
                		<TouchableOpacity onPress={this.onPressButton}>
                  			<View style={styles.button}>
                    			<Text style={styles.buttonText}>Add to cart</Text>
                  			</View>
                		</TouchableOpacity>
                  		<Text style={styles.space}></Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}
						>
							<Text style={styles.textStyle}>Close</Text>
						</Pressable>
						</View>
			          	</View>
					</Modal>
			</View>
    )
  }
}
export default MainHeaderScrollView

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
   },
   modalcontainer: {
		alignItems: 'center',
        justifyContent: 'center',
		flex: 1 
	},
	modalcard: {
		margin: 5,
		backgroundColor: "white",
		borderRadius: 0,
		padding: 10,
		width: 350,
		height: 500,
		shadowColor: "#000",
		shadowOffset: {
		width: 100,
		height: 100
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
	},
	button: {
    alignItems: 'center',
    backgroundColor: '#560CCE',
    padding: 10,
	  width: '100%'
    },
	buttonClose: {
	  backgroundColor: "#560CCE",
    },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  space: {
    width: 20,
    height: 20,
  }
})
