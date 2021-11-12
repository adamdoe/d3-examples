import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const CHART_MARGIN = { top: 20, right: 10, bottom: 100, left: 70 };
const CHART_WIDTH = 800 - CHART_MARGIN.right - CHART_MARGIN.left;
const CHART_HEIGHT = 500 - CHART_MARGIN.top - CHART_MARGIN.bottom;

class D3Map {
	constructor(element) {
		const vis = this;

		var click = function(d) {
			console.log('clicked', this)
			//vis.mexico.attr('fill-opacity', 0.2); // Another update!
			//d3.select('#' + geoID(d)).attr('fill-opacity', 1);
			console.log('d', d)

		};

		var geoID = function(d) {
			//return "c" + d;
			console.log('d', d.target)
			// d.target.attr('red')
		};
		
		vis.fetchUrl = './data/geo-data.json';
		vis.mexico = {};
		vis.color = d3.scaleLinear().domain([0,33]).range(['tan', 'darkgreen']);
		vis.projection = d3.geoMercator();
		vis.projection.scale(1).translate([0, 0]);
		vis.path = d3.geoPath().projection(vis.projection);
		
		d3.json(vis.fetchUrl)
		.then( data => {
			console.log('VIS', vis)
			console.log(data)

			vis.mexico.states = topojson.feature(data, data.objects.MEX_adm1);
			
			// bounds, scale, transform
			// all of mex
			vis.b = vis.path.bounds(vis.mexico.states);

			// Yucatan example
			//vis.b = vis.path.bounds(vis.mexico.states.features[30]);
			vis.s = .95 / Math.max((vis.b[1][0] - vis.b[0][0]) / CHART_WIDTH, (vis.b[1][1] - vis.b[0][1]) / CHART_HEIGHT);
			vis.t = [(CHART_WIDTH - vis.s * (vis.b[1][0] + vis.b[0][0])) / 2, (CHART_HEIGHT - vis.s * (vis.b[1][1] + vis.b[0][1])) / 2];

			vis.projection.scale(vis.s).translate(vis.t);
			
			vis.map = d3.select(element)
				.append('svg')
					.attr('width', CHART_WIDTH + CHART_MARGIN.right + CHART_MARGIN.left )
					.attr('height', CHART_HEIGHT + CHART_MARGIN.top + CHART_MARGIN.bottom )
				.append('g')
					.attr('class', 'boundary')
			
			vis.mexico = vis.map.selectAll('path')
							.data(vis.mexico.states.features)

			vis.mexico.enter()
				.append('path')
				.attr('d', vis.path)
				.attr('fill', function(d,i) {return vis.color(i)})
				.attr('stroke', '#000000')
				.on("click", (d,i)  => {
					console.log('d', d)
					console.log('i', i)
				} )

		})
		.catch( error => { console.log(error) })
		

	}
}

export default D3Map;
