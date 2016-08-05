//<script src="https://d3js.org/d3.v3.min.js">
/*Defining margin*/
var margin = { top: 20, right: 10, bottom: 100, left: 40 },
    width = 1000 - margin.right - margin.left,
    height = 1000 - margin.top - margin.bottom;

/*Defining the SVG*/
var svg = d3.select('body').append('svg')
    .attr({ "width": width + margin.right + margin.left, "height": height + margin.top + margin.bottom })
    .append('g')
    .attr("transform", "translate(" + margin.left + ',' + margin.right + ")");


//Define x and y scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

//Define axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
// Import data fs.writeFileSync('../Data/Foodgrains.json',str);
d3.json("../json/oilseed.json", function(error, data) {
    if (error) console.log("Error: Data not loaded");

    data.forEach(function(d) {
        d.Production = +d.Production;
        d["Oilseed crop type"] = d["Oilseed crop type"];
        console.log(d.Production);

    });

    //sort data
    data.sort(function(a, b) {
        return b.Production - a.Production;
    });

    //specify the domains for x and y scales
    xScale.domain(data.map(function(d) {
        return d["Oilseed crop type"]; }));
    yScale.domain([0, d3.max(data, function(d) {
        return d.Production; })]);

    //Draw the bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(3000)
        .delay(function(d, i) {
            return i * 200; })
        .attr({
            "x": function(d) {
                return xScale(d["Oilseed crop type"]); },
            "y": function(d) {
                return yScale(d.Production); },
            "width": xScale.rangeBand(),
            "height": function(d) {
                return height - yScale(d.Production); }
        })
        .style("fill", function(d, i) {
            return 'rgb(20, 20, ' + ((i * 30) + 100) + ')' });

    //label the bars
    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) {
            return d.Production; })
        .attr('x', function(d) {
            return xScale(d["Oilseed crop type"]) + xScale.rangeBand() / 2; })
        .attr('y', function(d) {
            return yScale(d.Production) + 12; })
        .style("fill", "white")
        .style("text-anchor", "middle");

    // Draw xAxis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", "rotate(-60)")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .style("text-anchor", "end")
        .style("font", "12px");


    //draw yAxis
    svg.append("g")

    .attr("class", "y axis")
        .call(yAxis)
        .style("font", "12px");


});

//</script>
