var myChart
var datasets = []

$(document).ready(function () {
    initChart()

    var requestValue = "http://127.0.0.1:8000/plot-data?location_list=Texas:Harris";
    $.getJSON(requestValue, function (result) {

        var apiData = result.map(makePoint)
        console.log(apiData)
        datasets.push(makeDataset("Testing", apiData))

        updateChart(datasets)

    });
});