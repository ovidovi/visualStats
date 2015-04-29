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

        var data = [
            [
                {axis:"BA",value:scope.batterItem.gsx$ba.$t},
                {axis:"SLG",value:scope.batterItem.gsx$slg.$t},
                {axis:"OBP",value:scope.batterItem.gsx$obp.$t}
            ]
        ];

        var seriesData = [
            {label:"H",value:scope.batterItem.gsx$obp.$t},
            {label:"BA",value:scope.batterItem.gsx$ba.$t},
            {label:"SLG",value:scope.batterItem.gsx$slg.$t},
            {label:"OBP",value:scope.batterItem.gsx$h.$t}
            
        ];

        var w = 160;
        var h = 160;
        var mycfg = {
            w: w,
            h: h,
            maxValue: 1.2,
            levels: 6,
            ExtraWidthX: 80
        }

        var chartElement = element[0];
        RadarChart.draw(chartElement, data, mycfg);

        var svg = d3.select(chartElement)
            .selectAll('svg')
            .append('svg')
            .attr("width", w + 300)
            .attr("height", 300)

        svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(90,0)') 
        .attr("x", -80)
        .attr("y", 20)
        .attr("fill", "#ee542a")
        .text(scope.batterItem.gsx$batter.$t);

        svg.append("text")
        .attr("class", "ab")
        .attr('transform', 'translate(90,0)') 
        .attr("x", -80)
        .attr("y", 40)
        .attr("fill", "#f7931d")
        .text("AB " + scope.batterItem.gsx$ab.$t);

        var item;
        for (item = 0; item < seriesData.length; ++item) {
            svg.append("text")
            .attr("class", "seriesItem")
            .attr('transform', 'translate(140,0)') 
            .attr("x", -95 + (item*40))
            .attr("y", 270)
            .attr("text-anchor", "middle")
            .text(seriesData[item].label);

            svg.append("text")
            .attr("class", "seriesItem")
            .attr('transform', 'translate(140,0)') 
            .attr("x", -95 + (item*40))
            .attr("y", 300)
            .attr("fill", "#f7931d")
            .attr("text-anchor", "middle")
            .text(seriesData[item].value.replace(/^[0]+/g,""));
        }
  }};

});
