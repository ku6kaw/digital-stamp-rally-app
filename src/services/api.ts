import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // 環境変数からAPIのURLを設定
  withCredentials: true,  // クッキーを使うための設定
});

export default api;
