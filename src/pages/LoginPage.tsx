import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();  // useAuthフックからlogin関数を取得

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL; 
      const response = await axios.post(`${apiUrl}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        login(response.data.access_token);  // ログイン時にトークンを保存
      }
    } catch (error) {
      console.error('ログインに失敗しました', error);
      setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="80vh" 
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
