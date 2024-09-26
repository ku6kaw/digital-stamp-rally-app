import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ログインボタン押下時の処理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // ページリロードを防ぐ
    try {
      // バックエンドにログインリクエストを送信
      const response = await axios.post('/api/login', { email, password });

      // ログイン成功時、ホームページにリダイレクト
      if (response.status === 200) {
        navigate('/home');  // ログイン後のページ（仮）に遷移
      }
    } catch (error) {
      // ログイン失敗時の処理
      setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={buttonStyle}>ログイン</button>
      </form>
    </div>
  );
};

const containerStyle: React.CSSProperties = { textAlign: 'center', marginTop: '50px' };
const formStyle: React.CSSProperties = { display: 'inline-block', textAlign: 'left' };
const inputStyle: React.CSSProperties = { display: 'block', margin: '10px 0', padding: '10px', width: '300px' };
const buttonStyle: React.CSSProperties = { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' };

export default LoginPage;
