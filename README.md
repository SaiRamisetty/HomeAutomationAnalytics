# Home Automation and Analytics

## Overview
This project implements a web application for remote home automation and sensor data visualization. The application utilizes modern frontend and backend frameworks to deliver an interactive user experience while efficiently handling data processing and business logic. By leveraging cutting-edge technologies, users can remotely monitor and manage their homes, enhancing convenience and fostering a more data-driven living experience.

## Features
- **Remote Home Automation**: Control appliances and devices remotely via the web application.
- **Sensor Data Visualization**: Visualize real-time sensor data for monitoring various aspects of home environment.
- **Interactive User Experience**: Utilizes React.js to deliver a responsive and engaging user interface.
- **Scalable Backend**: Utilizes Flask framework for robust backend processing and business logic.
- **Persistent Data Storage**: Data is stored using AWS DynamoDB, ensuring scalability and reliability.

## Technologies Used
- Frontend: React.js
- Backend: Flask
- Database: AWS DynamoDB
- Microcontroller: ESP32

## Getting Started
To get started with using or contributing to this project, follow these steps:

1. Clone the repository:
```sh
git clone https://github.com/SaiRamisetty/HomeAutomationAnalytics
```

2. Install dependencies:
```sh
npm install # Install frontend dependencies
pip install -r requirements.txt # Install backend dependencies
```

3. Configure AWS DynamoDB:
- Create a DynamoDB table according to the project's requirements.
- Obtain AWS access key and secret key for authentication.

4. Configure ESP32:
- Flash the microcontroller with the provided firmware.
- Configure the microcontroller to communicate with the web application.

5. Start the application:
```sh
npm start # Start the frontend server
python app.py # Start the backend server
```

6. Access the web application:
Open a web browser and navigate to `http://localhost:3000` to access the application.

## Contributors
- [Sai Ramisetti](https://github.com/SaiRamisetty)

