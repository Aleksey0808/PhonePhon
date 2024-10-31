
import axios from 'axios';

const API_KEY = 'SQFUD24Meuq4VlBUfGnRFUlhUGhoeFOREWPBwrPvC1w1RqxSyVsPix2P'; 

export const fetchImagesByCategory = async (category, page = 1) => {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/search`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: category,
        per_page: 10,
        page,
      },
    });

    return response.data.photos
      .filter((photo) => photo.width < photo.height)
      .map((photo) => photo.src.medium);
  } catch (error) {
    console.error('Ошибка загрузки изображений:', error);
    return [];
  }
};
