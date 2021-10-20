import * as d3 from 'd3';

export default class D3Chart {
	constructor(element) {

		const CHART_DATA = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
		const CHART_WIDTH = 800;
		const CHART_HEIGHT = 500;

		const svg = d3.select(element)
			.append('svg')
			.attr('width', CHART_WIDTH)
			.attr('height', CHART_HEIGHT);
		
		d3.json(CHART_DATA).then(data => {
			
			const y = d3.scaleLinear()
				.domain([0, d3.max( data, d => d.height )])
				.range([0, CHART_HEIGHT]);

			const x = d3.scaleBand()
				.domain(data.map( d => d.name))
				.range([0, CHART_WIDTH])
				.padding(0.2)

			const rects = svg.selectAll('rect')
				.data(data);
				
			rects.enter()
				.append('rect')
					.attr("x", (d, i) => x(d.name))
					.attr("y", d => CHART_HEIGHT - y(d.height) )
					.attr("width", x.bandwidth)
					.attr("height", d => y(d.height))
					.attr("fill", "gray")
			})
	}
}
