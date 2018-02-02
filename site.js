
function drawDimplePlot(data) {
    var height = 300, width = 600;

    //Create SVG
    var dimpleSvg = dimple.newSvg("#dimpleContainer", width, height);

    var dimpleChart = new dimple.chart(dimpleSvg, data);
    dimpleChart.setMargins(50, 40, 20, 50);
    var x = dimpleChart.addMeasureAxis("x", "Temperature F");
    x.overrideMin = 50;
    var y = dimpleChart.addMeasureAxis("y", "Damage index");
    y.overrideMax = 13;
    var lineSeries = dimpleChart.addSeries("Flight", dimple.plot.line);
    dimpleChart.addSeries(["Flight", "Damage index"], dimple.plot.bubble);
    dimpleChart.addLegend("2%", 10, "96%", 30, "right");
    dimpleChart.draw();
  
}

function drawDimplePlot2(data) {

    var height = 300, width = 600;

    //Create SVG
    var dimpleSvg = dimple.newSvg("#dimpleContainer2", width, height);
//debugger;
    var dimpleChart = new dimple.chart(dimpleSvg, data);
    dimpleChart.setMargins(50, 40, 20, 50);
    var x = dimpleChart.addCategoryAxis("x", "Countries");
    var y = dimpleChart.addMeasureAxis("y", "Cheese (kcal/day)");
    var barSeries = dimpleChart.addSeries("Countries", dimple.plot.bar);
    dimpleChart.draw();  
}

function prepareChallengerData(data)
{
    data.forEach(function (d) {
        d["Temperature F"] = +d["Temperature F"]; // Makes sure this is treated as a number instead of as text
        d["Damage index"] = +d["Damage index"]; // Makes sure this is treated as a number instead of as text
    });  
}

var data1_csv = "https://dl.dropbox.com/s/g5ldwtpjdaq1c0p/challenger_damaged.csv?dl=0";
var data2_csv = "https://dl.dropbox.com/s/3s0fqi3mg3ifn69/Countries.csv?dl=0";

d3.csv(data1_csv, function (data) {
    prepareChallengerData(data);
    drawDimplePlot(data);
});


d3.text(data2_csv, function (text) {
    var dsv = d3.dsvFormat(";");
    var data = dsv.parse(text);
    drawDimplePlot2(data);
});


