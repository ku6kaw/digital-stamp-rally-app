import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 新規登録ボタン押下時の処理
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const apiUrl = process.env.REACT_APP_API_URL; 
      console.log("apiUrl: ", apiUrl);
      // バックエンドに新規登録リクエストを送信
      const response = await axios.post(`${apiUrl}/register`, { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      // 登録成功時、ログインページへリダイレクト
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      // 登録失敗時の処理
      setError('登録に失敗しました。入力情報を確認してください。');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>新規登録</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
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
        <button type="submit" style={buttonStyle}>登録</button>
      </form>
    </div>
  );
};

// スタイル修正
const containerStyle: React.CSSProperties = { textAlign: 'center', marginTop: '50px' };
const formStyle: React.CSSProperties = { display: 'inline-block', textAlign: 'left' };
const inputStyle: React.CSSProperties = { display: 'block', margin: '10px 0', padding: '10px', width: '300px' };
const buttonStyle: React.CSSProperties = { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' };

export default RegisterPage;
