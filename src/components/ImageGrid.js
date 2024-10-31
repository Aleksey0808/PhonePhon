
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const ImageGrid = ({ images, onSelect, onEndReached, loadingMore }) => {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => onSelect(index)}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={styles.container}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
  },
});

export default ImageGrid;
