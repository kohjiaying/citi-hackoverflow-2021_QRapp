import React, { useState, useEffect } from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet,ScrollView,TouchableOpacity,Modal,Alert,Pressable,TextInput  } from 'react-native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBarExample from '../components/SearchBar.js';
import OwnerVoucherScrollView from '../components/OwnerVoucherScrollView.js';

export default function OwnerManageVoucherScreen({navigation}) {
	
  const user = {'name': 'Ben', 'id': 1, 'email': 'hugga@gmail.com', 'password': '******'}	
	
  const [value, setValue] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');
  
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<View style={styles.container}>
			<SearchBarExample />
        </View>
        <TouchableOpacity onPress={() => {
						  setModalVisible(true);
						  setActionTriggered('ACTION_3'); // HERE
		}}
		>
		<View style={{flexDirection: "row", borderColor:'black', borderWidth: 1, marginTop:10, margin:5}}>
			<Icon name="plus" size={20} color="black" style={{padding: 10}}/>
			<Text style={{fontSize: 20, padding: 5, marginTop: 1}}>Add Voucher</Text>
		</View>
		</TouchableOpacity>
		
		<Modal 
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				  setModalVisible(!modalVisible);
				}}
			>
			{/* inside the modal view, depending on the action type do something */}
			{
			actionTriggered === 'ACTION_3' ?
							  <View style={styles.modalcontainer}>
							  <View style={styles.modalcard}>
							  <Text style={{fontSize: 20, padding: 5}}>Voucher Details</Text>
							  <Text style={styles.modalContent}>Name</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={text}
							  />
							  <Text style={styles.modalContent}>Description</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={text}
							  />
							  <Text style={styles.modalContent}>Price</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={text}
							  />
							  <Text style={styles.modalContent}>Terms And Conditions</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={text}
							  />
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  setModalVisible(!modalVisible);
								  }}
							  >
								  <Text style={styles.textStyle}>Upload Image</Text>
							  </Pressable>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  Alert.alert("Voucher created!");
									  setModalVisible(!modalVisible);
								  }}
							  >
								  <Text style={styles.textStyle}>Create Voucher</Text>
							  </Pressable>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  setModalVisible(!modalVisible)
								  }}
							  >
								  <Text style={styles.textStyle}>Close</Text>
							  </Pressable>
							  </View>
							  </View>:
			null}
			</Modal>
			<OwnerVoucherScrollView />
		
     </SafeAreaView>
  )
}



const styles = StyleSheet.create({
	container: {
      marginTop: 30
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
		elevation: 5
	},
	button: {
    alignItems: 'center',
    backgroundColor: '#560CCE',
    padding: 10,
	marginTop: 10,
    },
	buttonClose: {
	  backgroundColor: "#560CCE",
    },
	modalContent: {
		fontSize: 15,
		padding: 5
	},
	input: {
    height: 40,
    marginLeft:4,
    borderWidth: 1,
    padding: 10,
    },
  })