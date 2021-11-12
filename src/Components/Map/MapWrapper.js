import React, { useRef, useState, useEffect } from 'react';
import D3Map from './D3Map';

const Map = (props) => {
	const [storedMap, setStoredMap] = useState();
	const map = useRef();

	useEffect(() => {
		
		if(!map.current.children || map.current.children.length === 0) {
			setStoredMap( new D3Map(map.current) );
		} else {

		}


	}, [map])

	return ( 
		<div id='map' ref={map}></div>
	 );
}
 
export default Map;
