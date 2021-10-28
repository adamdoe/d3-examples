import React, {useRef, useEffect} from 'react';
import D3Chart from './D3Chart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChartWrapper = () => {
	const chart = useRef();

	useEffect(() => {
		console.log('chart', chart.current)
		new D3Chart(chart.current);
	}, [chart])


	const CHART_STYLES = {
		display: 'flex',
		justifyContent: 'center'
	}

	return ( 
		<Container>
			<Row>
				<Col xs={12}>
					<div id="chart" ref={chart} style={CHART_STYLES}></div>
				</Col>
			</Row>
		</Container>
	 );
}
 
export default ChartWrapper;
