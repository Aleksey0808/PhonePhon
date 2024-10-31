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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  button: {
    width: 140,
    margin: 10,
    padding: 14,
    backgroundColor: '#9eaa97',
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CategoryList;
