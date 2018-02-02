
function drawDimplePlot(data) {
    var height = 300, width = 600;

    //Create SVG
    var dimpleSvg = dimple.newSvg("#dimpleContainer", width, height);

    var dimpleChart = new dimple.chart(dimpleSvg, data);
    dimpleChart.setMargins(50, 40, 20, 50);
    var x = dimpleChart.addCategoryAxis("x", "Occupation");
    //x.overrideMin = 50;
    var y = dimpleChart.addMeasureAxis("y", "Gender Pay Gap");
    //y.overrideMax = 13;
    //var lineSeries = dimpleChart.addSeries("Flight", dimple.plot.line);
    dimpleChart.addSeries(["Occupation"], dimple.plot.bar);
    //dimpleChart.addLegend("2%", 10, "96%", 30, "right");
    dimpleChart.draw();
  
}

function drawDimplePlot2(data) {
    var height = 300, width = 600;

    //Create SVG
    var dimpleSvg = dimple.newSvg("#dimpleContainer2", width, height);
    var dimpleChart = new dimple.chart(dimpleSvg, data);
    //dimpleChart.setMargins(0, 20, 0, 50);
    //var x = dimpleChart.addTimeAxis("x", "Date", "%d-%m-%Y", "%m-%y");
    var x = dimpleChart.addCategoryAxis("x", "Date");
    var y = dimpleChart.addMeasureAxis("y", "Average");
    y.overrideMin = 360;
    y.overrideMax = 410;
    dimpleChart.addSeries("Trend", dimple.plot.line);
    dimpleChart.addSeries("Interpolated", dimple.plot.line);
    dimpleChart.draw();
}

function prepareGenderGap(data)
{
    data.forEach(function (d) {
        d["Occupation"] = d["occupation"]; // Makes sure this is treated as a number instead of as text
        d["Gender Pay Gap"] = -(d["gender pay gap"].replace(/%/g, "")); // Makes sure this is treated as a number instead of as text
        d["Gender Pay Gap"] = 100-d['Gender Pay Gap'];
    });  
}

var data1_csv = "Gender_Pay_Gap.csv";
var data2_csv = "CO2-trend.csv";

d3.csv(data1_csv, function (data) {
    prepareGenderGap(data);
    drawDimplePlot(data);
});

d3.text(data2_csv, function (text) {
    var dsv = d3.dsvFormat(",");
    data2 = dsv.parse(text);
    drawDimplePlot2(data2);
});
