import React, { useState } from 'react';
import { View } from 'react-native';
import ImageGrid from '../components/ImageGrid';
import WallpaperButton from '../components/WallpaperButton';
import { setWallpaper } from '../utils/setWallpaper';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const images = {
    Nature: [require('../../assets/images/nature/1.jpg')],
    Abstract: [require('../../assets/images/abstract/1.jpg')],
    Animals: [require('../../assets/images/animals/1.jpg')],
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSetWallpaper = async () => {
    if (selectedImage) {
      try {
        await setWallpaper(selectedImage);
        console.log('Обои успешно установлены');
      } catch (error) {
        console.log('Ошибка при установке обоев:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageGrid images={images[category]} onSelect={setSelectedImage} />
      {selectedImage && <WallpaperButton onPress={handleSetWallpaper} />}
    </View>
  );
};

export default CategoryScreen;
