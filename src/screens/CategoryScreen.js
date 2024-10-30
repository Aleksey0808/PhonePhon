import React, { useState } from 'react';
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import ImageGrid from '../components/ImageGrid';
import WallpaperButton from '../components/WallpaperButton';
import { setWallpaper } from '../utils/setWallpaper';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const images = {
    Nature: [require('../../assets/images/nature/1.jpg')],
    Abstract: [require('../../assets/images/abstract/1.jpg')],
    Animals: [require('../../assets/images/animals/1.jpg'), require('../../assets/images/animals/2.jpg')],
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSetWallpaper = async () => {
    if (images[category][selectedImageIndex]) {
      try {
        await setWallpaper(images[category][selectedImageIndex]);
        console.log('Обои успешно установлены');
        setModalVisible(false); 
      } catch (error) {
        console.log('Ошибка при установке обоев:', error);
      }
    }
  };

  const handleSelectImage = (index) => {
      setSelectedImageIndex(index);
      setModalVisible(true);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images[category].length - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < images[category].length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageGrid images={images[category]} onSelect={(index) => handleSelectImage(index)} />
      
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Image source={images[category][selectedImageIndex]} style={styles.image} />
            <View style={styles.navigation}>
              <TouchableOpacity onPress={goToPreviousImage} style={styles.arrowButton}>
                <Text style={styles.arrowText}>◀</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToNextImage} style={styles.arrowButton}>
                <Text style={styles.arrowText}>▶</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSetWallpaper} style={styles.setWallpaperButton}>
              <Text style={styles.buttonText}>Установить как обои</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 30,
    color: 'white',
  },
  setWallpaperButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CategoryScreen;
