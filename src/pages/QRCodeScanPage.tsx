'use client';
import jsQR from 'jsqr';
import React, { useRef, useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserId } from '../hooks/useUserId';
import { toast, ToastContainer } from 'react-toastify'; // react-toastifyをインポート
import 'react-toastify/dist/ReactToastify.css'; // toastifyのCSSをインポート

const QRCodeScanPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const userId = useUserId(); // useUserIdフックでユーザーIDを取得
  const navigate = useNavigate(); // useNavigateを使用してページ遷移

  useEffect(() => {
    if (userId) {
      startScanning(); // ユーザーIDが取得できたらスキャンを開始
    } else {
      console.error('ユーザーIDが取得できませんでした');
    }
  }, [userId]);

  const startScanning = () => {
    const constraints = {
      video: {
        facingMode: 'environment', // 背面カメラを使用
        width: { ideal: 300 },
        height: { ideal: 300 },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          scanQrCode();
        }
      })
      .catch((err) => {
        console.error('メディアデバイスへのアクセスエラー:', err);
        setError('カメラにアクセスできません');
      });
  };

  const scanQrCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        video.style.display = 'none';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCodeData = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCodeData) {
          const spot_id = qrCodeData.data; // QRコードの内容を取得
  
          // userIdがnullでない場合にpostQrCodeDataを呼び出す
          if (userId) {
            postQrCodeData(userId, spot_id);
          } else {
            console.error('ユーザーIDが見つかりませんでした');
          }
  
          return;
        }
        setTimeout(scanQrCode, 100); // 再帰的にスキャンを繰り返す
      }
    }
  };

  // QRコードの値とユーザーIDをバックエンドに送信する関数
  const postQrCodeData = async (userId: string, spot_id: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/update-stamp`, {
        userId: userId, // ユーザーID
        spotId: spot_id, // QRコードから読み取った値をspotIdとして送信
      });

      if (response.status === 200) {
        const spotName = response.data.spot_name; // APIから観光地名を取得
        console.log('スタンプが正常に更新されました:', spotName);

        // QRコードのデータが送信された後、ポップアップが表示され、それが閉じた後にページ遷移
        toast.success(`${spotName} 到着！`, {
          onClose: () => {
            navigate('/stamp_rally'); // スタンプラリーページに遷移
          },
          autoClose: 3000, // 3秒後に自動的に閉じる
        });
      } else {
        console.error('スタンプの更新に失敗しました');
      }
    } catch (err) {
      console.error('POSTリクエストエラー:', err);
      setError('QRコードデータの送信に失敗しました');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        position: 'relative',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 16px',
          borderRadius: '8px',
          position: 'absolute',
          top: '10%',
          zIndex: 10,
        }}
      >
        スキャンするコードを見つけてください。
      </Typography>
      
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          width: '300px',
          border: 'none',
        }}
      >
        {/* スキャン範囲の角 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '50px',
            width: '50px',
            borderTop: '4px solid white',
            borderLeft: '4px solid white',
            zIndex: 10,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '50px',
            width: '50px',
            borderTop: '4px solid white',
            borderRight: '4px solid white',
            zIndex: 10,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '50px',
            width: '50px',
            borderBottom: '4px solid white',
            borderLeft: '4px solid white',
            zIndex: 10,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: '50px',
            width: '50px',
            borderBottom: '4px solid white',
            borderRight: '4px solid white',
            zIndex: 10,
          }}
        />

        {/* QRコードスキャンのビデオ表示 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '300px',
            width: '300px',
            zIndex: 1,
          }}
        />
        <canvas
          ref={canvasRef}
          width="300"
          height="300"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
      </Box>

      {/* Toastコンポーネントを追加 */}
      <ToastContainer />

      {result && (
        <Typography
          variant="body1"
          sx={{
            position: 'absolute',
            bottom: '10%',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '8px 16px',
            borderRadius: '8px',
          }}
        >
          QRコードの内容: {result}
        </Typography>
      )}

      {error && (
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            bottom: '5%',
            zIndex: 10,
            color: 'red',
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default QRCodeScanPage;
