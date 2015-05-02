var pitchersApp = angular.module('app', ['angular.filter', 'ngResource', 'ui.router']);

pitchersApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('app', {
            url: '/',
            abstract: true,
            template: '<div ui-view></div>',
            resolve: {
                   playerDataPromise: function(playerData){
                       return playerData.fetch();
                   }
            }
        })
        
        .state('app.home', {
            url: 'home',
            templateUrl: 'page-home.html',
            controller: 'BattervPitcherHome'
        })
        
        .state('app.pitchers', {
            url: 'pitchers/:id',
            templateUrl: 'page-pitchers.html',
            controller: 'BattervPitcher'
        })

});