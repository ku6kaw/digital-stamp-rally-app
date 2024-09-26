import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopPage: React.FC = () => {
const navigate = useNavigate();

// ログインボタンを押したときのハンドラ
const handleLoginClick = () => {
    navigate('/login');  // ログインページへ遷移
};

  // 新規登録ボタンを押したときのハンドラ
const handleRegisterClick = () => {
    navigate('/register');  // 新規登録ページへ遷移
};

return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>サービス名</h1>
    <button onClick={handleLoginClick} style={buttonStyle}>
        ログイン
    </button>
    <br />
    <button onClick={handleRegisterClick} style={buttonStyle}>
        新規登録
    </button>
    </div>
);
};

// ボタンのスタイルを指定
const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
};

export default TopPage;
