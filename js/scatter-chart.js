var h = 350;
var w = 400;
var monthlySales = [
  {
    month: 10,
    sales: 100,
  },
  {
    month: 20,
    sales: 130,
  },
  {
    month: 30,
    sales: 250,
  },
  {
    month: 40,
    sales: 300,
  },
  {
    month: 50,
    sales: 265,
  },
  {
    month: 60,
    sales: 225,
  },
  {
    month: 70,
    sales: 180,
  },
  {
    month: 80,
    sales: 120,
  },
  {
    month: 90,
    sales: 145,
  },
  {
    month: 100,
    sales: 120,
  },
];

const salesMargin = (sales) => {
  return sales >= 250 ? "#33CC66" : "#666666";
};

const showMinMax = (dataset, column, val, type) => {
  var max = d3.max(dataset, function (d) {
    return d[col];
  });
  var min = d3.min(dataset, function (d) {
    return d[column];
  });
  if (type == "minmax" || val == max || val == min) {
    return val;
  } else {
    if (type == "all") {
      return val;
    }
  }
};

// svg
var svg = d3.select("#d3Div").append("svg").attr({
  width: w,
  height: h,
});

// add dots
var dots = svg
  .selectAll("circle")
  .data(monthlySales)
  .enter()
  .append("circle")
  .attr({
    cx: (d) => d.month * 3,
    cy: (d) => h - d.sales,
    r: 5,
    fill: (d) => salesMargin(d.sales),
  });

// add labels
var labels = svg
  .selectAll("text")
  .data(monthlySales)
  .enter()
  .append("text")
  .text(function (d) {
    return showMinMax(monthlySales, "sales", d.sales, "minmax");
  })
  .attr({
    x: function (d) {
      return d.month * 3 - 25;
    },
    y: function (d) {
      return h - d.sales;
    },
    "font-size": 12,
    "font-family": "sans-serif",
    fill: "#666666",
    "text-anchor": "start",
    "font-weight": function (d, i) {
      if (i === 0 || i === monthlySales.length - 1) {
        return "bold";
      } else {
        return "normal";
      }
    },
  });
