$('.navbar-start a[data-name]').click(function (e) {
    e.preventDefault();
    // This will change the URL fragment. The change is reflected
    // on your browser's address bar as well
    var chartId = this.dataset.name
    window.location.hash = chartId;
    changeChart(chartId)
});

function changeChart(chartId) {
    $("#charts").children().hide()
    $("." + chartId).show()
}

$(checkHash)

function checkHash(){
    if(window.location.hash) {
        changeChart(window.location.hash.split('#')[1])
    }else{
        changeChart('cases-time')
    }

}