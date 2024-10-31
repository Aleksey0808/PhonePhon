import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

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

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        dialogTitle: 'Установить обои',
        UTI: 'public.image', 
      });
    } else {
      console.log('Sharing is not available on this platform');
    }

    console.log('Обои успешно установлены');
  } catch (error) {
    console.log('Ошибка при установке обоев:', error);
  }
};
