var margin = {top: 20, right: 20, bottom: 20, left: 20};
width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    formatPercent = d3.format(".1%");

var svg = d3.select("#map").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

queue()
    .defer(d3.csv, "us-counties.csv")
    .defer(d3.json, "us.json")
    .await(ready);

var color = d3.scaleLog()
    .domain([32, 10000])
    //.domain([10, 12.5, 15, 17.5, 20, 22.5, 25])
    //.domain([32, 64, 128, 256, 1024, 2048, 4096, 8192, 16384, 16384*2])
    // .range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);
    .base(2)
    .range(["lightblue", "darkblue"])

//TODO make a better legend
var legendNumbers = [32, 128, 256, 512, 1024, 2000, 4000, 10000, 20000, 30000, 40000, 50000]
//var legendText = makeLegendText(legendNumbers)
var legendText = ["", "10%", "", "15%", "", "20%", "", "25%"];
var legendColors = legendNumbers.map(color)

// var legendColors = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"];

function makeLegendText(numbers){
    var arr = []
    for(var i = 0; i<numbers.length*2; i++){
        if(i % 2 == 0){
            arr.push(numbers[i/2])
        }else{
            arr.push("")
        }
    }
    return arr
}

function ready(error, data, us) {

    var counties = topojson.feature(us, us.objects.counties);

    data.forEach(function (d) {
        d.year = new Date(d.date) * 1;
        d.fips = +d.fips;
        d.rate = +d.cases;
    });

    window.data = data

    var dataByCountyByYear = d3.nest()
        .key(function (d) {
            return d.fips;
        })
        .key(function (d) {
            return d.year;
        })
        .map(data);

    counties.features.forEach(function (county) {
        county.properties.years = dataByCountyByYear[+county.id]
        console.log(dataByCountyByYear[+county.id])
    });

    window.counties = counties
    window.dataByCountyByYear = dataByCountyByYear


    var projection = d3.geo.albersUsa()
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var countyShapes = svg.selectAll(".county")
        .data(counties.features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path);

    countyShapes
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(250)
                .style("opacity", 1);

            if (!d.properties.years) {
                return
            }
            var allDates = Object.keys(d.properties.years)

            var firstKey = allDates[0]
            var lastKey = allDates[allDates.length - 1]

            tooltip.html(
                "<p><strong>" + d.properties.years[firstKey][0].county + ", " + d.properties.years[firstKey][0].state + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>First Point:</td><td>" + ((d.properties.years[firstKey][0].rate)) + "</td></tr>" +
                "<tr><td>Last Point:</td><td>" + ((d.properties.years[lastKey][0].rate)) + "</td></tr>" +
                "<tr><td>Change:</td><td>" + ((d.properties.years[lastKey][0].rate - d.properties.years[firstKey][0].rate)) + "</td></tr></tbody></table>"
            )
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(250)
                .style("opacity", 0);
        });

    svg.append("path")
        .datum(topojson.feature(us, us.objects.states, function (a, b) {
            return a !== b;
        }))
        .attr("class", "states")
        .attr("d", path);

    var legend = svg.append("g")
        .attr("id", "legend");

    var legenditem = legend.selectAll(".legenditem")
        .data(d3.range(8))
        .enter()
        .append("g")
        .attr("class", "legenditem")
        .attr("transform", function (d, i) {
            return "translate(" + i * 31 + ",0)";
        });

    legenditem.append("rect")
        .attr("x", width - 240)
        .attr("y", -7)
        .attr("width", 30)
        .attr("height", 6)
        .attr("class", "rect")
        .style("fill", function (d, i) {
            return legendColors[i];
        });

    legenditem.append("text")
        .attr("x", width - 240)
        .attr("y", -10)
        .style("text-anchor", "middle")
        .text(function (d, i) {
            return legendText[i];
        });

    function update(year) {
        slider.property("value", year);
        d3.select(".year").text(year);
        countyShapes.style("fill", function (d) {
            if (!d.properties.years || !d.properties.years[year]) {
                return "#cccccc"
            }

            return color(d.properties.years[year][0].rate)
        });
    }

    var start_date = new Date("2020-01-21")
    var end_date = new Date("2020-05-13")
    //1589414400000

    var slider = d3.select(".slider")
        .append("input")
        .attr("type", "range")
        .attr("min", start_date * 1)
        .attr("max", end_date * 1)
        .attr("step", 86400000)
        .on("input", function () {
            var year = this.value;
            update(year);
        });

    update(1996);

}

d3.select(self.frameElement).style("height", "685px");