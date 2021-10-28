import React from 'react';
import ChartWrapper from './ChartWrapper';
import {Dropdown, Container, Row, Navbar, Col} from 'react-bootstrap';


function App() {

	const [genderSelected, setGenderSelected] = React.useState('male')

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
      </Container>
    </div>
  );
}

export default App;
