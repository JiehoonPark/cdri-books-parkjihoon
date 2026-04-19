import axios from 'axios';
import { env } from '../config/env';

export const kakaoClient = axios.create({
  baseURL: 'https://dapi.kakao.com',
  timeout: 10_000,
});

kakaoClient.interceptors.request.use((config) => {
  config.headers.set('Authorization', `KakaoAK ${env.KAKAO_REST_API_KEY}`);
  return config;
});
