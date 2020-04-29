var myChart
var datasets = []
var resultData

$(document).ready(function () {
    initChart()

    var requestValue = "http://localhost:8000/plot?location_list=Texas:Harris&location_list=New%20York&location_list=New%20York:New%20York%20City";
    $.getJSON(requestValue, function (result) {
        resultData = result
        var apiData = result.map(makePoint)
        console.log(apiData)
        datasets.push(makeDataset("Testing", apiData))

        updateChart(datasets)

    });
});

// {'New York:New York': [{x:1, y:1}...], 'Texas:Harris': [{x:1, y:1} ...]}