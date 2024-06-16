import React from 'react';
import UltrasonicGraph from './ultrasonicgraph';
import TemperatureAccordion from './temp_accordion.js';
import Footer from './footer.js';
import AirqualityGraph from './airquality.js';
import AirQualityAccordion from './airfilter_accordion.js';
import NavbarComponent from './navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BulbPage from './blinkled.js';
import TemperatureGraph from './temperature.js';
import UltrasonicAccordion from './ultra_accordion.js';



function App() {
  return (
    <Router>
      <div className="App" >
        <NavbarComponent />
        <Routes>
          <Route path="/" />
          <Route path="/bulb" element={<BulbPage />} />
        </Routes>
        <UltrasonicGraph />
        <UltrasonicAccordion/>
        <TemperatureGraph/>
        <TemperatureAccordion />
        <AirqualityGraph />
        <AirQualityAccordion />
        <Footer />
      </div>
    </Router>
  );
}
export default App;
