import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity,Modal,Alert,Pressable,TextInput  } from 'react-native';

class OwnerVoucherScrollView extends Component {
   
   state = {
	  modalVisible: false,
      names: [
         {'name': 'Starbucks', 'location': 'place1', 'description': '50% off', 'id': 1, 'price': '$1.90'},
         {'name': 'KFC', 'location': 'place2', 'info': '$5 off', 'id': 2},
         {'name': 'LIHO', 'location': 'place3', 'info': '$10 off selected items', 'id': 3},
         {'name': 'Burger King', 'location': 'place4', 'info': 'Buy 1 Get 1 Free', 'id': 4},
         {'name': 'KOI', 'location': 'place5', 'info': '20% off', 'id': 5},
		 {'name': 'Starbucks', 'location': 'place1', 'info': '50% off', 'id': 6},
         {'name': 'LIHO', 'location': 'place3', 'info': '$10 off selected items', 'id': 7},
         {'name': 'Burger King', 'location': 'place4', 'info': 'Buy 1 Get 1 Free', 'id': 8},
         {'name': 'KOI', 'location': 'place5', 'info': '20% off', 'id': 9},
		 {'name': 'KFC', 'location': 'place2', 'info': '$5 off', 'id': 10},
      ],
      selectedItem: {'name': 'Daniel', 'id': 5}
	  }
   
   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setSelectedItem(newItem) {
    this.setState({selectedItem: newItem});
  }
  
   render() {
      return (
         <View style={styles.mainContainer}>
		    
            <ScrollView >
			 <View style={styles.scrollViewContainer}>
				{
                  this.state.names.map((item, index) => (
                     <TouchableOpacity key = {item.id} style = {styles.item} 
					   onPress={() => {
						this.setModalVisible(true);
						this.setSelectedItem(item);
					  }}>
                        <Text style = {styles.itemcontent} >{item.name}</Text>
                     </TouchableOpacity>
                  ))
                }
			 </View>
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
							  <Text>{this.state.selectedItem.description}</Text>
							  <Text>{this.state.selectedItem.location}</Text>
							  <Text>{this.state.selectedItem.price}</Text>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  Alert.alert("Voucher deleted!");
									  this.setModalVisible(!this.state.modalVisible);
								  }}
							  >
								  <Text style={styles.textStyle}>Delete Voucher</Text>
							  </Pressable>
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
export default OwnerVoucherScrollView

const styles = StyleSheet.create ({
	scrollView : {}, 
	scrollViewContainer : {
		marginBottom: 160
	}, 
	header: {
		fontSize: 20
	},
	itemcontent: {
	  fontSize: 20,
	  color: 'white'
	},
    item: {
	  padding:20,
      margin: 2,
      borderColor: '#414757',
      borderWidth: 1,
      backgroundColor: '#560CCE',
	  width: '100%',
	  alignItems: 'center',
      justifyContent: 'center',
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
	width: '100%',
	marginTop: 10
    },
	buttonClose: {
	  backgroundColor: "#560CCE",
    },
})