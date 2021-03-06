var h = 100;
var w = 350;
var padding = 20;

function showHeader(ds) {
  d3.select("body")
    .append("h4")
    .text(ds.category + " Sales (2013)");
}

function getDate(d) {
  var startDate = new String(d);
  var year = startDate.substr(0, 4);
  var month = startDate.substr(4, 2) - 1;
  var day = startDate.substr(6, 2);
  return new Date(year, month, day);
}

function buildLine(ds) {
  var minDate = getDate(ds.monthlySales[0]["month"]);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]["month"]);

  var xScale = d3.time
    .scale()
    .domain([minDate, maxDate])
    .range([padding + 5, w - padding]);

  var yScale = d3.scale
    .linear()
    .domain([
      0,
      d3.max(ds.monthlySales, function (d) {
        return d.sales;
      }),
    ])
    .range([h - padding, 10]);

  var xAxisGen = d3.svg
    .axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));

  var yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);

  var lineFun = d3.svg
    .line()
    .x(function (d) {
      return xScale(getDate(d.month));
    })
    .y(function (d) {
      return yScale(d.sales);
    })
    .interpolate("linear");

  var svg = d3
    .select("body")
    .append("svg")
    .attr({ width: w, height: h, id: "svg-" + ds.category });

  var yAxis = svg
    .append("g")
    .call(yAxisGen)
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ",0)");

  var xAxis = svg
    .append("g")
    .call(xAxisGen)
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (h - padding) + ")");

  var viz = svg.append("path").attr({
    d: lineFun(ds.monthlySales), //we have to refernce the sales data array
    stroke: "purple",
    "stroke-width": 2,
    fill: "none",
    class: "path-" + ds.category,
  });
}

// update line
function updateLine(ds) {
  var minDate = getDate(ds.monthlySales[0]["month"]);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]["month"]);

  var xScale = d3.time
    .scale()
    .domain([minDate, maxDate])
    .range([padding + 5, w - padding]);

  var yScale = d3.scale
    .linear()
    .domain([
      0,
      d3.max(ds.monthlySales, function (d) {
        return d.sales;
      }),
    ])
    .range([h - padding, 10]);

  var xAxisGen = d3.svg
    .axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"))
    .ticks(ds.monthlySales.length - 1);

  var yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);

  var lineFun = d3.svg
    .line()
    .x(function (d) {
      return xScale(getDate(d.month));
    })
    .y(function (d) {
      return yScale(d.sales);
    })
    .interpolate("linear");

  var svg = d3.select("body").select("#svg-" + ds.category);

  var yAxis = svg.selectAll("g.y-axis").call(yAxisGen);

  var xAxis = svg.selectAll("g.x-axis").call(xAxisGen);

  var viz = svg
    .selectAll(".path-" + ds.category)
    .transition()
    .duration(500)
    .ease("elastic")
    .attr({
      d: lineFun(ds.monthlySales),
    });
}

//call to load data and then build our viz
d3.json(
  "https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json",
  function (error, data) {
    //check the file loaded properly
    if (error) {
      console.log(error);
    } else {
      console.log(data); //raw data
    }

    //decode our base64 data
    //and convert it into an array
    var decodedData = JSON.parse(window.atob(data.content));

    //see what we've got
    //should be [Object, Object]
    console.log(decodedData.contents);

    decodedData.contents.forEach(function (ds) {
      console.log(ds);
      showHeader(ds); //give our chart a title
      buildLine(ds); //draw our line
    });

    // add event listener
    d3.select("select").on("change", function (d, i) {
      var sel = d3.select("#date-option").node().value;
      var decodedData = JSON.parse(window.atob(data.content));
      decodedData.contents.forEach(function (ds) {
        ds.monthlySales.splice(0, ds.monthlySales.length - sel);
        updateLine(ds); //update the line
      });
    });
  }
);
