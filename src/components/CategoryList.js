import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const CategoryList = ({ categories, onSelect }) => (
  <View style={styles.container}>
    {categories.map((category) => (
      <TouchableOpacity key={category} onPress={() => onSelect(category)} style={styles.button}>
        <Text style={styles.text}>{category}</Text>
      </TouchableOpacity>
    ))}
  </View>
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
