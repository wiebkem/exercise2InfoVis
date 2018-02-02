var dimpleChart;
var dimpleChart2;

function drawDimplePlot(data) {
    var height = 300, width = 600;

    //Create SVG
    var dimpleSvg = dimple.newSvg("#dimpleContainer", width, height);

    dimpleChart = new dimple.chart(dimpleSvg, data);
    dimpleChart.setMargins(50, 40, 20, 50);
    var x = dimpleChart.addCategoryAxis("x", "Occupation");
    var y = dimpleChart.addMeasureAxis("y", "Gender Pay Gap");
    dimpleChart.addSeries(["Occupation"], dimple.plot.bar);
    dimpleChart.draw();
  
}

function drawDimplePlot2(data) {
    var height = 300, width = 600;

    //Create SVG
    var dimpleSvg = dimple.newSvg("#dimpleContainer2", width, height);
    dimpleChart2 = new dimple.chart(dimpleSvg, data);
    //var x = dimpleChart.addTimeAxis("x", "Date", "%d-%m-%Y", "%m-%y");
    var x = dimpleChart2.addCategoryAxis("x", "Date");
    var y = dimpleChart2.addMeasureAxis("y", "Average");
    y.overrideMin = 360;
    y.overrideMax = 410;
    dimpleChart2.addSeries("Trend", dimple.plot.line);
    dimpleChart2.addSeries("Interpolated", dimple.plot.line);
    dimpleChart2.draw();
}

function prepareGenderGap(data)
{
    data.forEach(function (d) {
        d["Occupation"] = d["occupation"]; // Makes sure this is treated as a number instead of as text
        d["Gender Pay Gap"] = -(d["gender pay gap"].replace(/%/g, "")); // Makes sure this is treated as a number instead of as text
        d["Gender Pay Gap"] = 100-d['Gender Pay Gap'];
    });  
}

function dimpleZoom() {
    dimpleChart.axes[1].overrideMin = 55;
    dimpleChart.draw(1000);
}

function dimpleZoomReset() {
    dimpleChart.axes[1].overrideMin = 0;
    dimpleChart.draw(1000);
}

function filterData() {
    var half_length = Math.ceil(data2.length / 2);
    var filteredData = data2.splice(0,half_length);
    dimpleChart2.data = filteredData;
    dimpleChart2.draw(0,false);
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
