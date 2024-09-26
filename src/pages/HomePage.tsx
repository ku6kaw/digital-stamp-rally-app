import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // axiosインスタンス

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // ログインしているユーザーIDを取得（ここでは仮のユーザーIDを使用）
  const userId = '12345';  // 実際にはログイン情報から取得

  // スタンプラリーページに遷移する処理
  const goToFeature1 = async () => {
    try {
      // バックエンドにユーザーIDを送信し、未完了のスタンプラリーがあるか確認
      const response = await api.post('/api/check_stamp_rally', { userId });

      // バックエンドからのレスポンスに応じてページ遷移
      if (response.data.hasIncompleteStampRally) {
        navigate('/stamp_rally'); // スタンプラリーページに遷移
      } else {
        navigate('/generate_route'); // 経路生成ページに遷移
      }
    } catch (error) {
      console.error('Error checking stamp rally status:', error);
      // エラーハンドリング
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    // ログアウト処理を実装（例：トークンの削除など）
    navigate('/');
  };

  // 他のページへの遷移
  const goToFeature2 = () => {
    navigate('/spots');  // 場所紹介ページへ遷移
  };

  const goToFeature3 = () => {
    navigate('/past_stamp_rally');  // 過去のスタンプラリーページへ遷移
  };

  return (
    <div style={containerStyle}>
      <h1>サービス名</h1>
      <div style={buttonContainerStyle}>
        <button onClick={goToFeature1} style={buttonStyle}>
          スタンプラリー
        </button>
        <button onClick={goToFeature2} style={buttonStyle}>
          場所紹介
        </button>
        <button onClick={goToFeature3} style={buttonStyle}>
          過去のスタンプラリー
        </button>
      </div>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        ログアウト
      </button>
    </div>
  );
};

// スタイル定義
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '50px',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',  // ボタン間のスペース
  marginTop: '30px',
};

const buttonStyle: React.CSSProperties = {
  width: '200px',
  padding: '15px',
  fontSize: '18px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
};

const logoutButtonStyle: React.CSSProperties = {
  marginTop: '30px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default HomePage;
