// screens/CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import ImageGrid from '../components/ImageGrid';
import { setWallpaper } from '../utils/setWallpaper';
import { fetchImagesByCategory } from '../utils/pexelsApi';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const fetchedImages = await fetchImagesByCategory(category);
      setImages(fetchedImages);
      setLoading(false);
    };
    loadImages();
  }, [category]);

  const loadMoreImages = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const fetchedImages = await fetchImagesByCategory(category, nextPage);
    setImages((prevImages) => [...prevImages, ...fetchedImages]);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const handleSetWallpaper = async () => {
    if (images[selectedImageIndex]) {
      try {
        await setWallpaper(images[selectedImageIndex]);
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
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <ImageGrid 
        images={images} 
        onSelect={(index) => handleSelectImage(index)} 
        onEndReached={loadMoreImages} 
        loadingMore={loadingMore}
      />
      
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Image source={{ uri: images[selectedImageIndex] }} style={styles.image} />
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
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
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
