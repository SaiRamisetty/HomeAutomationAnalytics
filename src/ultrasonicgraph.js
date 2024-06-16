import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/graphs.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import useTypingEffect from './animations/typing';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Cell,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

const UltrasonicGraph = () => {
  const [sensorData, setSensorData] = useState([]);
  const { typedText, isTypingComplete } = useTypingEffect('Ultrasonic Sensor Data');
  const axisLabelStyle = {
    fill: 'white',
  };
  const getColor = (value) => {
    if (value < 30) {
      return 'red';
    } else if (value >= 30 && value < 50) {
      return 'blue';
    } else {
      return 'green';
    }
  };
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const charts = [
    {
      type: 'LineChart',
      component: (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart key={0} data={sensorData}>
            <XAxis dataKey="time" tick={axisLabelStyle} />
            <YAxis dataKey="distance" tick={axisLabelStyle} />
            <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
            <Tooltip name="Distance" contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
            <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
            <Line type="monotone" dataKey="distance" name='Distance(Line Chart) ' stroke="blue" strokeWidth={1.5} dot={{ stroke: 'white', fill: 'blue', strokeWidth: 2, r: 4 }} />
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
            <YAxis dataKey="distance" tick={axisLabelStyle} />
            <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
            <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
            <Bar dataKey="distance"  name="Distance(BarGraph) ">
              {sensorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.distance)} />
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
          <ScatterChart key={2} data={sensorData}>
          <XAxis dataKey="time" tick={axisLabelStyle} />
          <YAxis dataKey="distance" tick={axisLabelStyle} />
          <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
          <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
          <Scatter name='Distance(ScatterChart) ' data={sensorData} >
            {sensorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.distance)} />
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
            <YAxis dataKey="distance" tick={axisLabelStyle} />
            <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
            <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
            <Area type="monotone" dataKey="distance" name='Distance(AreaChart) ' stroke="blue" fillOpacity={1} fill="url(#color)" />
            <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)"  borderRadius="20px" />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      type : 'Table',
      component: (
        <div className="Chart-container" style={styles}>
          <div className="table-container" style={styles}>
            <table className='tables' style={styles}>
              <thead>
                <tr>
                  <th className="sticky-header">S.No</th>
                  <th className="sticky-header">Timestamp</th>
                  <th className="sticky-header">Distance</th>
                </tr>
              </thead>
              <tbody>
                {sensorData.map((record, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center',color: getColor(record.distance),border:"1px solid white" }}>{index + 1}</td>
                    <td style={{ textAlign: 'center',color: getColor(record.distance),border:"1px solid white" }}>{record.time}</td>
                    <td style={{ textAlign: 'center',color: getColor(record.distance),border:"1px solid white" }}>{record.distance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <ul className='Charts' style={styles}>
            <li className='Li3'>Danger</li>
            <li className='Li2'>Cautious</li>
            <li className='Li'>Safe</li>
          </ul>
        </div>
      )
    }
    // Add other chart types similarly
  ];

  const fetchData = () => {
    axios.get('https://3.108.122.51:5000/ultrasonic') //API endpoint
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const formattedData = response.data.map(record => ({
            time: new Date(record.Timestamp).toLocaleString(),
            distance: parseFloat(record.distance),
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
    const intervalId = setInterval(fetchData, 20000);

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

  useEffect(() =>{
    Aos.init({duration:2000})
  }
  );
  return (
    <div style={{height:'auto'}}>
      <div id="ultrasection">
        <div className='background-ultra'style={styles}>
          <ul className='Charts' style={styles}>
            <li><button className='left-nav'style={styles} onClick={navigateToPrevChart}> &lt; </button></li>
            <li>
              <div className='chartContainerStyle'data-aos="fade-right" style={styles}>
                <h1 className='heading' style={styles} >{typedText}</h1>
                {isTypingComplete && (
                <div className='lineChartStyle' style={styles} data-aos="fade-in">
                  {charts[currentChartIndex].component}
                </div>
                )}
              </div>
            </li>
            <li><button className='right-nav' style={styles} onClick={navigateToNextChart}> &gt; </button></li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default UltrasonicGraph;
