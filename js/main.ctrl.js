angular.module('app')
.controller("MainController", function($scope, $http){

    $http.get('https://spreadsheets.google.com/feeds/list/1h8HSu-XcJaIzzuj_QIxFsewDE4-T5vmsIKtfOAahZtw/otppaki/public/values?alt=json').
    success(function(data, status, headers, config) {
       $scope.batterList = data.feed.entry;
    }).
    error(function(data, status, headers, config) {

    });

})
.directive('radarChart', function() {
  return { 
    restrict: 'E', 
    link: function(scope, element) {

        var d = [
            [
                {axis:"BA",value:scope.batterItem.gsx$ba.$t},
                {axis:"SLG",value:scope.batterItem.gsx$slg.$t},
                {axis:"OBP",value:scope.batterItem.gsx$obp.$t}
            ]
        ];
        var w = 200;
        var h = 200;
        var mycfg = {
            w: w,
            h: h,
            maxValue: 1.2,
            levels: 6,
            ExtraWidthX: 300
        }

        var chartElement = element[0];
        RadarChart.draw(chartElement, d, mycfg);

        var svg = d3.select(chartElement)
            .selectAll('svg')
            .append('svg')
            .attr("width", w + 300)
            .attr("height", h)

        var text = svg.append("text")
            .attr("class", "title")
            .attr('transform', 'translate(90,0)') 
            .attr("x", -50)
            .attr("y", 20)
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .attr("fill", "#ee542a")
            .text(scope.batterItem.gsx$batter.$t);

        var text = svg.append("text")
            .attr("class", "title")
            .attr('transform', 'translate(90,0)') 
            .attr("x", -50)
            .attr("y", 40)
            .attr("font-size", "18px")
            .attr("fill", "#f59220")
            .text("AB " + scope.batterItem.gsx$ab.$t);

  }};

});







    //Options for the Radar chart, other than default

/*
    $('#body').append('<div id="chart' + chartNum + '"" class="chart"></div>');


    var svg = d3.select("#chart" + chartNum)
        .selectAll('svg')
        .append('svg')
        .attr("width", w+300)
        .attr("height", h)

    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(90,0)') 
        .attr("x", -50)
        .attr("y", 20)
        .attr("font-size", "18px")
        .attr("font-weight", "bold")
        .attr("fill", "#ee542a")
        .text(name);

    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(90,0)') 
        .attr("x", -50)
        .attr("y", 40)
        .attr("font-size", "18px")
        .attr("fill", "#f59220")
        .text("AB " + ab);
        */