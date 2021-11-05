import * as d3 from 'd3';

const CHART_MARGIN = { top: 20, right: 10, bottom: 100, left: 70 };
const CHART_WIDTH = 800 - CHART_MARGIN.right - CHART_MARGIN.left;
const CHART_HEIGHT = 500 - CHART_MARGIN.top - CHART_MARGIN.bottom;

const CHART_XAXIS_LABEL = 'Worlds Tallest Men';
const CHART_YAXIS_LABEL = 'Height(cm)';

export default class D3ScatterPlot{
	constructor(element, data) {

		console.log('Data WITHIN SCATTER CONSTRUCTOR', data)

		const vis = this;

		vis.svg = d3.select(element)
			.append('svg')
				.attr('width', CHART_WIDTH + CHART_MARGIN.right + CHART_MARGIN.left )
				.attr('height', CHART_HEIGHT + CHART_MARGIN.top + CHART_MARGIN.bottom )
			.append('g')
				.attr('transform', `translate(${CHART_MARGIN.left}, ${CHART_MARGIN.top})`)

		vis.xLabel = vis.svg.append('text')
			.attr('x', CHART_WIDTH / 2)
			.attr('y', CHART_HEIGHT + 40)
			.attr('fill', 'black')
			.attr('text-anchor', 'middle')
			.text(CHART_XAXIS_LABEL);

		vis.svg.append('text')
			.attr("x", -(CHART_HEIGHT / 2))
			.attr("y", -50)
			.attr("text-anchor", "middle")
			.text(CHART_YAXIS_LABEL)
			.attr("transform", "rotate(-90)");

		vis.xAxisGroup = vis.svg.append("g")
			.attr("transform", `translate(0, ${CHART_HEIGHT})`)

		vis.yAxisGroup = vis.svg.append("g")
	}

	update() {
		const vis = this;
	}
}
