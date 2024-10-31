// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import CategoryList from '../components/CategoryList';
import {allCategories} from '../helpers/allCategories'

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
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по категориям"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Button title="Поиск" onPress={handleSearchButtonPress} />
      <CategoryList categories={filteredCategories} onSelect={handleSelectCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
