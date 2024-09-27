import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid, Container, Box, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ListIcon from '@mui/icons-material/ViewList';
import GridOnIcon from '@mui/icons-material/GridView';

// Spotデータの型を定義
interface Spot {
  spot_id: string;
  name: string;
  thumbnail_url: string;
}

// 仮の観光地データ
const mockSpots: Spot[] = [
  {
    spot_id: "101",
    name: "観光地A",
    thumbnail_url: "https://img-www.knt.co.jp/travelguide/kokunai/image/travelguide_018_17.jpg"
  },
  {
    spot_id: "102",
    name: "観光地B",
    thumbnail_url: "https://img01.jalannews.jp/img/2019/02/20221205_kokunairyoko_29.jpg"
  },
  {
    spot_id: "103",
    name: "観光地C",
    thumbnail_url: "https://news.tiiki.jp/data/img/articleContents/number/4813/24845302_s_1671945880.jpeg"
  },
  {
    spot_id: "104",
    name: "観光地D",
    thumbnail_url: "https://www.agoda.com/wp-content/uploads/2020/05/Ohori-Park-lake-what-to-do-in-fukuoka-Japan.jpg"
  },
  {
    spot_id: "105",
    name: "観光地E",
    thumbnail_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMasVncbPsTpjUBuEWJU8_XlxbASR722lndA&s"
  },
  {
    spot_id: "106",
    name: "観光地F",
    thumbnail_url: "https://www.his-j.com/sightseeing/images/top_rank_02.jpg"
  }
];

const SpotListPage: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>(mockSpots);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // 表示モードを管理
  const navigate = useNavigate();

  // 表示モードの切り替え
  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, newViewMode: 'grid' | 'list') => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // 各場所をクリックした時の処理
  const handleSpotClick = (spotId: string) => {
    navigate(`/spot_detail/${spotId}`);
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4" component="h1">
          観光地紹介
        </Typography>

        {/* ビューの切り替えボタン */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <GridOnIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {viewMode === 'grid' ? (
        <Grid container spacing={3} mt={2}>
        {spots.map((spot) => (
          <Grid item xs={6} sm={6} md={6} key={spot.spot_id}> 
            <Card onClick={() => handleSpotClick(spot.spot_id)} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                image={spot.thumbnail_url}
                alt={spot.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {spot.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      ) : (
        <Box mt={2}>
          {spots.map((spot) => (
            <Card
              key={spot.spot_id}
              onClick={() => handleSpotClick(spot.spot_id)}
              sx={{ cursor: 'pointer', mb: 2, display: 'flex', alignItems: 'center' }}
            >
              <CardMedia
                component="img"
                height="80"
                image={spot.thumbnail_url}
                alt={spot.name}
                sx={{ width: 80 }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {spot.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default SpotListPage;
