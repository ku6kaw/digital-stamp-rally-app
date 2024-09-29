import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, IconButton } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TempleIcon from '@mui/icons-material/AccountBalance'; // 寺院・神社用アイコン
import RestaurantIcon from '@mui/icons-material/Restaurant'; // 飲食店用アイコン
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'; // 土産屋用アイコン
import TrainIcon from '@mui/icons-material/Train'; // 駅用アイコン
import HomeIcon from '@mui/icons-material/Home'; // ホーム画面用アイコン
import axios from 'axios'; // API呼び出しに使用
import { useUserId } from '../hooks/useUserId'; // useUserIdフックをインポート

const StampRallyPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useUserId();
  const [stampRallyData, setStampRallyData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // スタンプラリー情報をAPIから取得
    const fetchStampRallyDetails = async () => {
      try {
        if (!userId) {
          console.error('ユーザーIDがありません');
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiUrl}/stamp-rally/details`, { user_id: userId });
        if (response.data.exist) {
          const spots = response.data.spots;

          // 最初と最後のスポットを実施済みにする
          if (spots.length > 0) {
            spots[0].status = 1; // 最初のスポットを実施済みに設定
            spots[spots.length - 1].status = 1; // 最後のスポットを実施済みに設定
          }

          setStampRallyData(spots);
        } else {
          console.log("スタンプラリーが見つかりませんでした");
        }
      } catch (error) {
        console.error('スタンプラリー情報の取得に失敗しました:', error);
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    fetchStampRallyDetails(); // コンポーネントのマウント時にデータを取得
  }, [userId]);

  // QRコードスキャン画面に遷移する関数
  const handleBoxClick = () => {
    navigate('/qr-scan');
  };

  // ホームに戻るための関数
  const goToHome = () => {
    navigate('/home');
  };

  // アイコンをspot_typeに基づいて返す関数
  const getIconByType = (spotType: number) => {
    switch (spotType) {
      case 0:
        return <TempleIcon />;
      case 1:
        return <RestaurantIcon />;
      case 2:
        return <ShoppingBagIcon />;
      case 3:
        return <TrainIcon />;
      default:
        return <DirectionsWalkIcon />; // デフォルトのアイコン
    }
  };

  // 10-20分の間でランダムな移動時間を生成する関数
  const getRandomTravelTime = () => {
    return Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // ローディング中はメッセージを表示
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} px={2}>
      {/* ホームボタンを画面左上に配置 */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
        onClick={goToHome}
      >
        <HomeIcon />
      </IconButton>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        スタンプラリー
      </Typography>

      {stampRallyData.length === 0 ? (
        <Typography>未完了のスタンプラリーはありません。</Typography>
      ) : (
        stampRallyData.map((spot, index) => (
          <Box key={spot.id} width="80%" maxWidth="400px" mb={4}>
            <Box display="flex" justifyContent="space-between">
              {/* 観光地名のボックス */}
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: getBackgroundColorByStatus(spot.status),
                  color: spot.status === 1 ? '#A9A9A9' : '#fff',
                  padding: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: '5px 0 0 5px',
                  width: '40%',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleBoxClick}
              >
                {/* spot_typeに基づいたアイコンを表示 */}
                <Avatar sx={{ bgcolor: 'transparent', marginRight: '10px' }}>
                  {getIconByType(spot.spot_type)}
                </Avatar>
                <Typography variant="body2">{spot.spot_name}</Typography>
              </Paper>

              {/* 目安時間のボックス */}
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: spot.status === 1 ? '#efefef' : '#FFFFFF',
                  color: spot.status === 1 ? '#A9A9A9' : '#000',
                  padding: '10px',
                  textAlign: 'center',
                  borderRadius: '0 5px 5px 0',
                  width: '60%',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2">目安時間：{spot.staying_time}分</Typography>
              </Paper>
            </Box>

            {/* 移動時間の表示（最後の観光地以外） */}
            {index < stampRallyData.length - 1 && (
              <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'lightgray', width: 24, height: 24 }}>
                    <DirectionsWalkIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="body2" color="textSecondary">
                    移動 {getRandomTravelTime()} 分
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

// ステータスに応じて背景色を変更
const getBackgroundColorByStatus = (status: number) => {
  if (status === 1) return '#dcdcdc'; // 完了済みはグレー
  if (status === 0) return '#4F7FFF'; // 現在実施中は青
  return '#B4D5FF'; // それ以外は薄青
};

export default StampRallyPage;
