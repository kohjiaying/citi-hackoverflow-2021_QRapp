import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../database/firebaseDB.js'

class CartScrollView extends Component {
	
	getCartDatabase(){
		firebase.firestore().collection('cart').where('userid', '==', this.state.user.userid).get()
		.then(querySnapshot=> {
			const results = []
			querySnapshot.docs.map(documentSnapshot=> results.push(documentSnapshot.data()))
			this.setState({isLoading: false, cartDatabase: results})})
		.catch(err => console.error(err))
	}
	
	getVoucherDatabase(){
		firebase.firestore().collection('vouchers').get()
		.then(querySnapshot=> {
			const results = []
			querySnapshot.docs.map(documentSnapshot=> results.push(documentSnapshot.data()))
			this.setState({isLoading: false, cartDatabase: results})})
		.catch(err => console.error(err))
	}
   
	state = {
		modalVisible: false,
		user: {'email': 'janedoe@gmail.com' , 'name': 'Jane Doe', 'userid': '8731'},
		isLoading: true,
		cartDatabase: null,
      	selectedItem: {'userid': '', 'storeid': '', 'voucherid': '', 'cartitemid': ''},
	    tempStr: 'dummy1'
   }

  setSelectedItem(newItem) {
    	this.setState({selectedItem: newItem});
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  handleDeletefromCart(item) {
	  firebase.firestore()
	  .collection('cart')
	  .doc(item.cartitemid)
	  .delete().catch(err => console.error(err))
  }
	  
  onPressButton(item) {
	  this.handleDeletefromCart(item)
      alert('Removed from cart!')
	  
	  this.setState({isLoading: true});
	  this.forceUpdate()
  }
  

  render() {
	    const { isLoading, cartDatabase} = this.state
		
		while (isLoading || (this.state.cartDatabase.length == 0)) {
		 this.getCartDatabase()
		 return <Text>Your cart is empty.</Text>
		}
	  
      	return (
          	<View style={styles.mainContainer}>
				<FlatList
					data={this.state.cartDatabase}
					renderItem={({item}) => (
						<View key = {item.cartitemid} style = {styles.item} 
							>
                    		<Text>{item.cartitemid}</Text>
							<Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  this.setSelectedItem(item);
									  this.setModalVisible(true);
									  
								  }}
							  >
								  <Text style={styles.textStyle}>Remove from cart</Text>
							  </Pressable>
                		</View>
					)}
				keyExtractor={item => item.cartitemid}/>
				
				<Modal
			  animationType="slide"
			  transparent={true}
			  visible={this.state.modalVisible}
			  onRequestClose={() => {
					  this.setModalVisible(!this.state.modalVisible);
					}}>
			    <View style={styles.modalcontainer}>
							  <View style={styles.modalcard}>
							  <Text style={{fontSize: 20, padding: 5}}>Are you sure you want to remove voucher from cart?</Text>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  this.onPressButton(this.state.selectedItem);
									  this.setModalVisible(!this.state.modalVisible);
								  }}
							  >
								  <Text style={styles.textStyle}>Yes</Text>
							  </Pressable>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  this.setModalVisible(!this.state.modalVisible);
								  }}
							  >
								  <Text style={styles.textStyle}>No</Text>
							  </Pressable>
							  </View>
			    </View>
			</Modal>
					
			</View>
    )
  }
}
export default CartScrollView

const styles = StyleSheet.create ({
	scrollView : {}, 
	mainContainer : {
		marginTop: 10
	}, 
	header: {
		fontSize: 20
	},
    item: {
      padding: 5,
	  width: 400,
      height: 100,
	  alignItems: 'center',
	  borderColor: '#414757',
	  borderWidth: 1,
	  marginBottom: 10
	  
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
		height: 200,
		shadowColor: "#000",
		shadowOffset: {
		width: 100,
		height: 100
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
    alignItems: 'center',
    backgroundColor: '#560CCE',
    padding: 10,
	  width: '100%',
	  marginBottom: 10
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
  },
  featuredLogo: {
    width: 290,
    height: 160,
	borderColor: '#414757',
    borderWidth: 1
  },
})