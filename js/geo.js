var w = 500;
var h = 300;
var projection = d3.geo
  .albersUsa()
  .translate([w / 2, h / 2])
  .scale([500]);

var path = d3.geo.path().projection(projection);

var color = d3.scale
  .linear()
  .range([
    "rgb(255,247,236)",
    "rgb(254,232,200)",
    "rgb(253,212,158)",
    "rgb(253,187,132)",
    "rgb(252,141,89)",
    "rgb(239,101,72)",
    "rgb(215,48,31)",
    "rgb(153,0,0)",
  ]);

var svg = d3.select("#d3Div").append("svg").attr({ width: w, height: h });

d3.csv("./assets/state-sales.csv", function (data) {
  color.domain([
    0,
    d3.max(data, function (d) {
      return d.sales;
    }),
  ]);

  d3.json("./assets/us.json", function (json) {
    for (var i = 0; i < data.length; i++) {
      var salesStates = data[i].state;
      var salesValue = parseFloat(data[i].sales);

      for (var j = 0; j < json.features.length; j++) {
        var usState = json.features[j].properties.NAME;
        if (salesStates === usState) {
          json.features[j].properties.value = salesValue;
          break;
        }
      }
    }

    svg
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function (d) {
        var value = d.properties.value;
        if (value) {
          return color(value);
        } else {
          return "#666666";
        }
      });
  });
});
