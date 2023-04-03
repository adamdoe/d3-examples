import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { geoAlbersUsa } from 'd3-geo';

const CHART_MARGIN = { top: 20, right: 10, bottom: 100, left: 70 };
const CHART_WIDTH = 800 - CHART_MARGIN.right - CHART_MARGIN.left;
const CHART_HEIGHT = 500 - CHART_MARGIN.top - CHART_MARGIN.bottom;


export default class D3ObesityMap {
	constructor(element) {

		let vis = this;
		vis.obesity = {};
		// vis.color = d3.scaleLinear().domain([0,33]).range(['tan', 'darkgreen']);
		vis.fetchUrl = './data/obesity_by_state.json';
		
		// D3 Projection
		vis.projection = geoAlbersUsa();
		
				
		// Define path generator
		vis.projection.scale(1).translate([0, 0]);
		vis.path = d3.geoPath().projection(vis.projection);

		d3.json(vis.fetchUrl)
		.then( data => {
			console.log('VIS', vis)
			console.log('DATA', data)

			vis.obesity.states = topojson.feature(data, data.objects.National_Obesity_By_State);

			console.log('OB STATE', vis.obesity.states)
			
			// bounds, scale, transform
			// all states
			vis.b = vis.path.bounds(vis.obesity.states);
			vis.s = .95 / Math.max((vis.b[1][0] - vis.b[0][0]) / CHART_WIDTH, (vis.b[1][1] - vis.b[0][1]) / CHART_HEIGHT);
			vis.t = [(CHART_WIDTH - vis.s * (vis.b[1][0] + vis.b[0][0])) / 2, (CHART_HEIGHT - vis.s * (vis.b[1][1] + vis.b[0][1])) / 2];
			
			vis.projection.scale(vis.s);
			vis.projection.translate(vis.t)

			vis.map = d3.select(element)
				.append('svg')
					.attr('width', CHART_WIDTH + CHART_MARGIN.right + CHART_MARGIN.left )
					.attr('height', CHART_HEIGHT + CHART_MARGIN.top + CHART_MARGIN.bottom )
				.append('g')
					.attr('class', 'boundary')
			
			vis.obesity = vis.map.selectAll('path')
							.data(vis.obesity.states.features)

			vis.obesity.enter()
				.append('path')
				.attr('d', vis.path)
				.attr('class', (d) => d.properties.NAME)
				.attr('style', 'cursor: pointer')
				.attr('fill', '')
				.attr('stroke', '#ffffff')

		})
	}

}
