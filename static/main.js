var myChart
var datasets = []

$(document).ready(function () {
    initChart()

    var requestValue = "http://localhost:8000/plot-data?location_list=Texas:Harris&location_list=New%20York&location_list=New%20York:New%20York%20City";
    $.getJSON(requestValue, function (result) {

        keyed = _.groupBy(result, getLocation);

        console.log(keyed)

        Object.keys(keyed).forEach(function(key) {
            var apiData = keyed[key].map(makePoint)
            datasets.push(makeDataset(key, apiData))
        });

        updateChart(datasets)

    });
});