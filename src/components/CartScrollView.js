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
			this.setState({isLoading: false, voucherDatabase: results})})
		.catch(err => console.error(err))
	}
   
	state = {
		modalVisible: false,
		user: {'email': 'janedoe@gmail.com' , 'name': 'Jane Doe', 'userid': '8731'},
		isLoading: true,
		cartDatabase: null,
      	selectedItem: {'userid': '', 'storeid': '', 'voucherid': '', 'itemid': ''},
	    tempStr: 'dummy1',
		voucherDatabase: null,
		totalIncome: 0
   }
	
	getTotal(){
		firebase.firestore().collection('cart').where('userid', '==', this.state.user.userid).get()
		.then(function(querySnapshot) {
		 querySnapshot.forEach(function(doc) {
			totalIncome += doc.data().price;
			this.setState({totalIncome: totalIncome})
		 })
	    })
	}
	
  setSelectedItem(newItem) {
    	this.setState({selectedItem: newItem});
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  handlePurhased(cartDatabase) {
	  batch = firebase.firestore().batch()
	  for (let i = 0; i < cartDatabase.length; i++) {
		  console.log(cartDatabase[i].itemid)
		  let docName = cartDatabase[i].itemid
		  docRef = firebase.firestore().collection("purchased").doc(docName); 
	      batch.set(docRef, cartDatabase[i]);
		  firebase.firestore().collection("cart").doc(docName).delete(); 
	  }
	  batch.commit()
	  alert('Thank you for your purchase!')
	  this.setState({cartDatabase: null});
	  this.setState({isLoading: true});
	  this.setState({isLoading: true});
	  this.forceUpdate()
  }
  
  handleDeletefromCart(item) {
	  firebase.firestore()
	  .collection('cart')
	  .doc(item.itemid)
	  .delete().catch(err => console.error(err))
  }
	  
  onPressButton(item) {
	  this.handleDeletefromCart(item)
      alert('Removed from cart!')
	  this.setState({isLoading: true});
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
						<View key = {item.itemid} style = {styles.item} 
							>
                    		<Text style = {{fontWeight: 'bold'}}>{item.itemid}</Text>
							<TouchableOpacity
								  style={styles.buttonClose}
								  onPress={() => {
									  this.setSelectedItem(item);
									  this.setModalVisible(true);
									  
								  }}
							  >
								  <Text style={styles.buttonTextClose}>Remove from cart</Text>
							  </TouchableOpacity>
                		</View>
					)}
				keyExtractor={item => item.itemid}>
				</FlatList>
				<View style={styles.purchase}>
				<Text style={{fontWeight: 'bold'}}>Total Amount Payable:</Text>
				<TouchableOpacity
					  style={[styles.purchasebutton, styles.purchasebuttonClose]}
					  onPress={() => {
						  this.handlePurhased(this.state.cartDatabase);
					  }}
				  >
					  <Text style={styles.buttonText}>Check Out Cart</Text>
				 </TouchableOpacity>
				
				</View>
				
				
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
							  <TouchableOpacity
								  style={styles.button}
								  onPress={() => {
									  this.onPressButton(this.state.selectedItem);
									  this.setModalVisible(!this.state.modalVisible);
								  }}
							  >
								  <Text style={styles.buttonText}>Yes</Text>
							  </TouchableOpacity>
							  <TouchableOpacity
								  style={styles.buttonClose}
								  onPress={() => {
									  this.setModalVisible(!this.state.modalVisible);
								  }}
							  >
								  <Text style={styles.buttonTextClose}>No</Text>
							  </TouchableOpacity>
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
	  borderWidth: 2,
	  marginBottom: 10,
	  borderRadius: 5
	  
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
	  	margin: 5,
	  	borderRadius: 5,
	  	width: '100%'
    },
    buttonText: {
    	textAlign: 'center',
    	padding: 10,
    	color: 'white',
    	fontWeight: 'bold'
  	},
	buttonClose: {
	  	alignItems: 'center',
    	borderColor: '#560CCE',
    	padding: 10,
	  	width: '100%',
	  	margin: 5,
	  	borderWidth: 2,
	  	borderRadius: 5
    },
    buttonTextClose:{
    	textAlign: 'center',
    	color: '#560CCE',
    	fontWeight: 'bold'
    },
  	purchasebutton: {
      	alignItems: 'center',
      	backgroundColor: '#560CCE',
      	padding: 10,
	  	width: '100%',
	  	marginTop: 10,
	  	borderRadius: 5
    },
	purchasebuttonClose: {
	  	backgroundColor: "#560CCE",
	  	padding: 10
    },
  	space: {
    	width: 20,
    	height: 20,
  	},
  	purchase: {
		alignItems: 'center',
    	justifyContent: 'center',
    	height: 100,
		borderColor: '#414757',
    	borderWidth: 2,
    	borderRadius: 5
  	},
  
})