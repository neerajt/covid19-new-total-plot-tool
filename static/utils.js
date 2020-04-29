const BASE_URL = "http://localhost:8000/plot-data?"

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
<<<<<<< Updated upstream
}
=======
}

function getLocation(object){
    return object.location_name
}

function makeRequestUrl(data){
    url = BASE_URL
    data.map(location => url = url + "location_list=" + encodeURI(location) + "&")
    return url
}


$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});
>>>>>>> Stashed changes
