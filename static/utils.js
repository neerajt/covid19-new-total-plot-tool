//Chart Configuration data
var options = {
    scales: {
        xAxes: [{
            type: 'time',
            position: 'bottom',
        }],
        yAxes: [{
            type: 'linear',
            position: 'bottom'
        }]
    },
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
    plugins: {
        colorschemes: {
            scheme: 'brewer.Paired12'
        }
    }
};

var config = {
    type: 'scatter',
    data: {datasets: datasets},
    options: options
}

//end config data


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

function initChart() {
    var ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, config);
}

function updateChart(datasets) {
    config.data.datasets = datasets
    myChart.update()
}