import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ログインボタン押下時の処理(仮)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 入力項目が空かどうかを確認
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    // 仮の処理として、入力項目が正しい場合に次のページへ遷移
    navigate('/home');
  };

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const apiUrl = process.env.REACT_APP_API_URL; 
  //     const response = await axios.post(`${apiUrl}/login`, { email, password }, {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     });

  //     if (response.status === 200) {
  //       navigate('/home');
  //     }
  //   } catch (error) {
  //     setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
  //   }
  // };

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" // 中央に配置
        height="80vh" // 高さを80%にして余白を管理
        mt={4}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          ログイン
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="メールアドレス"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="パスワード"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            ログイン
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
