import React, { useState } from 'react';

const GenerateRoutePage: React.FC = () => {
  const [startStation, setStartStation] = useState('');
  const [goalStation, setGoalStation] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [requiredTime, setRequiredTime] = useState('');
  const [lunch, setLunch] = useState('なし');

  // 駅と観光地の仮データ
  const stations = ['JR駅', '私鉄駅'];
  const places = ['なし', '観光地1', '観光地2', '観光地3', '観光地4', '観光地5'];

  const handleGenerateRoute = () => {
    if (!startStation || !goalStation || !requiredTime) {
      alert('スタート地点、ゴール地点、所要時間をすべて選択してください');
      return;
    }
    alert(`経路生成中: 出発駅: ${startStation}, 到着駅: ${goalStation}, 回りたい場所: ${selectedPlace}, 所要時間: ${requiredTime}`);
  };

  return (
    <div style={containerStyle}>
      <h1>経路生成</h1>

      <div style={inputGroupStyle}>
        <label>start地点</label>
        <select value={startStation} onChange={(e) => setStartStation(e.target.value)} style={selectStyle}>
          <option value="">2つの駅から選択</option>
          {stations.map((station, index) => (
            <option key={index} value={station}>{station}</option>
          ))}
        </select>
      </div>

      <div style={inputGroupStyle}>
        <label>goal地点</label>
        <select value={goalStation} onChange={(e) => setGoalStation(e.target.value)} style={selectStyle}>
          <option value="">2つの駅から選択</option>
          {stations.map((station, index) => (
            <option key={index} value={station}>{station}</option>
          ))}
        </select>
      </div>

      <div style={inputGroupStyle}>
        <label>回りたい場所</label>
        <select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)} style={selectStyle}>
          <option value="">回りたい場所を選択</option>
          {places.map((place, index) => (
            <option key={index} value={place}>{place}</option>
          ))}
        </select>
      </div>

      <div style={inputGroupStyle}>
        <label>所要時間</label>
        <select value={requiredTime} onChange={(e) => setRequiredTime(e.target.value)} style={selectStyle}>
          <option value="">選択</option>
          <option value="半日">半日</option>
          <option value="1日">1日</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={`${i + 1}時間`}>{`${i + 1}時間`}</option>
          ))}
        </select>
      </div>

      <div style={inputGroupStyle}>
        <label>昼食</label>
        <div>
          <label>
            <input
              type="radio"
              value="あり"
              checked={lunch === 'あり'}
              onChange={() => setLunch('あり')}
            />
            あり
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              value="なし"
              checked={lunch === 'なし'}
              onChange={() => setLunch('なし')}
            />
            なし
          </label>
        </div>
      </div>

      <button onClick={handleGenerateRoute} style={generateButtonStyle}>生成</button>
    </div>
  );
};

// スタイル定義
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '30px',
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const selectStyle: React.CSSProperties = {
  width: '200px',
  padding: '10px',
  fontSize: '16px',
};

const generateButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#ff4444',
  color: '#fff',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
};

export default GenerateRoutePage;
