import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // axiosインスタンス
import { Button, Box, Typography, Container } from '@mui/material';

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
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        height="80vh"  // 高さを調整
        justifyContent="center"  // 中央に配置
      >
        <Typography variant="h4" component="h1" gutterBottom>
          サービス名
        </Typography>

        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          gap={2}  // ボタンの間のスペース
          width="100%"
        >
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={goToFeature1}
            sx={{ mb: 2, padding: '20px', width: '80%', fontSize: '20px' }}
          >
            スタンプラリー
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth
            onClick={goToFeature2}
            sx={{ mb: 2, padding: '20px', width: '80%', fontSize: '20px' }}
          >
            場所紹介
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            fullWidth
            onClick={goToFeature3}
            sx={{ padding: '20px', width: '80%', fontSize: '20px' }}
          >
            過去のスタンプラリー
          </Button>
        </Box>

        <Button 
          variant="outlined" 
          color="error" 
          fullWidth
          onClick={handleLogout}
          sx={{ mt: 4, padding: '10px', width: '60%' }}  // ログアウトボタンに少し余白を追加
        >
          ログアウト
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
