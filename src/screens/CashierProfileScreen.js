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


export default function CashierProfileScreen({navigation}) {
	
  const user = {'name': 'Ben', 'id': 1, 'email': 'hugga@gmail.com', 'password': '******'}
  
  const [value, setValue] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');
  
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);
   
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<View style={styles.headerView}>
            <Text style={styles.header} >My Account</Text>
        </View>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
						  setModalVisible(true);
						  setActionTriggered('ACTION_1'); // HERE
		}}
		>
		<View style={{flexDirection: "row", borderColor:'black', borderWidth: 1, marginTop:20, margin:5, borderRadius: 5}}>
			<Icon name="user" size={20} color="black" style={{padding: 10}}/>
			<Text style={{fontSize: 20, padding: 5, marginTop: 1}}>Profile Details</Text>
		</View>
		</TouchableOpacity>
		
		<TouchableOpacity onPress={() => {
						  setModalVisible(true);
						  setActionTriggered('ACTION_2'); // HERE
		}}>
		<View style={{flexDirection: "row", borderColor:'black', borderWidth: 1, marginTop:10, margin:5, borderRadius: 5}}>
			<Icon name="power-off" size={20} color="black" style={{padding: 10}}/>
			<Text style={{fontSize: 20, padding: 5}}>Log Out</Text>
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
			{actionTriggered === 'ACTION_1' ?
							  <View style={styles.modalcontainer}>
							  <View style={styles.modalcard}>
							  <Text style={{fontSize: 20, padding: 5}}>Profile Details</Text>
							  <Text style={styles.modalContent}>Email</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={user.email}
								editable={false}
							  />
							  <Text style={styles.modalContent}>Password</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={user.password}
								editable={false}
							  />
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  setActionTriggered('ACTION_3');
								  }}
							  >
								  <Text style={styles.textStyle}>Manage Profile Details</Text>
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
			actionTriggered === 'ACTION_2' ?
							  <View style={styles.modalcontainer}>
							  <View style={styles.modalcard}>
							  <Text style={{fontSize: 20, padding: 5}}>Are you sure you want to log out?</Text>
							  <Text style={{fontSize: 10, padding: 5, color: 'white'}}>Are you sure you want to log out?</Text>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  navigation.navigate('StartScreen')
									  setModalVisible(!modalVisible)
									  
								  }}
							  >
								  <Text style={styles.textStyle}>Yes</Text>
							  </Pressable>
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  setModalVisible(!modalVisible)
								  }}
							  >
								  <Text style={styles.textStyle}>No</Text>
							  </Pressable>
							  
							  </View>
							  </View>:
			actionTriggered === 'ACTION_3' ?
							  <View style={styles.modalcontainer}>
							  <View style={styles.modalcard}>
							  <Text style={{fontSize: 20, padding: 5}}>Profile Details</Text>
							  <Text style={styles.modalContent}>Email</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={user.email}
							  />
							  <Text style={styles.modalContent}>Password</Text>
							  <TextInput
								style={styles.input}
								onChangeText={onChangeText}
								value={user.password}
							  />
							  
							  <Pressable
								  style={[styles.button, styles.buttonClose]}
								  onPress={() => {
									  Alert.alert("Profile changes saved!");
									  setModalVisible(!modalVisible);
								  }}
							  >
								  <Text style={styles.textStyle}>Save Profile Details</Text>
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
        </View>
     </SafeAreaView>
  )
}



const styles = StyleSheet.create({
	headerView:{
		backgroundColor: '#414757',
		marginTop: 40,
		alignItems: 'center',
        justifyContent: 'center',
	    padding: 15
 	},
	header: {
		fontSize: 20,
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
});