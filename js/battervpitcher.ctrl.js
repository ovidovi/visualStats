angular.module('app')

.controller("BattervPitcher", function($scope, $stateParams, playerData){
    
    var selectedPitcher = $stateParams.id;
    
    //Get list of players
    var players = playerData.players;
    
    //Filter players by pitcher
    var playersByPitcher = _.where(players, {pitcherName: selectedPitcher});

    $scope.batterList = playersByPitcher;

    //Extract pitcher name and team name
    $scope.selectedPitcherName = selectedPitcher;
    var pitcherInfo = _.findWhere(players, {pitcherName: selectedPitcher});
    $scope.teamName = pitcherInfo.teamName;

})

.service('playerData', function($http) {
    var playerData = this;
    playerData.players = [];
    	
    playerData.fetch = function () {
        var promise = $http.get('https://spreadsheets.google.com/feeds/list/1h8HSu-XcJaIzzuj_QIxFsewDE4-T5vmsIKtfOAahZtw/otppaki/public/values?alt=json').
        success(function(data, status, headers, config) {
            playerData.players = playerData.transform(data.feed.entry);
        }).
        error(function(data, status, headers, config) {
    
        });
        return promise;
    };
    
    playerData.transform = function(dataArray) {
        var records = [];
        dataArray.forEach(function(record) {
            var player = {};
            player.teamName = record.gsx$team.$t;
            player.pitcherName = record.gsx$pitcher.$t;
            player.batterName = record.gsx$batter.$t;
            player.obp = record.gsx$obp.$t;
            player.ba = record.gsx$ba.$t;
            player.slg = record.gsx$slg.$t;
            player.h = record.gsx$h.$t;
            player.ab = record.gsx$ab.$t;
            records.push(player);
        }, this);
        return records;
    };
})

.directive('radarChart', function() {
  return { 
    restrict: 'E', 
    link: function(scope, element) {

        var data = [
            [
                {axis:"BA",value:scope.batterItem.ba},
                {axis:"SLG",value:scope.batterItem.slg},
                {axis:"OBP",value:scope.batterItem.obp}
            ]
        ];

        var seriesData = [
            {label:"H",value:scope.batterItem.obp},
            {label:"BA",value:scope.batterItem.ba},
            {label:"SLG",value:scope.batterItem.slg},
            {label:"OBP",value:scope.batterItem.h}
            
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
        .text(scope.batterItem.batterName);

        svg.append("text")
        .attr("class", "ab")
        .attr('transform', 'translate(90,0)') 
        .attr("x", -80)
        .attr("y", 40)
        .attr("fill", "#f7931d")
        .text("AB " + scope.batterItem.ab);

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
