import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useAuth } from '../hooks/useAuth';  // useAuthフックをインポート

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();  // ログイン機能を使うためのuseAuthフックを取得
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL; 
      // 新規登録リクエストを送信
      const response = await axios.post(`${apiUrl}/register`, { name, email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        // トークンを取得し、ログイン処理
        const loginResponse = await axios.post(`${apiUrl}/login`, { email, password }, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (loginResponse.status === 200) {
          login(loginResponse.data.access_token);  // ログイン処理
          navigate('/home');  // ホーム画面に遷移
        }
      }
    } catch (error) {
      setError('登録に失敗しました。入力情報を確認してください。');
    }
  };

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
          新規登録
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="名前"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            color="success" 
            fullWidth
            sx={{ mt: 2 }}
          >
            登録
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
