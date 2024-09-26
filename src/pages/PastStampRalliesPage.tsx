import React from 'react';
import { useNavigate } from 'react-router-dom';

// 仮のデータ
const mockStampRallies = [
  { id: 1, date: '2024-09-01', title: 'スタンプラリー 1' },
  { id: 2, date: '2024-08-15', title: 'スタンプラリー 2' },
  { id: 3, date: '2024-07-30', title: 'スタンプラリー 3' },
];

const PastStampRalliesPage: React.FC = () => {
  const navigate = useNavigate();

  // スタンプラリー詳細ページに遷移する関数
  const handleDetailClick = (id: number) => {
    navigate(`/stamp-rally/${id}`); // 詳細ページへのナビゲーション
  };

  return (
    <div style={containerStyle}>
      <h1>過去のスタンプラリー</h1>
      <ul style={listStyle}>
        {mockStampRallies.map((rally) => (
          <li key={rally.id} style={itemStyle} onClick={() => handleDetailClick(rally.id)}>
            {rally.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

// スタイル
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '50px',
};

const listStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
};

const itemStyle: React.CSSProperties = {
  padding: '10px 20px',
  margin: '10px 0',
  backgroundColor: '#4682B4',
  color: '#fff',
  cursor: 'pointer',
  borderRadius: '5px',
};

export default PastStampRalliesPage;
