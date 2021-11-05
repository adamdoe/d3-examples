import React, {useEffect, useState} from 'react';
import ChartWrapper from './ChartWrapper';
import ScatterPlotWrapper from './ScatterPlotWrapper';
import {Dropdown, Container, Row, Navbar, Col} from 'react-bootstrap';

function App() {

  // TODO: move scatterplot data eventually
  const [scatterPlotData, setScatterPlotData] = useState(null)
	const [genderSelected, setGenderSelected] = React.useState('male')

  // TODO: move scatterplot data eventually
  useEffect(() => {
    fetch('./data/children.json')
      .then(res => res.json() )
      .then( data => setScatterPlotData(data) )
      .catch(error => console.log(error));
  }, [])

  console.log('Scatter Plot Data', scatterPlotData)

  return (
    <div className="App">
      <Navbar bg="light" expanded="false" expand="false">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="d-flex flex-nowrap justify-content-between">
                  <Navbar.Brand>Bar Charts</Navbar.Brand>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Please select gender
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="male" onClick={ () => setGenderSelected('male')}>Male</Dropdown.Item>
                      <Dropdown.Item eventKey="female" onClick={ () => setGenderSelected("female")}>Female</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}>
            <ChartWrapper gender={genderSelected} />
          </Col>
        </Row>
        {scatterPlotData &&
          <Row>
            <Col xs={12}>
              <ScatterPlotWrapper data={scatterPlotData} />
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default App;
