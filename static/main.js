var apiData

$( document ).ready(function() {
    console.log( "ready!" );
	
	var requestValue = "http://127.0.0.1:8000/plot-data?location_list=Texas:Harris&location_list=New%20York&location_list=New%20York:New%20York%20City";
	 $.getJSON(requestValue, function(result){
        apiData = result
		}
	 );
});

function makePoint(point){
    var dateX = new Date(point.x)
    return {x:dateX, y:point.y}};

var plotData = apiData.map(makePoint)

var ctx = document.getElementById("myChart").getContext('2d');


// Define the data 
var data = [
  
]; // Add data values to array
// End Defining data
var options = {responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
};

// End Defining data
var myChart = new Chart(ctx, {
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
});