'use client';
import jsQR from 'jsqr';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'; // Axiosをインポート

const QRCodeScanPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const userId = 1; // 仮のユーザーID

  useEffect(() => {
    startScanning(); // コンポーネントがマウントされたらスキャンを開始
  }, []);

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
          setResult(qrCodeData.data);
          handleSendStampToBackend(qrCodeData.data); // QRコードの内容をバックエンドに送信
          return;
        }
        setTimeout(scanQrCode, 100); // 再帰的にスキャンを繰り返す
      }
    }
  };

  const handleSendStampToBackend = async (spotId: string) => {
    try {
      // バックエンドにユーザーIDと観光地IDを送信する
      const response = await axios.post('/api/update-stamp', {
        userId, // 仮のユーザーID
        spotId, // QRコードから抽出された観光地ID
      });

      if (response.status === 200) {
        console.log('スタンプの更新に成功しました');
      } else {
        console.error('スタンプの更新に失敗しました');
      }
    } catch (error) {
      console.error('バックエンドへの通信エラー:', error);
    }
  };

  return (
    <div>
      {!result && (
        <div className="flex justify-center">
          <div className="relative h-[300px] w-[300px]">
            <video ref={videoRef} autoPlay playsInline className="absolute left-0 top-0 -z-50 h-[300px] w-[300px]" />
            <canvas ref={canvasRef} width="300" height="300" className="absolute left-0 top-0" />
          </div>
        </div>
      )}
      {result && (
        <div className="flex justify-center">
          <p>QRコードの内容: {result}</p>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default QRCodeScanPage;
