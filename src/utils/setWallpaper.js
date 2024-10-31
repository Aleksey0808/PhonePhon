import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const setWallpaper = async (imageUri) => {
  console.log('image', imageUri);

  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Разрешение на доступ к медиа-библиотеке не предоставлено');
    return;
  }

  try {
    const fileUri = `${FileSystem.cacheDirectory}wallpaper.jpg`;
    await FileSystem.downloadAsync(imageUri, fileUri);

    const mediaAsset = await MediaLibrary.createAssetAsync(fileUri);

    await MediaLibrary.createAlbumAsync('Wallpapers', mediaAsset, false);
    console.log('Обои установлены');
  } catch (error) {
    console.log('Ошибка при установке обоев:', error);
  }
};
