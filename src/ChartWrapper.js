import React, {useRef, useEffect} from 'react';
import D3Chart from './D3Chart';

const ChartWrapper = () => {
	const chart = useRef();

	useEffect(() => {
		console.log('chart', chart.current)
		new D3Chart(chart.current);
	}, [chart])

	return ( 
		<div id="chart" ref={chart}></div>
	 );
}
 
export default ChartWrapper;
