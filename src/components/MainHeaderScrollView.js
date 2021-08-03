import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../database/firebaseDB.js'

class MainHeaderScrollView extends Component {

	getStoreDatabase() {
		firebase.firestore().collection('vouchers').get()
			.then(querySnapshot => {
				const results = []
				querySnapshot.docs.map(documentSnapshot => results.push(documentSnapshot.data()))
				this.setState({ isLoading: false, storeDatabase: results })
			})
			.catch(err => console.error(err))
	}

	state = {
		modalVisible: false,
		user: { 'email': 'janedoe@gmail.com', 'name': 'Jane Doe', 'userid': '8731' },
		isLoading: true,
		storeDatabase: null,
		selectedItem: { 'voucherName': '', 'voucherDesc': '', 'voucherPrice': '', 'voucherid': '', 'voucherImage': '', 'storeid': '' },
		tempStr: 'dummy1'
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	setSelectedItem(newItem) {
		this.setState({ selectedItem: newItem });
	}
	/* use this to show the path
		initialisePath = (item) =>
			firebase.firestore().collection('vouchers').add({
	
				link: require("../assets/images/mainHeaderScrollView/pottery.jpg"),
				//link: require("../assets/images/mainHeaderScrollView/crab.jpg")
			}
			)
	/**/
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
		const { isLoading, storeDatabase } = this.state

		while (isLoading) {
			this.getStoreDatabase()
			//this.initialisePath();
			return <ActivityIndicator />
		}

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
								source={item.voucherImage} />
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
								source={this.state.selectedItem.voucherImage} />
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