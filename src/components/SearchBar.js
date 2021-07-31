import { SearchBar } from 'react-native-elements';
import React, { Component } from 'react';

class SearchBarExample extends Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {  
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here To Search For Vouchers..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

export default SearchBarExample