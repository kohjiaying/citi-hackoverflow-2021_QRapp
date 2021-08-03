import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../database/firebaseDB.js'

class MainHeaderScrollView extends Component {
	
	getStoreDatabase(){
		firebase.firestore().collection('vouchers').get()
		.then(querySnapshot=> {
			const results = []
			querySnapshot.docs.map(documentSnapshot=> results.push(documentSnapshot.data()))
			this.setState({isLoading: false, storeDatabase: results})})
		.catch(err => console.error(err))
	}
   
	state = {
		modalVisible: false,
		user: {'email': 'janedoe@gmail.com' , 'name': 'Jane Doe', 'userid': '8731'},
		stores: [
			{'voucherName': 'Starbucks', 'location': 'place1', 'info': '50% off', 'voucherid': '7133', 'storeid': '4009'},
         	{'voucherName': 'KFC', 'location': 'place2', 'info': '$5 off', 'voucherid': 2},
         	{'voucherName': 'LIHO', 'location': 'place3', 'info': '$10 off selected items', 'voucherid': 3},
         	{'voucherName': 'Burger King', 'location': 'place4', 'info': 'Buy 1 Get 1 Free', 'voucherid': 4},
         	{'voucherName': 'KOI', 'location': 'place5', 'info': '20% off', 'voucherid': 5}
      	],
		isLoading: true,
		storeDatabase: null,
      	selectedItem: {'voucherName': 'KOI', 'location': 'place5', 'info': '20% off', 'voucherid': 5},
	    tempStr: 'dummy1'
   }

  setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  }
  setSelectedItem(newItem) {
    	this.setState({selectedItem: newItem});
  }
  
  handleAddToCart() {
	  firebase.firestore()
	  .collection('userVoucher')
	  .add({
		  userid: this.state.user.userid,
		  voucherid: this.state.selectedItem.voucherid,
		  storeid: this.state.selectedItem.storeid
	  }).catch(err => console.error(err))
  }
	  
  onPressButton() {
	  this.handleAddToCart()
      alert('Added to cart!')
  }
  

  render() {
	    const { isLoading, users, storeDatabase} = this.state
		
		while (isLoading) {
		 this.getStoreDatabase()
		 return <ActivityIndicator/>
		}
	  
      	return (
          	<View style={styles.mainContainer}>
		    		<Text style = {styles.header}> Featured Deals Of The Day </Text>
				<FlatList
				    horizontal={true}
					data={this.state.storeDatabase}
					renderItem={({item}) => (
						<TouchableOpacity key = {item.voucherid} style = {styles.item} 
							onPress={() => {
                    			this.setModalVisible(true);
			              		this.setSelectedItem(item); 
								console.log(JSON.stringify(storeDatabase))
                  }}>
                    		<Text>{item.voucherName}</Text>
                		</TouchableOpacity>
					)}
				keyExtractor={item => item.voucherid}/>
					
					<Modal
			          	animationType="slide"
			          	transparent={true}
			          	visible={this.state.modalVisible}
			          	onRequestClose={() => {
					    	this.setModalVisible(!this.state.modalVisible);
					      }}>
			          	<View style={styles.modalcontainer}>
						<View style={styles.modalcard}>
						<Text style={{fontSize: 20, padding: 5}}>{this.state.selectedItem.voucherName}</Text>
                		<Text style={{fontSize: 15, padding: 5}}>{this.state.selectedItem.location}</Text>
                		<Text style={{fontSize: 12, padding: 5}}>{this.state.selectedItem.info}</Text>
                		<Text style={styles.space}></Text>
                		<TouchableOpacity onPress={() => {
                    			this.onPressButton();
						}}>
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
