import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ImageGrid = ({ images, onSelect }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <Image source={item} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3} 
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ImageGrid;
