import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

// 仮のスタンプラリーデータ
const mockStampRallyData = [
  { id: 1, name: '観光地A', stayUntil: '11:00', status: 'completed' },
  { id: 2, name: '観光地B', stayUntil: '12:00', status: 'current' },
  { id: 3, name: '観光地C', stayUntil: '14:00', status: 'upcoming' },
  { id: 4, name: '観光地D', stayUntil: '15:00', status: 'upcoming' },
];

const StampRallyPage: React.FC = () => {
  const navigate = useNavigate();

  // QRコードスキャン画面に遷移する関数
  const handleBoxClick = () => {
    navigate('/qr-scan');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} px={2}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: '40px', // 下に20pxの余白を追加
          textAlign: 'center',
        }}
      >スタンプラリー
      </Typography>

      {mockStampRallyData.map((spot, index) => (
        <Box key={spot.id} width="80%" maxWidth="400px" mb={4}>
        <Box display="flex" justifyContent="space-between">
          {/* 観光地名のボックス */}
          <Paper
            elevation={3}
            sx={{
              backgroundColor: spot.status === 'completed' ? '#dcdcdc' : getBackgroundColor(spot.status), // 実施済みの観光地に薄いグレーを適用
              color: spot.status === 'completed' ? '#A9A9A9' : '#fff',
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              borderRadius: '5px 0 0 5px', // 左側のみ角を丸く
              width: '40%',
              height: '60px', // 縦幅を広げる
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleBoxClick}
          >
            <Typography variant="body2">{spot.name}</Typography>
          </Paper>
      
          {/* 目安時間のボックス */}
          <Paper
            elevation={3}
            sx={{
              backgroundColor: spot.status === 'completed' ? '#efefef' : '#FFFFFF',
              color: spot.status === 'completed' ? '#A9A9A9' : '#000',
              padding: '10px',
              textAlign: 'center',
              borderRadius: '0 5px 5px 0', // 右側のみ角を丸く
              width: '60%',
              height: '60px', // 縦幅を広げる
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleBoxClick}
          >
            <Typography variant="body2">目安時間：{spot.stayUntil}まで</Typography>
          </Paper>
        </Box>
      
        {/* 移動時間と矢印の表示（最後の観光地以外） */}
        {index < mockStampRallyData.length - 1 && (
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
              <Avatar sx={{ bgcolor: 'lightgray', width: 24, height: 24 }}>
                <DirectionsWalkIcon fontSize="small" />
              </Avatar>
              <Typography variant="body2" color="textSecondary">移動 ○○分</Typography>
            </Box>
          </Box>
        )}
      </Box>
      
      ))}
    </Box>
  );
};

// 背景色をステータスに応じて変更
const getBackgroundColor = (status: string) => {
  if (status === 'completed') return '#d3d3d3'; // 完了済みはグレー
  if (status === 'current') return '#4F7FFF'; // 現在実施中は青
  return '#B4D5FF'; // 次の目的地は薄青
};

export default StampRallyPage;
