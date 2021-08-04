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
	  voucherDatabase: [
			{ link: require("../assets/images/mainHeaderScrollView/biryani.jpg"), voucherName: '1-For-1 Briyani Set', voucherDesc: 'Satiate your cravings for double the servings, giving you double the satisfaction', voucherPrice: '600', voucherid: '1000', storeid: '1' },
			{ link: require("../assets/images/mainHeaderScrollView/crab.jpg"), voucherName: '$200 Cash Voucher for Crabs and Seafood', voucherDesc: '$200 cash voucher for crabs and seafood when you dine in or take-away (Ala carte items only)', voucherPrice: '300', voucherid: '2000', storeid: '2' },
			{ link: require("../assets/images/mainHeaderScrollView/eggtart.jpg"), voucherName: 'Box of Eight (8) Portuguese Egg Tart', voucherDesc: 'These special egg tarts consist of a creamy egg custard sitting on a crisp flaky crust, and caramelised on the top.', voucherPrice: '400', voucherid: '4000', storeid: '3' },
			{ link: require("../assets/images/mainHeaderScrollView/pottery.jpg"), voucherName: '50-Minute Pottery Workshop ', voucherDesc: 'Clay making experience on a spinning wheel / wheel throwing.', voucherPrice: '1000', voucherid: '4500', storeid: '4' },
			{ link: require("../assets/images/mainHeaderScrollView/subway.jpg"), voucherDesc: '$10 cash voucher for all menu items, including subs, wraps, flatbreads, and salads.', voucherName: 'Subway: $10 Cash Voucher for Sandwiches and More', voucherPrice: '300', voucherid: '7000', storeid: '1' },
			{ link: require("../assets/images/mainHeaderScrollView/tart.jpg"), voucherName: '24 Pieces of Fruit / Blueberry Cheese / Eclairs Mini Tarts', voucherDesc: '24 pieces of mini tarts', voucherPrice: '150', voucherid: '1200', storeid: '2' }
		],
	  selectedItem: null,
	  tempStr: 'dummy1',
	  selectedvoucherid: null,
	  
   }
   
   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setSelectedItem(item) {
	const temp = item.voucherid
	console.log(temp)
	this.setState({selectedItem: temp})
	console.log(this.state.selectedItem)
  }
  
  setSelectedVoucherID(selectedItem){
	this.setState({selectedvoucherid: selectedItem.voucherid})
	console.log(this.state.selectedvoucherid)
	this.setState({selectedvoucherid: selectedItem.voucherid})
  }
  
  setQRvalue(selectedItem, expTime){
	const combi = selectedItem.itemid + expTime.toLocaleTimeString()
	this.setState({tempStr: combi});
  }
	
   render() {
	  const { isLoading, purchaseDatabase} = this.state
	  const currDate = new Date().toLocaleDateString()
	  const expTime = new Date()
	  expTime.setMinutes(expTime.getMinutes()+5)
		
		while (isLoading || (this.state.purchaseDatabase.length == 0)) {
		 this.getPurchasedDatabase()
		 return <View style={styles.noPurchase}><Text>You have no purchased voucher.</Text></View>
		}
		
      return (
         <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
				{
                  this.state.purchaseDatabase.map((item, index) => (
                     <TouchableOpacity 
					   key = {item.itemid} 
					   style = {styles.item} 
					   onPress={() => {
						this.setQRvalue(item, expTime);
						this.setSelectedVoucherID(item);
						this.setSelectedItem(item);
						this.setModalVisible(true);
					  }}>
					    <View style={{flexDirection: "row"}}>
						<Image
								style={styles.featuredLogo}
								source={this.state.voucherDatabase.find(x => x.voucherid === item.voucherid).link} />
					    <View style={{marginLeft: 10, flex:1}}>
                        <Text style = {styles.itemName} >{this.state.voucherDatabase.find(x => x.voucherid === item.voucherid).voucherName}</Text>
						<Text style = {styles.itemDesc} >{this.state.voucherDatabase.find(x => x.voucherid === item.voucherid).voucherDesc}</Text>
						</View>
						</View>
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
							  <Text style={{fontSize: 20, padding: 5, textDecorationLine: 'underline'}}>{this.state.voucherDatabase.find(x => x.voucherid === this.state.selectedvoucherid) ?
							  this.state.voucherDatabase.find(x => x.voucherid === this.state.selectedvoucherid).voucherName: ''}</Text>
							  <QRCode
									value= {this.state.tempStr}
									size={300}
							  />
							  <Text>This QRCode is only available for 5 minutes.</Text>
							  <Text>Date this QRCode is generated: {currDate}</Text>
							  <Text>Time this QRCode will expire: {expTime.toLocaleTimeString()}</Text>
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
	itemName: {
	  fontSize: 20,
	  color: 'white',
	  textDecorationLine: 'underline'
	},
	itemDesc: {
	  fontSize: 15,
	  color: 'white',
	},
    item: {
      padding: 10,
      margin: 2,
      borderColor: '#414757',
      borderWidth: 1,
      backgroundColor: '#560CCE',
	  alignItems: 'center',
      justifyContent: 'center',
	  width: 400,
      height: 100,
	  flex: 1,
	  flexWrap: 'wrap'
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
	noPurchase: {
	  alignItems: 'center',
      justifyContent: 'center',
	  flex: 1
  },
  featuredLogo: {
		width: 90,
		height: 90,
		borderColor: '#414757',
		borderWidth: 1,
	},
})