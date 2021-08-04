import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../database/firebaseDB.js'

class MainHeaderScrollView extends Component {

	state = {
		modalVisible: false,
		user: { 'email': 'janedoe@gmail.com', 'name': 'Jane Doe', 'userid': '8731' },
		storeDatabase: [
			{ link: require("../assets/images/mainHeaderScrollView/biryani.jpg"), voucherName: '1-For-1 Briyani Set', voucherDesc: 'Satiate your cravings for double the servings', voucherPrice: '600', voucherid: '1000', storeid: '1', storename: 'Dhaba 1376' },
			{ link: require("../assets/images/mainHeaderScrollView/crab.jpg"), voucherName: '$200 Cash Voucher for Crabs and Seafood', voucherDesc: '$200 cash voucher for crabs and seafood when you dine in or take-away (Ala carte items only)', voucherPrice: '300', voucherid: '2000', storeid: '2', storename: 'Ponggol Seafood' },
			{ link: require("../assets/images/mainHeaderScrollView/eggtart.jpg"), voucherName: 'Box of Eight (8) Portuguese Egg Tart', voucherDesc: 'These special egg tarts consist of a creamy egg custard sitting on a crisp flaky crust, and caramelised on the top.', voucherPrice: '400', voucherid: '4000', storeid: '3', storename: 'Qinde Egg Tarts & Pastries' },
			{ link: require("../assets/images/mainHeaderScrollView/pottery.jpg"), voucherName: '50-Minute Pottery Workshop ', voucherDesc: 'Clay making experience on a spinning wheel / wheel throwing.', voucherPrice: '1000', voucherid: '4500', storeid: '4', storename: 'Clayable Pottery' },
			{ link: require("../assets/images/mainHeaderScrollView/subway.jpg"), voucherName: '$10 Cash Voucher for Sandwiches and More', voucherDesc: '$10 cash voucher for all menu items, including subs, wraps, flatbreads, and salads.', voucherPrice: '9', voucherid: '7000', storeid: '5', storename: 'Subway' },
			{ link: require("../assets/images/mainHeaderScrollView/tart.jpg"), voucherName: '24 Pieces of Fruit / Blueberry Cheese / Eclairs Mini Tarts', voucherDesc: '24 pieces of mini tarts', voucherPrice: '150', voucherid: '1200', storeid: '6', storename: 'Cake in Action' }
		],
		selectedItem: { 'voucherName': '', 'voucherDesc': '', 'voucherPrice': '', 'voucherid': '', 'link': '', 'storeid': '', 'storename': '' },
		tempStr: 'dummy1'
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	setSelectedItem(newItem) {
		this.setState({ selectedItem: newItem });
	}

	makeid() {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < 10; i++) {
			result += characters.charAt(Math.floor(Math.random() *
				charactersLength));
		}
		return result.toString();
	}


	setcartitemid(selectedItem, user) {
		const str1 = user.userid;
		const str2 = selectedItem.storeid;
		const str3 = selectedItem.voucherid;
		const str4 = this.makeid();
		const combi = str1 + str2 + str3 + str4;
		this.setState({ tempStr: combi });
	}

	handleAddToCart() {
		firebase.firestore()
			.collection('cart')
			.doc(this.state.tempStr)
			.set({
				itemid: this.state.tempStr,
				userid: this.state.user.userid,
				voucherid: this.state.selectedItem.voucherid,
				storeid: this.state.selectedItem.storeid
			}).catch(err => console.error(err))
	}

	onPressButton(selectedItem, user) {
		this.setcartitemid(selectedItem, user)
		this.handleAddToCart()
		alert('Added to cart!')
	}


	render() {

		return (
			<View style={styles.mainContainer}>
				<Text style={styles.header}> Featured Deals Of The Day </Text>
				<FlatList
					horizontal={true}
					data={this.state.storeDatabase}
					renderItem={({ item }) => (
						<TouchableOpacity key={item.voucherid} style={styles.item}
							onPress={() => {
								this.setModalVisible(true);
								this.setSelectedItem(item);
								this.setcartitemid(item, this.state.user)
							}}>
							<Image
								style={styles.featuredLogo}
								source={item.link} />
							<Text style={styles.headline}>{item.voucherName}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={item => item.voucherid} />

				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>
					<View style={styles.modalcontainer}>
						<View style={styles.modalcard}>
							<Text style={styles.modalheadline}>{this.state.selectedItem.storename}</Text>
							<Image
								style={styles.modalimg}
								source={this.state.selectedItem.link} />
							<Text style={styles.modalsubtitle}>{this.state.selectedItem.voucherName}</Text>
							<Text style={styles.price}>{'$' + this.state.selectedItem.voucherPrice}</Text>
							<Text style={styles.modaltext}>{this.state.selectedItem.voucherDesc}</Text>
							<Text style={styles.space}></Text>
							<TouchableOpacity onPress={() => {
								this.onPressButton(this.state.selectedItem, this.state.user);
								this.setModalVisible(!this.state.modalVisible);
							}}>
								<View style={styles.button}>
									<Text style={styles.buttonText}>Add to cart</Text>
								</View>
							</TouchableOpacity>
							<Pressable
								style={styles.buttonClose}
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
							>
								<Text style={styles.buttonTextClose}>Close</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}
export default MainHeaderScrollView

const styles = StyleSheet.create({
	scrollView: {},
	mainContainer: {
		marginTop: 10
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	item: {
		borderColor: '#414757',
      	borderWidth: 0,
      	borderRadius: 5,
      	margin: 3,
     	backgroundColor: '#560CCE',
     	alignItems: 'center'
	},
	headline: {
   		fontSize: 18,
   		maxWidth: 290,
   		fontWeight: 'bold',
   		textAlign: 'center',
   		color: 'white'
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
	  	margin: 5,
	  	borderRadius: 5
    },
	buttonClose: {
	  	alignItems: 'center',
    	backgroundColor: 'white',
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
  	buttonText: {
    	textAlign: 'center',
    	padding: 10,
    	color: 'white',
    	fontWeight: 'bold'
  	},
	space: {
		width: 20,
		height: 20,
	},
	featuredLogo: {
   		width: 290,
    	height: 160,
		borderColor: '#414757',
    	borderWidth: 1,
    	borderRadius: 5
  	},
  	modalimg: {
  		width: '100%',
  		height: 160,
  		borderWidth: 0
  	},
   	modalheadline: {
    	textAlign: 'center',
    	fontWeight: 'bold',
    	fontSize: 18,
    	padding: 5,
    	marginTop: 0
  	},
  	modalsubtitle: {
  		textAlign: 'center',
    	fontWeight: 'bold',
    	fontSize: 15,
    	padding: 5,
    	marginTop: 0
  	},
  	modaltext: {
  		textAlign: 'center',
    	fontSize: 13,
    	padding: 5
  	},
  	price:{
  		textAlign: 'center',
  		fontWeight: 'bold',
  		fontSize: 15,
  		padding: 5,
  		color: 'green'
  	}
})