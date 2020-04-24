var datasets = []

$(document).ready(function () {
    console.log("ready!");

    var requestValue = "http://127.0.0.1:8000/plot-data?location_list=Texas:Harris";
    $.getJSON(requestValue, function (result) {
        var apiData = result.map(makePoint)
        console.log(apiData)

        datasets.push(makeDataset("Testing", apiData))
        config.data.datasets = datasets
        myChart.update()
    });
});

function makePoint(point) {
    var dateX = new Date(point.x)
    return {x: dateX, y: point.y}
}

function makeDataset(name, data) {
    return {
        label: name,
        data: data,
        fill: false,
    }
}

//var plotData = apiData.map(makePoint)

var ctx = document.getElementById("myChart").getContext('2d');


// Define the data 
var data = []; // Add data values to array

// data =  [{
//     x: new Date(),
//     y: 1
// }, {
//     t: new Date(),
//     y: 10
// }]

// End Defining data
var options = {
    scales: {
        xAxes: [{
            type: 'time',
            position: 'bottom',
        }],
        // xAxes: [{
        //     type: 'time',
        //     time: {
        //         displayFormats: {
        //             quarter: 'MMM YYYY'
        //         }
        //     }
        // }],

        yAxes: [{
            type: 'linear',
            position: 'bottom'
        }]
    },
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
};

var config = {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Population', // Name the series
            data: data, // Specify the data values array
            borderColor: '#2196f3', // Add custom color border
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
        }]
    },
    options: options
}

// End Defining data
var myChart = new Chart(ctx, config);