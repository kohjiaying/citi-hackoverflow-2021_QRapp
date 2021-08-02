import React, { useState, useEffect, Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity,Modal,Alert,Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
   
class MyVouchersScrollView extends Component {
	
   state = {
	  modalVisible: false,
      names: [
         {'name': 'Voucher Name', 'id': 'wjhe34', 'voucherid': 'a', 'storeid': 'a10'},
         {'name': 'Susan', 'id': 2, 'voucherid': 'b', 'storeid': 'b20'},
         {'name': 'Robert', 'id': 3, 'voucherid': 'c', 'storeid': 'c30'},
         {'name': 'Mary', 'id': 4, 'voucherid': 'd', 'storeid': 'd40'},
         {'name': 'Daniel', 'id': 5, 'voucherid': 'e', 'storeid': 'e50'},
		 {'name': 'Susan', 'id': 6, 'voucherid': 'b', 'storeid': 'b20'},
         {'name': 'Robert', 'id': 7, 'voucherid': 'c', 'storeid': 'c30'},
         {'name': 'Mary', 'id': 8, 'voucherid': 'd', 'storeid': 'd40'},
         {'name': 'Daniel', 'id': 9, 'voucherid': 'e', 'storeid': 'e50'}
      ],
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
	const str1 = selectedItem.id;
	const str2 = selectedItem.storeid;
	const str3 = selectedItem.voucherid;
	const combi = str1 + str2 + str3;
	this.setState({tempStr: combi});
  }
	
   render() {
	  
      return (
         <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
				{
                  this.state.names.map((item, index) => (
                     <TouchableOpacity key = {item.id} style = {styles.item} 
					   onPress={() => {
						this.setQRvalue(item);
						this.setModalVisible(true);
						this.setSelectedItem(item);
					  }}>
                        <Text style = {styles.itemcontent} >{item.name}</Text>
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
							  <Text style={{fontSize: 20, padding: 5}}>{this.state.selectedItem.name}</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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
	  width: 200,
      height: 250,
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