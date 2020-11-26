var w = 300;
var h = 200;
var padding = 2;
var dataset = [5, 10, 15, 20, 25, 11, 25, 18, 22, 7];
var svg = d3.select("#d3Div").append("svg").attr("width", w).attr("height", h);

const colorPicker = (v) => {
  if (v < 20) {
    return "#666666";
  } else if (v >= 20) {
    return "#f32065";
  }
};

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attrs({
    x: (d, i) => {
      return i * (w / dataset.length);
    },
    y: function (d) {
      return h - d * 4;
    },
    width: w / dataset.length - padding,
    height: function (d) {
      return d * 4;
    },
    fill: function (d) {
      return colorPicker(d);
    },
  });

svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d;
  })
  .attrs({
    "text-anchor": "middle",
    x: function (d, i) {
      return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
    },
    y: function (d) {
      return h - d * 4 - 4;
    },
  });
