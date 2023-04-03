import React, { useRef, useState, useEffect } from 'react';
import D3ObesityMap from './D3ObesityMap';

const ObesityMap = (props) => {
	const [storedMap, setStoredMap] = useState();
	const mapObesity = useRef();

	useEffect(() => {
		
		if(!mapObesity.current.children || mapObesity.current.children.length === 0) {
			setStoredMap( new D3ObesityMap(mapObesity.current) );
		} else {

		}
	}, [mapObesity])

	return ( 
		<div id='mapObesity' ref={mapObesity}></div>
	 );
}
 
export default ObesityMap;
