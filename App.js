/**
 * 
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';


const App: () => React$Node = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (searchKeyword.length != 0) {
      searchResults(searchKeyword)
    }
  }, [searchKeyword])

  const resultItem = ({ item }) => {
    if (item) {
      return <View style={{ flexDirection: "row" }}>
        <Image style={styles.resultIcons}
          source={item.pagemap.cse_thumbnail ? { uri: item.pagemap.cse_thumbnail[0].src} : require('./assets/noImageAvailable.png')} />
        <View style={{ marginHorizontal: 20 }}>
          <Text>{item.link}</Text>
          <Text>{item.title}</Text>
          <Text>{item.snippet}</Text>
        </View>
      </View>
    }

  }

  const noSearchResult = () => {
    return <Text style={{ flex: 1, alignSelf: "center", marginTop: 10 }}>
      {"No results found"}
    </Text>
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, margin: 10 }}>

        <Text style={{ alignSelf: 'flex-start', position: 'absolute', color: "#FF8C00" }}>
          {"oh. search"}
        </Text>
        <View style={styles.searchView}>
          <Image style={styles.searchIcons}
            source={require('./assets/search.png')} />
          <TextInput
            style={{ color: "black", fontWeight: "bold" }}
            onChangeText={(text) => {
              setSearchKeyword(text)
            }}
            value={searchKeyword}
          />
          <Image style={styles.searchIcons}
            source={require('./assets/close.png')} />
        </View>

        <FlatList
          data={results}
          renderItem={resultItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={noSearchResult}
        />
      </SafeAreaView>
    </>
  );

  function searchResults(keyword) {
    fetch(
      'https://www.googleapis.com/customsearch/v1?key=AIzaSyDeq72CZovX3DnDbYXo1qNxT7i2m2MFiWw&cx=73513ada48a4e8411&q=' + keyword
      , {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        console.log("Items: " + JSON.stringify(result.items));
        if (result.items) {
          setResults(result.items)
        } else {
          setResults([])
        }

      })
      .catch((error) => {
        console.error(error);
      })
  }
};

const styles = StyleSheet.create({

  searchIcons: {
    width: 20,
    height: 20,
    alignSelf: 'center'
  },
  searchView: {
    borderColor: "grey",
    borderWidth: 3,
    alignSelf: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "50%",
    paddingHorizontal: 10
  },
  resultIcons: {
    width: 60,
    height: 60,
    alignSelf: 'center'
  },
});

export default App;
