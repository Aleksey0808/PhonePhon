import React, { useState } from 'react';
import { View } from 'react-native';
import CategoryList from '../components/CategoryList';

const HomeScreen = ({ navigation }) => {
  const categories = ['Nature', 'Abstract', 'Animals'];

  const handleSelectCategory = (category) => {
    navigation.navigate('CategoryScreen', { category });
  };

  return (
    <View>
      <CategoryList categories={categories} onSelect={handleSelectCategory} />
    </View>
  );
};

export default HomeScreen;
