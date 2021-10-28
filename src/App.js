import logo from './logo.svg';
import './App.css';
import ChartWrapper from './ChartWrapper';

function App() {
  return (
    <div className="App">
        <Container>
          <Row>
            <Col xs={12}>
              <ChartWrapper />
            </Col>
          </Row>
    </div>
  );
}

export default App;
