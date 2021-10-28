import * as d3 from 'd3';

export default class D3Chart {
	constructor(element) {

		const CHART_DATA = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
		const CHART_MARGIN = { top: 20, right: 10, bottom: 100, left: 70 };
		const CHART_WIDTH = 800 - CHART_MARGIN.right - CHART_MARGIN.left;
		const CHART_HEIGHT = 500 - CHART_MARGIN.top - CHART_MARGIN.bottom;
		const CHART_XAXIS_LABEL = 'Worlds Tallest Men';
		const CHART_YAXIS_LABEL = 'Height(cm)';

		const svg = d3.select(element)
			.append('svg')
				.attr('width', CHART_WIDTH + CHART_MARGIN.right + CHART_MARGIN.left )
				.attr('height', CHART_HEIGHT + CHART_MARGIN.top + CHART_MARGIN.bottom )
			.append('g')
				.attr('transform', `translate(${CHART_MARGIN.left}, ${CHART_MARGIN.top})`)
		
		d3.json(CHART_DATA).then(data => {
			
			const y = d3.scaleLinear()
				.domain([
					d3.min( data, d => d.height) * 0.95, 
					d3.max( data, d => d.height )
				])
				.range([CHART_HEIGHT, 0]);

			const x = d3.scaleBand()
				.domain(data.map( d => d.name))
				.range([0, CHART_WIDTH])
				.padding(0.2)

			const rects = svg.selectAll('rect')
				.data(data);

			const xAxisCall = d3.axisBottom(x);
			const yAxisCall = d3.axisLeft(y);

			svg.append('g')
				.call(xAxisCall)
				.attr('transform', `translate(0, ${CHART_HEIGHT})`);
			svg.append('g')
				.call(yAxisCall);
			
			svg.append('text')
				.attr('x', CHART_WIDTH / 2)
				.attr('y', CHART_HEIGHT + 40)
				.attr('fill', 'black')
				.attr('text-anchor', 'middle')
				.text(CHART_XAXIS_LABEL);

			svg.append('text')
				.attr("x", -(CHART_HEIGHT / 2))
				.attr("y", -50)
				.attr("text-anchor", "middle")
				.text(CHART_YAXIS_LABEL)
				.attr("transform", "rotate(-90)")
				
			rects.enter()
				.append('rect')
					.attr("x", (d, i) => x(d.name))
					.attr("y", d => y(d.height) )
					.attr("width", x.bandwidth)
					.attr("height", d => CHART_HEIGHT - y(d.height))
					.attr("fill", "gray")
			})
	}
}
