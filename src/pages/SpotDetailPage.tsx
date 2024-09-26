import React from 'react';

const SpotDetailPage: React.FC = () => {
  return (
    <div style={containerStyle}>
      {/* 詳細紹介エリア */}
      <div style={detailBoxStyle}>
        <p style={detailTextStyle}>
          詳細紹介<br />
          <span style={highlightStyle}>写真や場所</span><br />
          メニュー（飲食店）
        </p>
      </div>

      {/* 口コミリスト */}
      <div style={reviewBoxStyle}>
        <p>口コミ1</p>
        <button style={reportButtonStyle}>通報</button>
      </div>
      <div style={reviewBoxStyle}>
        <p>口コミ2</p>
        <button style={reportButtonStyle}>通報</button>
      </div>

      {/* 口コミを新規で書く */}
      <div style={newReviewBoxStyle}>
        <p>口コミを新規で書く</p>
        <button style={postButtonStyle}>投稿</button>
      </div>
    </div>
  );
};

// スタイル定義
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '50px',
};

const detailBoxStyle: React.CSSProperties = {
  width: '300px',
  height: '150px',
  border: '2px solid #000',
  marginBottom: '20px',
  padding: '10px',
  display: 'inline-block',
};

const detailTextStyle: React.CSSProperties = {
  fontSize: '16px',
};

const highlightStyle: React.CSSProperties = {
  color: 'red',
};

const reviewBoxStyle: React.CSSProperties = {
  width: '300px',
  height: '50px',
  border: '2px solid #000',
  marginBottom: '10px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const reportButtonStyle: React.CSSProperties = {
  backgroundColor: '#b5651d',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
};

const newReviewBoxStyle: React.CSSProperties = {
  width: '300px',
  height: '100px',
  border: '2px solid #000',
  marginTop: '20px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const postButtonStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
};

export default SpotDetailPage;
