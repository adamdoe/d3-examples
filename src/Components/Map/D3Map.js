import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const CHART_MARGIN = { top: 20, right: 10, bottom: 100, left: 70 };
const CHART_WIDTH = 800 - CHART_MARGIN.right - CHART_MARGIN.left;
const CHART_HEIGHT = 500 - CHART_MARGIN.top - CHART_MARGIN.bottom;

class D3Map {
	constructor(element) {
		const vis = this;

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
				.attr('style', 'cursor: pointer')
				.attr('id', (d) =>  'c' + d.properties.ID_1 )
				.attr('fill', function(d,i) {return vis.color(i)})
				.attr('stroke', '#000000')
				.on("click", (d,i)  => {
					console.log('d', d)
					d3.selectAll('path').attr('fill-opacity',0.2)
    				d3.select('#c' + i.properties.ID_1).attr('fill-opacity', 1);
				} )

		})
		.catch( error => { console.log(error) })

		d3.csv('./data/cities.csv').then(function(cities) {
			console.log('CITIES', cities)
			var cityPoints = vis.map.selectAll('circle').data(cities); 
			var cityText = vis.map.selectAll('text').data(cities); 
			var radius = d3.scaleLinear().domain([0,100]).range([5,30]);  
	   
			cityPoints.enter() 
				.append('circle') 
				.attr('cx', function(d) {
				   return vis.projection ([d.lon, d.lat])[0]
				})
				.attr('cy', function(d) {
				   return vis.projection ([d.lon, d.lat])[1]
				}) 
				.attr('fill', '#f5f5f5')
				.attr('fill-opacity', '.5')
				.attr('stroke', 'black')
				.attr('r', function(d) {return radius(d.tequila); }) 

	   
			cityText.enter() 
				.append('text') 
				.attr('x', function(d) {
				   return vis.projection([d.lon, d.lat])[0]})
				.attr('y', function(d) {
				   return vis.projection([d.lon, d.lat])[1]}) 
				.attr('dx', 5) 
				.attr('dy', 3) 
				.text(function(d) {return d.name}); 
		  });


		
		vis.update(element);
	}

	update(element) {
		const vis = this;

		setInterval(function(){
			vis.map.selectAll('path').transition()
				.duration(2000)
				.style('fill', function(d) {
					return vis.color(Math.floor((Math.random() * 32) + 1));
				});
		}, 2000);
	}
}

export default D3Map;
