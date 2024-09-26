import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 仮の場所データ
const mockSpots = [
  { id: 1, name: 'かくかくしかじか1', thumbnail: 'thumbnail1.jpg' },
  { id: 2, name: 'かくかくしかじか2', thumbnail: 'thumbnail2.jpg' },
  { id: 3, name: 'かくかくしかじか3', thumbnail: 'thumbnail3.jpg' },
];

const SpotListPage: React.FC = () => {
  const [spots, setSpots] = useState(mockSpots); // 初期データとして仮のデータをセット
  const navigate = useNavigate();

  // 各場所をクリックした時の処理
  const handleSpotClick = (spotId: number) => {
    navigate(`/spot_detail/${spotId}`);
  };

  return (
    <div style={containerStyle}>
      <h1>場所紹介</h1>
      <ul style={listStyle}>
        {spots.map((spot) => (
          <li key={spot.id} style={listItemStyle} onClick={() => handleSpotClick(spot.id)}>
            <img src={spot.thumbnail} alt={spot.name} style={thumbnailStyle} />
            <span>{spot.name}</span>
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

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  borderBottom: '1px solid #ccc',
};

const thumbnailStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
};

export default SpotListPage;
