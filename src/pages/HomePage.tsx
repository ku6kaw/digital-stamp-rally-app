import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { Button, Box, Typography, Container } from '@mui/material';
import HikingIcon from '@mui/icons-material/Hiking';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DownloadIcon from '@mui/icons-material/Download';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserId(user.sub.user_id);  // デコードしたuser_idをセット
      console.log('userId:', user.sub.user_id);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  // スタンプラリーページに遷移する処理
  const goToFeature1 = async () => {
    if (!userId) return;  // userIdがセットされていなければ処理を停止

    try {
      const apiUrl = process.env.REACT_APP_API_URL; 
      const response = await api.post(`${apiUrl}/stamp-rally/incomplete`, { user_id: userId });

      if (response.data.exist) {
        navigate('/stamp_rally');
      } else {
        navigate('/generate_route');
      }
    } catch (error) {
      console.error('スタンプラリーの状態確認中にエラーが発生しました:', error);
    }
  };

  // 他のページへの遷移
  const goToFeature2 = () => {
    navigate('/spots'); 
  };

  const goToFeature3 = () => {
    navigate('/past_stamp_rally'); 
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#F2F2F7', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        スタンぷらす
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<HikingIcon />}  // アイコンを追加
          onClick={goToFeature1}
          sx={{
            backgroundColor: '#FF6F61',
            borderRadius: '12px',
            padding: '20px',
            fontSize: '18px',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          スタンプラリー
          <Typography component="span" sx={{ fontSize: '24px' }}>→</Typography>
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<TravelExploreIcon />}  // アイコンを追加
          onClick={goToFeature2}
          sx={{
            borderRadius: '12px',
            padding: '20px',
            fontSize: '18px',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          観光地紹介
          <Typography component="span" sx={{ fontSize: '24px' }}>→</Typography>
        </Button>

        <Button
          variant="contained"
          color="success"
          fullWidth
          startIcon={<DownloadIcon />}  // アイコンを追加
          onClick={goToFeature3}
          sx={{
            borderRadius: '12px',
            padding: '20px',
            fontSize: '18px',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          過去のスタンプラリー
          <Typography component="span" sx={{ fontSize: '24px' }}>→</Typography>
        </Button>
      </Box>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={logout}
        sx={{ mt: 4, padding: '12px', width: '60%', borderRadius: '12px' }}  // ログアウトボタンに丸みを追加
      >
        ログアウト
      </Button>
    </Container>
  );
};

export default HomePage;
