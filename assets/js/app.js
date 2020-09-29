// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("#scatter")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read in csv file and setting up variables
d3.csv('./assets/data/data.csv').then(function(statedata) {
    console.log(statedata)

    statedata.forEach(function(d){
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare
    })


    var state = statedata.map(d => d.abbr)
    // var prate = data.map(d => d.poverty)
    // var hc = data.map(d => d.healthcare)

    // console.log(state)
    // console.log(prate)
    // console.log(hc)    

// setting up x and y scales
var xLinearScale = d3.scaleLinear()
.domain([20, d3.max(statedata, d => d.poverty)])
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(statedata, d => d.healthcare)])
.range([height, 0]);

// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// append axes to the chart
chartGroup.append("#scatter")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("#scatter")
.call(leftAxis);

})