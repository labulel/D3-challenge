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

// Create an SVG wrapper, append an SVG group 
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read in csv file and setting up variables
d3.csv('./assets/data/data.csv').then(function(statedata) {
    console.log(statedata)

    statedata.forEach(function(d){
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare
    })

    var state = statedata.map(d => d.abbr)

// setting up x and y scales
var xLinearScale = d3.scaleLinear()
.domain([d3.min(statedata, d => d.poverty)-1, d3.max(statedata, d => d.poverty)+3])
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(statedata, d => d.healthcare)+2])
.range([height, 0]);

// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// append axes to the chart
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

//Create Circles

var circlesGroup = chartGroup.selectAll("circle")
.data(statedata)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "blue")
.style("stroke", "black")
.attr("opacity", ".5");

var circlenames = chartGroup.selectAll(null).data(statedata).enter().append("text");

//append circles with state abbrs
circlenames
  .attr("x", function(d) {
    return xLinearScale(d.poverty);
  })
  .attr("y", function(d) {
    return yLinearScale(d.healthcare);
  })
  .text(function(d) {
    return d.abbr;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");


  // Initialize tooltip
  var toolTip = d3.tip() 
    .attr("class", "tooltip")
    .offset([80, -60])
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .html(function(d) {
      return  `${d.state}<br>PovertyRate: ${d.poverty}<br>Healthcare: ${d.healthcare}<br>`; 
  });

  // Create tooltip in chartGroup
  chartGroup.call(toolTip);

  // Create mouseover event to display and hide the tooltip
  circlesGroup.on("mouseover", function(d) {
    toolTip.show(d, this);
  })
    // Create mouseout event to clear output
    .on("mouseout", function(d, i) {
      toolTip.hide(d);
    });



// Create axes labels
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthecare (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
}).catch(function(error) {
console.log(error);

})