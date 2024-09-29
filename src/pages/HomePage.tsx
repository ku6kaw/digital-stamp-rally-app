import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // axiosインスタンス
import { Button, Box, Typography, Container, IconButton } from '@mui/material';
import HikingIcon from '@mui/icons-material/Hiking';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DownloadIcon from '@mui/icons-material/Download';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // ログインしているユーザーIDを取得（ここでは仮のユーザーIDを使用）
  const userId = '12345';  // 実際にはログイン情報から取得

  // スタンプラリーページに遷移する処理
  // const goToFeature1 = async () => {
  //   try {
  //     const response = await api.post('/api/check_stamp_rally', { userId });
  //     if (response.data.hasIncompleteStampRally) {
  //       navigate('/stamp_rally'); 
  //     } else {
  //       navigate('/generate_route'); 
  //     }
  //   } catch (error) {
  //     console.error('Error checking stamp rally status:', error);
  //   }
  // };

  const goToFeature1 = () => {
    navigate('/generate_route'); 
  }

  // ログアウト処理
  const handleLogout = () => {
    navigate('/');
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
        サービス名
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
        onClick={handleLogout}
        sx={{ mt: 4, padding: '12px', width: '60%', borderRadius: '12px' }}  // ログアウトボタンに丸みを追加
      >
        ログアウト
      </Button>
    </Container>
  );
};

export default HomePage;
