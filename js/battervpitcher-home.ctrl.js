angular.module('app')

.controller("BattervPitcherHome", function($scope, $http, playerData){
       $scope.teamList = playerData.players;
})
