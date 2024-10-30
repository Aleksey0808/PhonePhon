import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Asset from 'expo-asset';

export const setWallpaper = async (image) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Разрешение не предоставлено');
    return;
  }

  try {
    const asset = await Asset.loadAsync(image);

    const mediaAsset = await MediaLibrary.createAssetAsync(asset.localUri);
    await MediaLibrary.createAlbumAsync('Wallpapers', mediaAsset, false);
    console.log('Обои установлены');
  } catch (error) {
    console.log('Ошибка при установке обоев:', error);
  }
};
