import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ChartWrapper from './ChartWrapper';
import {Container, Row, Navbar, Col} from 'react-bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <Navbar bg="light">
      <Navbar.Brand>Barchartly</Navbar.Brand>
    </Navbar>
    <Container>
      <Row>
        <Col xs={12}>
          <ChartWrapper />
        </Col>
      </Row>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
