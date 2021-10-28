import React, {useRef, useEffect} from 'react';
import D3Chart from './D3Chart';

const ChartWrapper = ({gender}) => {
	const [storedChart, setStoredChart] = React.useState(true);
	const chart = useRef();

	useEffect(() => {
		
		if(!chart.current.children || chart.current.children.length === 0) {
			setStoredChart( new D3Chart(chart.current, gender) );
		} else {
			storedChart.update(gender);
		}


	}, [chart, gender])


	const CHART_STYLES = {
		display: 'flex',
		justifyContent: 'center'
	}

	
	return (
		<div id="chart" ref={chart} style={CHART_STYLES}></div>
	)

}
 
export default ChartWrapper;
