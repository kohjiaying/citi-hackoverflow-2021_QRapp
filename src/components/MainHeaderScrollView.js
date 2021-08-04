import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../database/firebaseDB.js'

class MainHeaderScrollView extends Component {

	state = {
		modalVisible: false,
		user: { 'email': 'janedoe@gmail.com', 'name': 'Jane Doe', 'userid': '8731' },
		storeDatabase: [
			{ link: require("../assets/images/mainHeaderScrollView/biryani.jpg"), voucherName: '1-For-1 Briyani Set', voucherDesc: 'Satiate your cravings for double the servings', voucherPrice: '600', voucherid: '1000', storeid: '1' },
			{ link: require("../assets/images/mainHeaderScrollView/crab.jpg"), voucherName: '$200 Cash Voucher for Crabs and Seafood', voucherDesc: '$200 cash voucher for crabs and seafood when you dine in or take-away (Ala carte items only)', voucherPrice: '300', voucherid: '2000', storeid: '2' },
			{ link: require("../assets/images/mainHeaderScrollView/eggtart.jpg"), voucherName: 'Box of Eight (8) Portuguese Egg Tart', voucherDesc: 'These special egg tarts consist of a creamy egg custard sitting on a crisp flaky crust, and caramelised on the top.', voucherPrice: '400', voucherid: '4000', storeid: '3' },
			{ link: require("../assets/images/mainHeaderScrollView/pottery.jpg"), voucherName: '50-Minute Pottery Workshop ', voucherDesc: 'Clay making experience on a spinning wheel / wheel throwing.', voucherPrice: '1000', voucherid: '4500', storeid: '4' },
			{ link: require("../assets/images/mainHeaderScrollView/subway.jpg"), voucherName: '$200 Cash Voucher for Crabs and Seafood', voucherDesc: '$200 cash voucher for crabs and seafood when you dine in or take-away (Ala carte items only)', voucherPrice: '300', voucherid: '7000', storeid: '5' },
			{ link: require("../assets/images/mainHeaderScrollView/tart.jpg"), voucherName: '24 Pieces of Fruit / Blueberry Cheese / Eclairs Mini Tarts', voucherDesc: '24 pieces of mini tarts', voucherPrice: '150', voucherid: '1200', storeid: '6' }
		],
		selectedItem: { 'voucherName': '', 'voucherDesc': '', 'voucherPrice': '', 'voucherid': '', 'link': '', 'storeid': '' },
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
							<Text>{item.voucherName}</Text>
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
							<Text style={{ fontSize: 20, padding: 5 }}>{this.state.selectedItem.voucherName}</Text>
							<Image
								style={styles.featuredLogo}
								source={this.state.selectedItem.link} />
							<Text style={{ fontSize: 15, padding: 5 }}>{this.state.selectedItem.voucherPrice}</Text>
							<Text style={{ fontSize: 12, padding: 5 }}>{this.state.selectedItem.voucherDesc}</Text>
							<Text style={styles.space}></Text>
							<TouchableOpacity onPress={() => {
								this.onPressButton(this.state.selectedItem, this.state.user);
								this.setModalVisible(!this.state.modalVisible);
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

const styles = StyleSheet.create({
	scrollView: {},
	mainContainer: {
		marginTop: 10
	},
	header: {
		fontSize: 20
	},
	item: {
		padding: 5,
		width: 300,
		height: 200,
		alignItems: 'center',

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
	},
	featuredLogo: {
		width: 290,
		height: 160,
		borderColor: '#414757',
		borderWidth: 1
	},
})