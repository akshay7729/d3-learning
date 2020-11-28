var h = 100;
var w = 400;
var ds; // global variable for data

const buildLine = () => {
  var lineFun = d3.svg
    .line()
    .x((d) => (d.month - 20130001) / 3.25)
    .y((d) => h - d.sales)
    .interpolate("linear");

  var svg = d3.select("#d3Div").append("svg").attr({ width: w, height: h });

  var viz = svg.append("path").attr({
    d: lineFun(ds),
    stroke: "purple",
    "stroke-width": 2,
    fill: "none",
  });
};

d3.csv("assets/MonthlySales.csv", function (error, data) {
  if (error) {
    console.log("error", error);
  }

  if (data) {
    console.log("data", data);
    ds = data;
  }
  buildLine();
});
