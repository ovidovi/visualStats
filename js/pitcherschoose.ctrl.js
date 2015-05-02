angular.module('app')

.controller("BattervPitcherHome", function($scope, $http){

    $http.get('https://spreadsheets.google.com/feeds/list/1h8HSu-XcJaIzzuj_QIxFsewDE4-T5vmsIKtfOAahZtw/o4qj58j/public/values?alt=json').
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
  }};

});
