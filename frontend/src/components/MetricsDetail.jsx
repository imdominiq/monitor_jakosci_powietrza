import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';


const MetricsDetails = () => {
  const [historyData, setHistoryData] = useState([]);
  const scrollContainerRef = useRef(null); // 👈 Ref do scrolla
  const navigate = useNavigate();

  useEffect(() => {
    // MOCK danych historycznych (14 dni)
    setHistoryData([
      { date: '2025-06-03', pm25: 27, pm10: 50 },
      { date: '2025-06-04', pm25: 29, pm10: 52 },
      { date: '2025-06-05', pm25: 30, pm10: 55 },
      { date: '2025-06-06', pm25: 26, pm10: 54 },
      { date: '2025-06-07', pm25: 31, pm10: 53 },
      { date: '2025-06-08', pm25: 28, pm10: 51 },
      { date: '2025-06-09', pm25: 34, pm10: 58 },
      { date: '2025-06-10', pm25: 33, pm10: 59 },
      { date: '2025-06-11', pm25: 32, pm10: 57 },
      { date: '2025-06-12', pm25: 30, pm10: 55 },
      { date: '2025-06-13', pm25: 28, pm10: 60 },
      { date: '2025-06-14', pm25: 35, pm10: 58 },
      { date: '2025-06-15', pm25: 33, pm10: 62 },
      { date: '2025-06-16', pm25: 34, pm10: 60 },
    ]);
  }, []);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // ⏩ Automatycznie scrollujemy na prawo (najnowsze dane)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [historyData]);

  return (
    <div style={{ padding: 40, backgroundColor: '#33143C', margin: 20, borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span
          onClick={handleBackClick}
          style={{
            cursor: 'pointer',
            color: '#fff',
            fontSize: '1.5rem',
            marginRight: 30,
            userSelect: 'none',
          }}
          title="Powrót do dashboard"
        >
          ←
        </span>
        <h2 style={{ color: '#fff', margin: 0 }}>
          Historyczne pomiary PM2.5 oraz PM10
        </h2>
      </div>

      <div
        style={{ overflowX: 'auto', overflowY: 'hidden' }}
        ref={scrollContainerRef} // 👈 Ref do kontenera scrolla
      >
        <div style={{ width: '1500px', height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historyData}
              margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" align= "right" height={36} />
              <Line type="monotone" dataKey="pm25" stroke="#8884d8" name="PM2.5" />
              <Line type="monotone" dataKey="pm10" stroke="#82ca9d" name="PM10" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsDetails;