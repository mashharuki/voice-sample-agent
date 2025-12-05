import axios from 'axios';

const QIITA_API_BASE = 'https://qiita.com/api/v2';

export interface QiitaUser {
  id: string;
  name: string;
  profile_image_url: string;
}

export interface QiitaItem {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  created_at: string;
  user: QiitaUser;
}

export const fetchQiitaItems = async (query: string): Promise<QiitaItem[]> => {
  try {
    const response = await axios.get<QiitaItem[]>(`${QIITA_API_BASE}/items`, {
      params: {
        query: query,
        per_page: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Qiita items:', error);
    throw error;
  }
};
