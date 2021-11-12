import React, {useRef, useEffect} from 'react';
import D3Chart from './D3Chart';
import { Dropdown } from 'react-bootstrap';

const ChartWrapper = (props) => {
	const [storedChart, setStoredChart] = React.useState(true);
	const chart = useRef();

	const [genderSelected, setGenderSelected] = React.useState('male');


	useEffect(() => {
		
		if(!chart.current.children || chart.current.children.length === 0) {
			setStoredChart( new D3Chart(chart.current, genderSelected) );
		} else {
			storedChart.update(genderSelected);
		}


	}, [chart, genderSelected])


	const CHART_STYLES = {
		display: 'flex',
		justifyContent: 'center'
	}

	
	return (
		<>
		<Dropdown>
		<Dropdown.Toggle variant='primary' id='dropdown-basic'>
			Please select gender
		</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Item eventKey='male' onClick={() => setGenderSelected('male')}>
				Male
			</Dropdown.Item>
			<Dropdown.Item
				eventKey='female'
				onClick={() => setGenderSelected('female')}
			>
				Female
			</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
		<div id="chart" ref={chart} style={CHART_STYLES}></div>
		</>
	)

}
 
export default ChartWrapper;
