import React, { useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GenerateRoutePage: React.FC = () => {
  const [startStation, setStartStation] = useState('');
  const [goalStation, setGoalStation] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [hours, setHours] = useState('3');
  const [minutes, setMinutes] = useState('0');

  const navigate = useNavigate();

  // 駅と観光地の仮データ
  const stations = ['JR駅', '私鉄駅'];
  const places = ['観光地1', '観光地2', '観光地3', '観光地4', '観光地5'];

  const handleGenerateRoute = () => {
    if (!startStation || !goalStation || !hours || !minutes) {
      alert('すべての項目を選択してください');
      return;
    }
    navigate('/stamp_rally');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#f2f2f7', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        width="100%"
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          スタンプラリー作成
        </Typography>

        {/* 出発 */}
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                backgroundColor: '#FF914D', 
                color: '#fff', 
                textAlign: 'center', 
                height: '56px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}
            >
              出発
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth sx={{ height: '56px' }}>
              <Select
                value={startStation}
                onChange={(e) => setStartStation(e.target.value)}
                displayEmpty
                sx={{ height: '56px' }} // フォームの高さを固定
              >
                <MenuItem value=""><em>駅を選択</em></MenuItem>
                {stations.map((station, index) => (
                  <MenuItem key={index} value={station}>{station}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 到着 */}
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                backgroundColor: '#FF914D', 
                color: '#fff', 
                textAlign: 'center', 
                height: '56px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              到着
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth sx={{ height: '56px' }}>
              <Select
                value={goalStation}
                onChange={(e) => setGoalStation(e.target.value)}
                displayEmpty
                sx={{ height: '56px' }} // フォームの高さを固定
              >
                <MenuItem value=""><em>駅を選択</em></MenuItem>
                {stations.map((station, index) => (
                  <MenuItem key={index} value={station}>{station}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 観光地 */}
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                backgroundColor: '#42A5F5', 
                color: '#fff', 
                textAlign: 'center', 
                height: '56px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              観光地
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth sx={{ height: '56px' }}>
              <Select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                displayEmpty
                sx={{ height: '56px' }} // フォームの高さを固定
              >
                <MenuItem value=""><em>1つ選択</em></MenuItem>
                {places.map((place, index) => (
                  <MenuItem key={index} value={place}>{place}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 所要時間 */}
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                backgroundColor: '#66BB6A', 
                color: '#fff', 
                textAlign: 'center', 
                height: '56px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              所要時間
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ height: '56px' }}>
                  <Select
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    displayEmpty
                    sx={{ height: '56px' }} // フォームの高さを固定
                  >
                    {Array.from({ length: 22 }, (_, i) => i + 3).map((hour) => (
                      <MenuItem key={hour} value={hour.toString()}>
                        {`${hour}時間`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ height: '56px' }}>
                  <Select
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    displayEmpty
                    sx={{ height: '56px' }} // フォームの高さを固定
                  >
                    {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                      <MenuItem key={minute} value={minute.toString()}>
                        {`${minute}分`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* 生成ボタン */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#AB47BC',
            color: '#fff',
            width: '50%',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '20px',
          }}
          onClick={handleGenerateRoute}
        >
          生成
        </Button>
      </Box>
    </Container>
  );
};

export default GenerateRoutePage;
