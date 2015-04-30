angular.module('app')

.controller("BattervPitcherHome", function($scope, $http, $cookieStore){
    $http.get('https://spreadsheets.google.com/feeds/list/1h8HSu-XcJaIzzuj_QIxFsewDE4-T5vmsIKtfOAahZtw/o4qj58j/public/values?alt=json').
    success(function(data, status, headers, config) {
       $scope.teamList = data.feed.entry;
    }).
    error(function(data, status, headers, config) {

    });

    $scope.viewPitcher = function(pitcher,team){
        $cookieStore.put('pitcherName',pitcher);
        $cookieStore.put('teamName',team);
        window.location.href="batter-vs-pitcher.html";
    }
})

.directive('radarChart', function() {
  return { 
    restrict: 'E', 
    link: function(scope, element) {

  }};

});
