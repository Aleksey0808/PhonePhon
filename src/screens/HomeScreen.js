// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import CategoryList from '../components/CategoryList';
import {allCategories} from '../helpers/allCategories'
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [filteredCategories, setFilteredCategories] = useState(allCategories);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (category) => {
    navigation.navigate('CategoryScreen', { category });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = allCategories.filter((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSearchButtonPress = () => {
    if (searchQuery.trim()) {
      navigation.navigate('CategoryScreen', { category: searchQuery.trim() });
    }
  };

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
         <LinearGradient
    colors={['#020024', '#09796c', '#0e0a08']} 
    style={styles.container} 
  >
      <TextInput
        style={styles.searchInput}
        placeholder="Search by category"
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSearchButtonPress}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <CategoryList categories={filteredCategories} onSelect={handleSelectCategory} />
    </LinearGradient>
      </ScrollView>
    </SafeAreaView>
      
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    marginTop: 5,
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff'
  },
  button: {
    backgroundColor: '#69b9b0', 
    paddingVertical: 15, 
    paddingHorizontal: 30,
    borderRadius: 25, 
    marginTop: 15, 
    marginBottom: 15,
    shadowColor: '#01fee1', 
    shadowOffset: { width: 2, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    textAlign: 'center', 
  },
});

export default HomeScreen;
