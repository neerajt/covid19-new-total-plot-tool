$('.navbar-start a[data-name]').click(function (e) {
    // This will change the URL fragment. The change is reflected
    // on your browser's address bar as well
    var chartId = this.dataset.name
    window.location.hash = chartId;
    changeChart(chartId)
    e.preventDefault();
});

function changeChart(chartId) {
    $("#charts").children().hide()
    $("#" + chartId).show()
}

$(checkHash)

function checkHash(){
    changeChart(window.location.hash.split('#')[1])
}