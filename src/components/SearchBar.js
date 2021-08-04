import { SearchBar } from 'react-native-elements';
import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../database/firebaseDB.js'

class SearchBarExample extends Component {
  state = {
    search: '',
	user: {'email': 'janedoe@gmail.com' , 'name': 'Jane Doe', 'userid': '8731'},
	isLoading: true,
	cartDatabase: [],
  };

  updateSearch = (search) => {  
    this.setState({ search });
  };
  
  getCartDatabase(){
		firebase.firestore().collection('cart').where('userid', '==', this.state.user.userid).get()
		.then(querySnapshot=> {
			const results = []
			querySnapshot.docs.map(documentSnapshot=> results.push(documentSnapshot.data()))
			this.setState({isLoading: false, cartDatabase: results})})
		.catch(err => console.error(err))
	}

  render() {
    const { search,isLoading  } = this.state;
	
	if (isLoading) {
		 this.getCartDatabase()
	}
	

    return (
	<View style={{flexDirection: "row", backgroundColor:'#414757'}}>
      <SearchBar
	    containerStyle={{width: 320, backgroundColor: '#414757', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
        placeholder="Type Here To Search For Vouchers..."
        onChangeText={this.updateSearch}
        value={search}
      />
	  <TouchableOpacity style={{position: 'absolute', right:0, marginRight:10, padding:5}}>
	  <Icon name="cart-arrow-down" size={50} color="white" />
	  </TouchableOpacity>
	  {this.state.cartDatabase.length > 0 ? (
                  <View
                    style={{     
                      position: 'absolute',
                      backgroundColor: 'red',
                      width: 16,
                      height: 16,
                      borderRadius: 15 / 2,
                      right: 10,
                      top: +10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#FFFFFF",
                        fontSize: 8,
                      }}>
                      {this.state.cartDatabase.length}
                    </Text>
                  </View>
                ) : null}
		
	</View>
    );
  }
}

export default SearchBarExample