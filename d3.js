// LOGO SAMPLE
var dataArr = [20, 30, 40, 50]

var canvas = d3.select('body')
    .append('svg')
    .attr('width', 300)
    .attr('height', 500);


var bar = canvas.selectAll('rect')
    .data(dataArr)
    .enter()
    .append('rect')
    .attr('width', d => d)
    .attr('height', 50);

var circle = canvas.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 25)
    .attr('fill', 'blue');

var line = canvas.append('line')
    .attr('x1', 10)
    .attr('y1', 100)
    .attr('x2', 100)
    .attr('y2', 100)
    .attr('stroke', 'green')
    .attr('stroke-width', 10)

// var svgWidth = 300;
// var svgHeight = 800;

// var svg = d3.create('svg');
// svg.attr('width', svgWidth);
// svg.attr('height', svgHeight);

// var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// var barPadding = 5;
// var barWidth = (svgWidth / dataset.length);
// var barChart = svg.select("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("y", function (d) {
//         return svgHeight - d
//     })
//     .attr("height", function (d) {
//         return d;
//     })
//     .attr("width", barWidth - barPadding)
//     .attr("transform", function (d, i) {
//         var translate = [barWidth * i, 0];
//         return "translate(" + translate + ")";
//     });


//SUNBURST CHART
var nodeData = {
    "name": "TOPICS", "children": [{
        "name": "Topic A",
        "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 4 }]
    }, {
        "name": "Topic B",
        "children": [{ "name": "Sub B1", "size": 3 }, { "name": "Sub B2", "size": 3 }, {
            "name": "Sub B3", "size": 3
        }]
    }, {
        "name": "Topic C",
        "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 4 }]
    }]
};

// Variables
var width = 500;
var height = 500;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10);
// Create primary <g> element
var g = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

// Data strucure
var partition = d3.partition()
    .size([2 * Math.PI, radius]);

// Find data root
var root = d3.hierarchy(nodeData)
    .sum(function (d) { return d.size });

// Size arcs
partition(root);
var arc = d3.arc()
    .startAngle(function (d) { return d.x0 })
    .endAngle(function (d) { return d.x1 })
    .innerRadius(function (d) { return d.y0 })
    .outerRadius(function (d) { return d.y1 });

// Put it all together
g.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
    .attr("display", function (d) { return d.depth ? null : "none"; })
    .attr("d", arc)
    .style('stroke', 'white')
    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });