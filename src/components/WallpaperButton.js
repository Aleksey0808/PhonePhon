import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WallpaperButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>Установить как обои</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WallpaperButton;
