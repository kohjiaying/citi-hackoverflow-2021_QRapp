import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';

class CategoryScrollView extends Component {
   
   state = {
      modalVisible: false,
      names: [
         {'name': 'Food', 'id': 1, posterUrl: require("../assets/images/food_category.jpg"), voucherUrl: require("../assets/images/kfc.png"), 
      voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")},
         {'name': 'Drinks', 'id': 2, posterUrl: require("../assets/images/drinks_category.jpg"), voucherUrl: require("../assets/images/kfc.png"), 
      voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")},
         {'name': 'Fashion', 'id': 3, posterUrl: require("../assets/images/fashion_category.jpg"), voucherUrl: require("../assets/images/kfc.png"), 
      voucherUrl2: require("../assets/images/giant.png"),voucherUrl3: require("../assets/images/popular.png")}
      ],
      selectedItem: {'name': 'Food', 'id': 1},
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
		    <Text style = {styles.header}> Browse by Category </Text>
            <ScrollView horizontal={true}>
				{
               this.state.names.map((item, index) => (
                  <TouchableOpacity key = {item.id} 
                     style = {styles.item} 
                     onPress={() => {
                             this.setModalVisible(true);
                             this.setSelectedItem(item); 
                     }}>
                     <Image 
                        style={styles.img}
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
                     <Text style={styles.modalheadline}>{this.state.selectedItem.name}</Text>
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
export default CategoryScrollView

const styles = StyleSheet.create ({
   scrollView : {}, 
   mainContainer : {
      marginTop: 10
   }, 
   header: {
      fontSize: 20,
      fontWeight: 'bold'
   },
    item: {
         borderColor: '#414757',
         borderWidth: 0,
         borderRadius: 3,
         margin: 3,
        backgroundColor: '#560CCE'
      },
      headline: {
         fontSize: 18,
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
        width: 150,
        height: 150,
      borderColor: '#414757',
      borderWidth: 1,
      borderRadius: 5
     },
     modalimg: {
        width: '100%',
        height: 150,
        borderWidth: 0
     },
      modalheadline: {
       textAlign: 'center',
       fontWeight: 'bold',
       fontSize: 18,
       padding: 5,
       marginTop: 0
     },
     subtitle: {
        textAlign: 'center',
       fontWeight: 'bold',
       fontSize: 15,
       padding: 5
     },
     modaltext: {
        textAlign: 'center',
       fontSize: 13,
       padding: 5
     },
     innerlogo: {
   		width: 300,
    	height: 150,
		margin: 2,
		borderColor: '#414757',
    	borderWidth: 1
  }
})
