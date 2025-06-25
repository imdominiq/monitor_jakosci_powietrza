import React, { useEffect, useState } from 'react'
import { HourlyWeatherItem } from './HourlyWeatherItem'

export const HourlyWeatherList = () => {
  const [hourlyData, setHourlyData] = useState([])

  useEffect(() => {
    // ✅ TESTOWE DANE - działają bez backendu
    const mockData = [
      { time: "12:00", icon: "clear", temperature: 24 },
      { time: "13:00", icon: "clouds", temperature: 22 },
      { time: "14:00", icon: "rain", temperature: 20 },
      { time: "15:00", icon: "thunder", temperature: 18 },
      { time: "16:00", icon: "clear", temperature: 21 },
      { time: "17:00", icon: "clouds", temperature: 19 },
      { time: "18:00", icon: "rain", temperature: 18 },
      { time: "19:00", icon: "clouds", temperature: 17 },
      { time: "20:00", icon: "clear", temperature: 16 },
      { time: "21:00", icon: "clear", temperature: 15 },
    ];

    setHourlyData(mockData)

    // ✅ BACKEND – odkomentuj, gdy endpoint będzie gotowy:
    /*
    fetch('/api/hourly')
      .then((res) => res.json())
      .then((data) => setHourlyData(data))
      .catch((err) => console.error("Błąd pobierania danych:", err))
    */
  }, [])

  return (
    <>
      {hourlyData.map((item, index) => (
        <HourlyWeatherItem
          key={index}
          time={item.time}
          icon={item.icon}
          temperature={item.temperature}
        />
      ))}
    </>
      
    
  )
}