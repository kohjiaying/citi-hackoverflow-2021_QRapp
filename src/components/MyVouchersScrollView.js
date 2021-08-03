import React, { useState, useEffect, Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity,Modal,Alert,Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firebase from '../../database/firebaseDB.js'
   
class MyVouchersScrollView extends Component {
	
	getPurchasedDatabase(){
		firebase.firestore().collection('purchased').where('userid', '==', this.state.user.userid).get()
		.then(querySnapshot=> {
			const results = []
			querySnapshot.docs.map(documentSnapshot=> results.push(documentSnapshot.data()))
			this.setState({isLoading: false, purchaseDatabase: results})})
		.catch(err => console.error(err))
	}
	
   state = {
	  modalVisible: false,
	  user: {'email': 'janedoe@gmail.com' , 'name': 'Jane Doe', 'userid': '8731'},
	  purchaseDatabase: [],
	  selectedItem: {'name': 'Daniel', 'id': 5},
	  tempStr: 'dummy1'
   }
   
   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setSelectedItem(newItem) {
    this.setState({selectedItem: newItem});
  }
  
  setQRvalue(selectedItem){
	this.setState({tempStr: selectedItem.itemid});
  }
	
   render() {
	  const { isLoading, purchaseDatabase} = this.state
		
		while (isLoading || (this.state.purchaseDatabase.length == 0)) {
		 this.getPurchasedDatabase()
		 return <Text>You have no vouchers purchased.</Text>
		}
		
      return (
         <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
				{
                  this.state.purchaseDatabase.map((item, index) => (
                     <TouchableOpacity key = {item.itemid} style = {styles.item} 
					   onPress={() => {
						this.setQRvalue(item);
						this.setModalVisible(true);
						this.setSelectedItem(item);
					  }}>
                        <Text style = {styles.itemcontent} >{item.itemid}</Text>
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
							  <Text style={{fontSize: 20, padding: 5}}>{this.state.selectedItem.itemid}</Text>
							  <QRCode
									value= {this.state.tempStr}
									size={300}
							  />
							  <Text>{this.state.tempStr}</Text>
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
export default MyVouchersScrollView

const styles = StyleSheet.create ({
	container: {
	alignItems: 'center',
    },
	mainContainer : {
		marginTop: 10,
		marginBottom: 100
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
	  width: 400,
      height: 100,
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