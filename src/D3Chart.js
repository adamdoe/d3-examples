import * as d3 from 'd3';

export default class D3Chart {
	constructor(element) {

		const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
		const width = 800;
		const height = 500;

		const svg = d3.select(element)
						.append('svg')
						.attr('width', width)
						.attr('height', height);
		
			d3.json(url).then(data => {
				const rects = svg.selectAll('rect')
								.data(data);
					
				rects.enter()
					.append('rect')
						.attr("x", (d, i) => i * 100)
						.attr("y", 50)
						.attr("width", 50)
						.attr("height", d => d.height)
						.attr("fill", d => {
							if (d.height > 260) {
								return "red"
							}
							return "green"
						})
			})
	}
}
