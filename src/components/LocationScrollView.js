import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert, Pressable, FlatList } from 'react-native';

class LocationScrollView extends Component {
   
   state = {
		modalVisible: false,
      names: [
         {'name': 'Tampines', 'id': 1, posterUrl: require("../assets/images/tampines.png"), voucherUrl: require("../assets/images/kfc.png"), 
		 voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")},
		 
		 
         {'name': 'Simei', 'id': 2, posterUrl: require("../assets/images/Simei.png"), voucherUrl: require("../assets/images/kfc.png"), 
		 voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")},
		 
         {'name': 'Bedok', 'id': 3, posterUrl: require("../assets/images/bedok.png"), voucherUrl: require("../assets/images/kfc.png"), 
		 voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")},
		 
         {'name': 'Changi', 'id': 4, posterUrl: require("../assets/images/changi.png"), voucherUrl: require("../assets/images/kfc.png"), 
		 voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")}
      ],
	  
	  selectedItem: {'name': 'Tampines', 'id': 1},
	   tempStr: 'dummy1'
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
		    <Text style = {styles.header}> Stores Around You </Text>
            <ScrollView horizontal={true}>
				{
                  this.state.names.map((item, index) => (
                     <TouchableOpacity key = {item.id} 
							onPress={() => {
                    			this.setModalVisible(true);
			              		this.setSelectedItem(item); 
                  }}>
                    		<Image 
								style = {styles.logo}
								source={item.posterUrl}/>
							<Text style={styles.headline}>{item.name}</Text>
							
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
						<Text style={{fontSize: 20, padding: 5, textAlign: 'center'}}>{this.state.selectedItem.name}</Text>
						<ScrollView>
							{
							  
								 <TouchableOpacity key = {this.state.selectedItem.id} 
										onPress={() => {
											this.setModalVisible(true);
											this.setSelectedItem(this.state.selectedItem.item); 
							  }}>
										<Image 
											style = {styles.innerlogo}
											source={this.state.selectedItem.voucherUrl}/>
										<Image 
											style = {styles.innerlogo}
											source={this.state.selectedItem.voucherUrl2}/>
										<Image 
											style = {styles.innerlogo}
											source={this.state.selectedItem.voucherUrl3}/>
										
									</TouchableOpacity>
							  
							}
						</ScrollView>
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
export default LocationScrollView

const styles = StyleSheet.create ({
	scrollView : {}, 
	mainContainer : {
		marginTop: 10
	}, 
	header: {
		fontSize: 20
	},
    item: {
      padding: 75,
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
		alignItems: 'center'

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
  logo: {
    width: 150,
    height: 150,
	margin: 2,
	borderColor: '#414757',
    borderWidth: 1
  },
   headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0
  },
  innerlogo: {
    width: 300,
    height: 150,
	margin: 2,
	borderColor: '#414757',
    borderWidth: 1
  }
  
})