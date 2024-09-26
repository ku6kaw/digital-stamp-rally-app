import React from 'react';
import { useNavigate } from 'react-router-dom';

// 仮のスタンプラリーデータ
const mockStampRallyData = [
  { id: 1, name: '観光地 a', stayUntil: '10:00', status: 'completed' }, // 完了済み
  { id: 2, name: '観光地 b', stayUntil: '11:00', status: 'current' }, // 現在実施中
  { id: 3, name: '観光地 c', stayUntil: '12:00', status: 'upcoming' }, // 次の目的地
  { id: 4, name: '観光地 d', stayUntil: '13:00', status: 'upcoming' }, // 次の目的地
];

const StampRallyPage: React.FC = () => {
  const navigate = useNavigate();

  // QRコードスキャン画面に遷移する関数
  const handleBoxClick = () => {
    navigate('/qr-scan');
  };

  return (
    <div style={containerStyle}>
      {mockStampRallyData.map((spot, index) => (
        <div key={spot.id}>
          {/* 観光地のボックス */}
          <div style={getSpotStyle(spot.status)} onClick={handleBoxClick}>
            {spot.name}：滞在 {spot.stayUntil} まで
          </div>

          {/* 移動時間と矢印の表示（最後の観光地以外） */}
          {index < mockStampRallyData.length - 1 && (
            <div style={arrowContainerStyle}>
              <span style={moveTimeStyle}>○○分移動</span>
              <span style={arrowStyle}>↓</span> {/* 矢印を表示 */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// スタイル関数: ステータスに応じて色を変える
const getSpotStyle = (status: string): React.CSSProperties => {
  let backgroundColor = '#4CAF50'; // デフォルトは青
  if (status === 'completed') backgroundColor = '#d3d3d3'; // 完了済みはグレー
  if (status === 'current') backgroundColor = '#f44336'; // 現在実施中は赤
  return {
    backgroundColor,
    color: '#fff',
    padding: '20px',
    margin: '10px 0',
    textAlign: 'center',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer', // クリック可能にするためのスタイル
  };
};

// コンテナのスタイル
const containerStyle: React.CSSProperties = {
  width: '300px',
  margin: '0 auto',
  textAlign: 'center',
};

// 移動時間のスタイル
const moveTimeStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#000',
};

// 矢印のスタイル
const arrowStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#000',
  marginTop: '10px',
};

// 移動時間と矢印のコンテナスタイル
const arrowContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px 0',
};

export default StampRallyPage;
