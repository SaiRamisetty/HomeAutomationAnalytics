import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/graphs.css';
import radialstyle from './styles/radialbar.css';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    Cell,
    ReferenceLine,
    RadialBarChart,RadialBar,
    ResponsiveContainer
  } from 'recharts';
const TemperatureGraph = () => {
    const [sensorData, setSensorData] = useState([]);
    const axisLabelStyle = {
      fill: 'white',
    };
    const getColor = (temperature) => {
      if (temperature < 30) return 'green';
      if (temperature >= 31 && temperature <= 42) return 'blue';
      return 'red';
    };
    const getState = (temperature) => {
      if (temperature < 30) return 'Normal';
      if (temperature >= 31 && temperature <= 42) return 'Moderate';
      return 'Unhealthy';
    };
    const [currentChartIndex, setCurrentChartIndex] = useState(0);
    const charts = [
      {
        type: 'LineChart',
        component: (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart key={0}  data={sensorData}>
              <XAxis dataKey="time" tick={axisLabelStyle} />
              <YAxis dataKey="temperature" domain={[0,80]} tick={axisLabelStyle} />
              <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
              <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
              <Line type="monotone" dataKey="temperature" name='Temperature - Line Chart' stroke="blue" strokeWidth={1.5} dot={{ stroke: 'white', fill: 'blue', strokeWidth: 2, r: 4 }} />
              <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)"  borderRadius="20px" />
              <ReferenceLine x="time" stroke="red"  />
            </LineChart>
          </ResponsiveContainer>
        ),
      },
      {
        type: 'BarChart',
        component: (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart key={1}  data={sensorData}>
              <XAxis dataKey="time" tick={axisLabelStyle} />
              <YAxis dataKey="temperature" domain={[0,80]} tick={axisLabelStyle} />
              <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
              <Tooltip wrapperStyle={{ width: '30%', backgroundColor: '#ccc',borderRadius:'50px',border:'none' }} formatter={(value, name) => (name === "temperature") ? `${value}°C` : value} />
              <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="temperature" stroke="#000000" strokeWidth={1}>
                      {sensorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getColor(entry.temperature)} />
                      ))}
              </Bar>
              <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)"  borderRadius="20px" />
            </BarChart>
          </ResponsiveContainer>
        ),
      },
      {
        type: 'ScatterChart',
        component: (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart key={2} data={sensorData} >
              <XAxis dataKey="time" tick={axisLabelStyle} />
              <YAxis dataKey="temperature" domain={[0,80]} tick={axisLabelStyle} />
              <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
              <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
              <Scatter name='Temperature - Scatter Chart' data={sensorData}>
              {sensorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getColor(entry.temperature)} />
                      ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ),
      },
      {
        type: 'AreaChart',
        component: (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart key={3}  data={sensorData}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="blue" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="blue" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={axisLabelStyle} />
              <YAxis dataKey="temperature" domain={[0,80]} tick={axisLabelStyle} />
              <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
              <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
              <Area type="monotone" dataKey="temperature" name='Temperature-Area Chart' stroke="blue" fillOpacity={1} fill="url(#color)"/>
              <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)"  borderRadius="20px" />
            </AreaChart>
          </ResponsiveContainer>
        ),
      },
      {
        type : 'Table',
        component: (
          <div className="chart-Container" style={styles} >
            <div className="table-container" style={styles}>
              <table className='tables' style={styles}>
                <thead>
                  <tr>
                    <th className="sticky-header">S.No</th>
                    <th className="sticky-header">Timestamp</th>
                    <th className="sticky-header">Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((record, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center',color: getColor(record.temperature),border:"1px solid white" }}>{index + 1}</td>
                      <td style={{ textAlign: 'center',color: getColor(record.temperature),border:"1px solid white" }}>{record.time}</td>
                      <td style={{ textAlign: 'center',color: getColor(record.temperature),border:"1px solid white" }}>{record.temperature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br></br>
            <ul className='Charts' style={styles}>
              <li className='Li3'>Normal</li>
              <li className='Li2'>Moderate</li>
              <li className='Li'>Unhealthy</li>
            </ul>
          </div>
        )
      },
      
      {
        type : 'RadialBarChart',
        component : (
          <div className='chartContainer' style={radialstyle}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart   innerRadius={0} outerRadius={180} barSize={50} data={sensorData}>
                  <RadialBar
                    minAngle={15}
                    stroke="rgba(0,0,0,0.4)"
                    clockWise
                    dataKey="temperature"
                    startAngle={0} 
                    endAngle={360}
                  >
                    {sensorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.temperature)} />
                      ))}
                </RadialBar>
                <Tooltip
                  // formatter={(value) => [`${value}ɥg/m³`, 'Airquality']}
                  formatter={(value, name) => {
                    if (name === 'temperature') {
                      const state = getState(value);
                      return [`Temperature: ${value}℃ | State: ${state}`];
                    }
                  }}
                  labelFormatter={(value) => ''}
                  
              />
                </RadialBarChart>
                <div>
                  <ul className='charts2' style={radialstyle}>
                    <li className='Li3'>Normal</li>
                    <li className='Li2'>Moderate</li>
                    <li className='Li'>Unhealthy</li>
                  </ul>
                </div>
              </ResponsiveContainer>
          </div>
        ),
      }
      // Add other chart types similarly
    ];
    const fetchData = () => {
      axios.get('https://13.127.245.235/temperature') //API endpoint
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const formattedData = response.data.map(record => ({
              time: new Date(record.Timestamp).toLocaleString(),
              temperature: parseFloat(record.temperature),
            }));
            
            console.log('Formatted data for chart:', formattedData);
            setSensorData(formattedData);
          } else {
            console.error('Invalid data structure received from Flask - empty or not an array:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
  
    useEffect(() => {
      // Initial fetch
      fetchData();
  
      // Fetch data every 10 seconds (adjust the interval as needed)
      const intervalId = setInterval(fetchData, 10000);
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, []);
    const navigateToNextChart = () => {
      const nextIndex = (currentChartIndex + 1) % charts.length;
      setCurrentChartIndex(nextIndex);
    };
  
    const navigateToPrevChart = () => {
      const prevIndex = (currentChartIndex - 1 + charts.length) % charts.length;
      setCurrentChartIndex(prevIndex);
    };

    return(
      <div id="tempsection">
        <div className='background-temp'style={styles}>
          <ul className='Charts' style={styles}>
            <li><button className='left-nav'style={styles} onClick={navigateToPrevChart}> &lt; </button></li>
            <li>
              <div className='chartContainerStyle'data-aos="fade-right" style={styles}>
                <h1 style={styles} className='heading' data-aos="fade-up">Temperature Sensor Data</h1>
                <div className='lineChartStyle' style={styles} data-aos="fade-in">
                  {charts[currentChartIndex].component}
                </div>
              </div>
            </li>
            <li><button className='right-nav' style={styles} onClick={navigateToNextChart}> &gt; </button></li>
          </ul>
        </div>
      </div>
    )
};

export default TemperatureGraph;