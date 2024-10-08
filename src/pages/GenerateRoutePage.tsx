import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, MenuItem, Select, Typography, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserId } from '../hooks/useUserId';
import axios from 'axios';

const GenerateRoutePage: React.FC = () => {
  const [startStation, setStartStation] = useState('');
  const [goalStation, setGoalStation] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [hours, setHours] = useState('3');
  const [minutes, setMinutes] = useState('0');
  const [includeLunch, setIncludeLunch] = useState(false); // 昼食を含むかどうかの状態
  const navigate = useNavigate();
  const userId = useUserId();

  // 駅と観光地の仮データ
  const stations = ['JR駅', '私鉄駅'];

  // APIから観光地データを取得する
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/spots_list`);
        if (response.status === 200) {
          setPlaces(response.data.spots_list); // 観光地データをセット
        }
      } catch (error) {
        console.error('観光地データの取得中にエラーが発生しました:', error);
      }
    };
    
    fetchPlaces(); // コンポーネントのマウント時にデータを取得
  }, []);

  const handleGenerateRoute = async () => {
    // 入力チェック
    if (!startStation || !goalStation || !hours || !minutes || !selectedPlace) {
      alert('すべての項目を選択してください');
      return;
    }

    // 所要時間をフォーマットする
    const requiredTime = `${hours}:${minutes}`;

    // APIリクエスト用データの構築
    const requestData = {
      user_id: userId,
      start_station: startStation,
      goal_station: goalStation,
      selected_place: selectedPlace,
      required_time: requiredTime,
      include_lunch: includeLunch,
    };

    try {
      // API呼び出し
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/generate-route`, requestData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // 成功時の処理
      if (response.status === 200) {
        navigate(`/stamp_rally/`); // スタンプラリーページに遷移
      } else {
        alert('経路の生成に失敗しました。');
      }
    } catch (error) {
      console.error('経路生成エラー:', error);
      alert('経路生成に失敗しました。もう一度お試しください。');
    }
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
                onChange={(e) => setSelectedPlace(e.target.value)} // 観光地名をセット
                displayEmpty
                sx={{ height: '56px' }} // フォームの高さを固定
              >
                <MenuItem value=""><em>1つ選択</em></MenuItem>
                <MenuItem value="none">なし</MenuItem>
                {/* 観光地データを動的に表示 */}
                {places.map((place: any, index: number) => (
                  <MenuItem key={index} value={place.spot_name}>
                    {place.spot_name} {/* spot_nameを表示 */}
                  </MenuItem>
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

        {/* 昼食を含むかどうかの選択 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={includeLunch}
              onChange={(e) => setIncludeLunch(e.target.checked)}
              color="primary"
            />
          }
          label="昼食を含む"
        />

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
