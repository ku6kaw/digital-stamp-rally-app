import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const TopPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.paper"
      p={2}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ mb: 8 }} // 上に余白を追加
      >
        サービス名
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginClick}
        sx={{ mb: 3, width: '200px', height: '50px', fontSize: '16px', borderRadius: '30px' }} // ボタンの高さや丸みを調整
      >
        ログイン
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={handleRegisterClick}
        sx={{ width: '200px', height: '50px', fontSize: '16px', borderRadius: '30px' }} // 新規登録ボタンも同じく調整
      >
        新規登録
      </Button>
    </Box>
  );
};

export default TopPage;
