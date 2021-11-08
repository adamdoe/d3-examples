import * as d3 from 'd3';

const CHART_MARGIN = {
	TOP: 10,
	RIGHT: 10,
	BOTTOM: 80,
	LEFT: 70,
};
const CHART_WIDTH = 800 - CHART_MARGIN.RIGHT - CHART_MARGIN.LEFT;
const CHART_HEIGHT = 500 - CHART_MARGIN.TOP - CHART_MARGIN.BOTTOM;

const CHART_XAXIS_LABEL = 'Height (cm)';
const CHART_YAXIS_LABEL = 'Height(cm)';

export default class D3ScatterPlot {

	constructor(element, data, updateName) {

		let vis = this;
		vis.updateName = updateName


		vis.data = data;
		console.log('VIS DATA', vis.data)

		vis.g = d3.select(element)
			.append("svg")
				.attr("width", CHART_WIDTH + CHART_MARGIN.LEFT + CHART_MARGIN.RIGHT)
				.attr("height", CHART_HEIGHT + CHART_MARGIN.TOP + CHART_MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${CHART_MARGIN.LEFT}, ${CHART_MARGIN.TOP})`);

		vis.x = d3.scaleLinear()
			.range([0 , CHART_WIDTH])
	
		vis.y = d3.scaleLinear()
			.range([CHART_HEIGHT , 0])

		vis.xAxisGroup = vis.g.append("g")
			.attr("transform", `translate(0, ${CHART_HEIGHT})`)
		
		vis.yAxisGroup = vis.g.append("g")

		vis.g.append("text")
			.attr("x", CHART_WIDTH / 2)
			.attr("y", CHART_HEIGHT + 40)
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.text("Age")

		vis.g.append("text")
			.attr("x", -(CHART_HEIGHT / 2))
			.attr("y", -50)
			.attr("transform", "rotate(-90)")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.text("Height in cm")

		console.log('visY', vis.y(6))
		vis.update( data );
	}

	update( data ) {
		let vis = this;
		vis.data = data;

		vis.x.domain([0 , d3.max(vis.data, d => Number(d.age))])
		vis.y.domain([0 , d3.max(vis.data, d => Number(d.height))])

		const xAxisCall = d3.axisBottom(vis.x)
		const yAxisCall = d3.axisLeft(vis.y)

		vis.xAxisGroup.transition(1000).call(xAxisCall)
		vis.yAxisGroup.transition(1000).call(yAxisCall)

		// JOIN
		const circles = vis.g.selectAll("circle")
			.data(vis.data, d => d.name)

		// EXIT
		circles.exit()
			.transition(1000)
				.attr("cy", vis.y(0))
				.remove()

		// UPDATE
		circles.transition(1000)
			.attr("cx", d => vis.x(d.age))
			.attr("cy", d => vis.y(d.height))

		// ENTER
		circles.enter().append("circle")
			.attr("cy", vis.y(0))
			.attr("cx", d => vis.x(d.age))
			.attr("r", 5)
			.attr("fill", "grey")
			.on("click", d => vis.updateName(d.name))
			.transition(1000)
				.attr("cy", d => vis.y(d.height))
	}
}
