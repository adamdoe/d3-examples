import React, {useRef, useEffect} from 'react';
import D3ScatterPlot from './D3ScatterPlot';

const ScatterPlotWrapper = ( {data} ) => {

	const [storedChart, setStoredChart] = React.useState(true);
	const scatterPlot = useRef();

	// any side effects?
	useEffect(() => {
		if(!scatterPlot.current.children || scatterPlot.current.children.length === 0) {
			setStoredChart( new D3ScatterPlot( scatterPlot.current, data ) );
		}
	}, [scatterPlot])

	
	return (
		<div id="scatterPlot" ref={scatterPlot} ></div>
	)

}
 
export default ScatterPlotWrapper;
