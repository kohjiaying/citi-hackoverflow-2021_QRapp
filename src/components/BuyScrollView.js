import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';

class ScrollViewExample extends Component {
   
   	state = {
   		modalVisible: false,
      	names: [
         	{ link: require("../assets/images/BuyScrollView/dhaba1376.png"), storeid: '1', storename: 'Dhaba 1376', voucherUrl: require("../assets/images/kfc.png"), 
			voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png") },
			{ link: require("../assets/images/BuyScrollView/ponggolseafood.png"), storeid: '2', storename: 'Ponggol Seafood', voucherUrl: require("../assets/images/kfc.png"), 
			voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png") },
			{ link: require("../assets/images/BuyScrollView/qinde_eggtarts.jpg"), storeid: '3', storename: 'Qinde Egg Tarts & Pastries', voucherUrl: require("../assets/images/kfc.png"), 
			voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png") },
			{ link: require("../assets/images/BuyScrollView/clayable.jpeg"), storeid: '4', storename: 'Clayable Pottery', voucherUrl: require("../assets/images/kfc.png"), 
			voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png") },
			{ link: require("../assets/images/BuyScrollView/subway.jpg"), storeid: '5', storename: 'Subway', voucherUrl: require("../assets/images/kfc.png"), 
			voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png") },
			{ link: require("../assets/images/BuyScrollView/cakeinaction.jpg"), storeid: '6', storename: 'Cake in Action', voucherUrl: require("../assets/images/kfc.png"), 
			voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png") }
      	],
      	selectedItem: {'storeid': '', 'storename': '' },
	    tempStr: 'dummy1'
   	}

    setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}
  	setSelectedItem(newItem) {
    	this.setState({selectedItem: newItem});
  	}
	  
  	onPressButton() {
	  	this.handleAddToCart()
      	alert('Added to cart!')
  	}

render() {
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}} >
			 	<View style={styles.scrollViewContainer}>
				{
                  	this.state.names.map((item, index) => (
                    <TouchableOpacity key = {item.storeid} style = {styles.item}
                     	onPress={() => {
                    		this.setModalVisible(true);
			              	this.setSelectedItem(item); 
                  	}}>
                  		<Image 
							style = {styles.img}
							source={item.link}/>
                        <Text style={styles.headline}>{item.storename}</Text>
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
						<Text style={styles.modalheadline}>{this.state.selectedItem.storename}</Text>
						<ScrollView>
							{
								 <View key = {this.state.selectedItem.id} 
										onPress={() => {
											this.setModalVisible(true);
							  }}>
									<TouchableOpacity>
										<Image 
											style = {styles.innerlogo}
											source={this.state.selectedItem.voucherUrl}/>
										</TouchableOpacity>	

									<TouchableOpacity>											
										<Image 
											style = {styles.innerlogo}
											source={this.state.selectedItem.voucherUrl2}/>
										</TouchableOpacity>

									<TouchableOpacity>
										<Image 
											style = {styles.innerlogo}
											source={this.state.selectedItem.voucherUrl3}/>
										</TouchableOpacity>
										
								</View>
							}
						</ScrollView>
						<TouchableOpacity
							style={styles.buttonClose}
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}>
							<Text style={styles.buttonTextClose}>Close</Text>
						</TouchableOpacity>
						</View>
			          	</View>
				</Modal>
         </View>
      )
   }
}
export default ScrollViewExample

const styles = StyleSheet.create ({
	scrollView : {
	   	height : Dimensions.get('window').height, }, 
	mainContainer : {}, 
	scrollViewContainer : { }, 
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
   		padding: 5,
   		color: "white"
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
		height: 450,
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
  	img: {
        width: Dimensions.get('window').width-7,
        height: 150,
      	borderColor: '#414757',
      	borderWidth: 1,
      	borderRadius: 3,
      	alignItems:'center', 
      	justifyContent:'center',
      	backgroundColor: 'white'
    },
  	modalimg: {
  		width: 350,
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
  	},
  	innerlogo: {
    	width: 300,
    	height: 150,
		margin: 2,
		borderColor: '#414757',
    	borderWidth: 1
  }
})