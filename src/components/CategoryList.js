import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const CategoryList = ({ categories, onSelect }) => (
  <FlatList
    data={categories}
    keyExtractor={(item) => item} 
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item)} style={styles.button}>
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    )}
    contentContainerStyle={styles.container} 
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default CategoryList;
