import React, { useEffect, useState } from 'react';
import ChartWrapper from './Components/Chart/ChartWrapper';
import ScatterPlotWrapper from './Components/ScatterPlot/ScatterPlotWrapper';
import Map from './Components/Map/MapWrapper';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Navbar, Col, Nav } from 'react-bootstrap';

function App() {
	// TODO: move scatterplot data eventually
	const [scatterPlotData, setScatterPlotData] = useState(null);

	// TODO: move scatterplot data eventually
	useEffect(() => {
		fetch('./data/children.json')
			.then((res) => res.json())
			.then((data) => setScatterPlotData(data))
			.catch((error) => console.log(error));
	}, []);

	console.log('Scatter Plot Data', scatterPlotData);

	return (
		<div className='App'>
			<Router>
				<Navbar bg='light' expanded='false' expand='false'>
					<Container>
						<Row>
							<Col xs={12}>
								<div className='d-flex flex-nowrap justify-content-between'>
									<Nav.Link as={Link} to='/'>
										<Navbar.Brand> DavaViz Examples </Navbar.Brand>
									</Nav.Link>
									<Nav.Link as={Link} to='/bar-chart'>
										Bar Chart
									</Nav.Link>
									<Nav.Link as={Link} to='/scatter-plot'>
										Scatter Plot
									</Nav.Link>
									<Nav.Link as={Link} to='/map'>
										Map
									</Nav.Link>
								</div>
							</Col>
						</Row>
					</Container>
				</Navbar>

				<Container>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/bar-chart' element={<ChartWrapper />} />
						<Route path='/scatter-plot' element={<ScatterPlotWrapper data={scatterPlotData} />} />
						<Route path='/map' element={<Map />} />
						<Route
							render={function () {
								return <p>Not found</p>;
							}}
						/>
					</Routes>
				</Container>
			</Router>
		</div>
	);
}

export default App;
