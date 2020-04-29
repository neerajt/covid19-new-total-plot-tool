var myChart
var datasets = []

var lastSelectedLength = false;
var currentValues = false

var typey = "linear"

$(document).ready(function () {
    initChart()
    getData()

    var jsonData = [];
    //TODO programmatically get a list of selectable locations
    var fruits = 'Texas,California,New York,Wyoming,Florida,New Mexico'.split(',');

    for (var i = 0; i < fruits.length; i++) jsonData.push({id: i, name: fruits[i]});

    var ms1 = $('#ms1').tagSuggest({
        data: jsonData,
        sortOrder: 'name',
        maxDropHeight: 200,
        name: 'ms1'
    });

    //turn off browser autocomplete
    $('#tag-input-0').prop("autocomplete", "off")

    //get data on change
    $("body").on('DOMSubtreeModified', "#tag-sel-ctn-0", function () {

        currentValues = ms1.getSelectedItems()

        //make sure a change has happened
        if(lastSelectedLength != currentValues.length){
            console.log(currentValues)
            var data = _.map(currentValues, 'name');
            getData(data)
        }

        lastSelectedLength = currentValues.length

    });

    //toggle logy
    $("#logy").click(function () {
        typey = typey === 'linear' ? 'logarithmic' : 'linear';
        myChart.options.scales.yAxes[0].type = typey
        myChart.update();
    });

});


function getData(data = ["Texas:Harris", "New York"]){
    datasets = []

    var url = makeRequestUrl(data)

    $.getJSON(url, function (result) {
        //group raw api data by location
        location_grouped = _.groupBy(result, getLocation);

        //make dataset for each key
        Object.keys(location_grouped).forEach(function (location) {
            var points = location_grouped[location].map(makePoint)
            datasets.push(makeDataset(location, points))
        });

        updateChart(datasets)

    });
}
