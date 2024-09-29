import React from 'react';
import { Box, Typography, Button, Paper, TextField, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SpotDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const images = [
    "https://img-www.knt.co.jp/travelguide/kokunai/image/travelguide_018_17.jpg",
    "https://d1d37e9z843vy6.cloudfront.net/jp/images/3770205/e679e9b8a3afe43cb0f61e90ceb82afc9946ea03.jpeg",
    "https://kinarino.k-img.com/system/press_images/001/437/952/ec22e0b4449646eacbdde701e866c8184e0ca94e.jpg?1558607576",
  ];

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      mt={4}
      px={2}
      bgcolor="#f2f2f7" // 背景色をFigmaに合わせる
      height="100vh"
    >
      {/* ヘッダー部分 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" maxWidth="400px" mb={2}>
        <IconButton onClick={() => navigate('/spots')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">観光地A</Typography>
      </Box>

      {/* 複数の画像を横スクロールで表示 */}
      <Paper elevation={3} sx={{ width: '100%', maxWidth: '400px', padding: '16px', mb: 3 }}>
        <Box 
          sx={{
            display: 'flex',
            overflowX: 'scroll',
            '&::-webkit-scrollbar': { display: 'none' }, // スクロールバーを非表示
          }}
        >
          {images.map((image, index) => (
            <Box
              component="img"
              key={index}
              src={image}
              alt={`観光地の写真${index + 1}`}
              sx={{ 
                width: '300px', 
                height: '200px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                mr: 2 // 画像間の余白を追加
              }}
            />
          ))}
        </Box>
        <Box mt={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOnIcon color="action" />
            <Typography variant="body1" sx={{ ml: 1 }}>住所</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <AccessTimeIcon color="action" />
            <Typography variant="body1" sx={{ ml: 1 }}>営業時間</Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>観光地紹介</Typography>
          <Typography variant="body2" color="text.secondary">~~~~~~</Typography>
        </Box>
      </Paper>

      {/* 口コミの入力ボックス */}
      <Paper elevation={1} sx={{ width: '100%', maxWidth: '400px', p: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="口コミを書く"
          variant="outlined"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        <Button fullWidth variant="contained" color="primary">投稿</Button>
      </Paper>

      {/* 口コミリスト */}
      <Paper elevation={1} sx={{ width: '100%', maxWidth: '400px', p: 2, mb: 2 }}>
        <Typography variant="body2">名前 xxxx/xx/xx (投稿日)</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>とても綺麗でした！</Typography>
        <Button variant="outlined" color="error" size="small" sx={{ mt: 1 }}>通報</Button>
      </Paper>
      <Paper elevation={1} sx={{ width: '100%', maxWidth: '400px', p: 2, mb: 2 }}>
        <Typography variant="body2">名前 xxxx/xx/xx (投稿日)</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>とても綺麗でした！</Typography>
        <Button variant="outlined" color="error" size="small" sx={{ mt: 1 }}>通報</Button>
      </Paper>
      
      {/* 他の口コミの表示 */}
      <Paper elevation={1} sx={{ width: '100%', maxWidth: '400px', p: 2, mb: 2 }}>
        <Typography variant="body2">名前 xxxx/xx/xx (投稿日)</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>とても綺麗でした！</Typography>
        <Button variant="outlined" color="error" size="small" sx={{ mt: 1 }}>通報</Button>
      </Paper>
    </Box>
  );
};

export default SpotDetailPage;
