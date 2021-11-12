import * as d3 from 'd3';

const COLORS = { male: '#89CFF0', female: '#f4c2c2'};
const CHART_MARGIN = { top: 20, right: 10, bottom: 100, left: 70 };
const CHART_WIDTH = 800 - CHART_MARGIN.right - CHART_MARGIN.left;
const CHART_HEIGHT = 500 - CHART_MARGIN.top - CHART_MARGIN.bottom;
const CHART_XAXIS_LABEL = 'Worlds Tallest Men';
const CHART_YAXIS_LABEL = 'Height(cm)';

export default class D3Chart {
	constructor(element, gender) {

		const vis = this;

		vis.gender = gender;

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

		Promise.all([
			d3.json('./data/tallest_men.json'),
			d3.json('./data/tallest_women.json')
		]).then((datasets) => {
			vis.maleData = datasets[0];
			vis.femaleData = datasets[1];

			vis.update(gender);
			
		}).catch(err => {
			console.error("D3 DATA FETCH ERROR: " + err);
		})

	}

	update(gender) {
		const vis = this;

		vis.data = (gender === "male") ? vis.maleData : vis.femaleData;
		vis.xLabel.text(`Worlds tallet ${gender}`)
		vis.gender = gender;

		const y = d3.scaleLinear()
			.domain([
				d3.min( vis.data, d => d.height) * 0.95, 
				d3.max( vis.data, d => d.height )
			])
			.range([CHART_HEIGHT, 0]);

		const x = d3.scaleBand()
			.domain(vis.data.map( d => d.name))
			.range([0, CHART_WIDTH])
			.padding(0.2)


		const xAxisCall = d3.axisBottom(x)
		vis.xAxisGroup.transition().duration(1500).call(xAxisCall)

		const yAxisCall = d3.axisLeft(y)
		vis.yAxisGroup.transition().duration(1500).call(yAxisCall)
		
		// DATA JOIN
		const rects = vis.svg.selectAll('rect')
			.data(vis.data);
		
		// EXIT
		rects.exit()
			.transition().duration(1500)
				.attr("height", 0)
				.attr("y", CHART_HEIGHT)
				.remove()

		// UPDATE
		rects.transition().duration(500)
			.attr("x", d => x(d.name))
			.attr("width", x.bandwidth)
			.attr('fill', gender === 'male' ? COLORS.male : COLORS.female )
			.transition().duration(1500)
				.attr("height", d => CHART_HEIGHT - y(d.height))
				.attr("y", d => y(d.height) )

		// ENTER
		rects.enter()
			.append('rect')
				.attr("x", (d, i) => x(d.name))
				.attr("width", x.bandwidth)
				.attr('y', CHART_HEIGHT)
				.attr('fill',  gender === 'male' ? COLORS.male : COLORS.female )
				.transition().duration(1500)
					.attr("height", d => CHART_HEIGHT - y(d.height))
					.attr("y", d => y(d.height) )
		
	}
}
