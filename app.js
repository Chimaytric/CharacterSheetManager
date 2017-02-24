'use strict'

angular.module('characterSheetmanager', [
    'ui.router',
    'characterSheetmanager.rootComponent',
    'characterSheetmanager.headerComponent',
    'characterSheetmanager.homeComponent',
    'characterSheetmanager.gamesComponent',
    'characterSheetmanager.playersComponent'
])

.config(function($stateProvider, $urlRouterProvider){

    var homeState = {
        name: 'home',
        url: '/',
        component: 'homeComponent'
    };

    var gamesState = {
        name: 'games',
        url: '/games',
        component: 'gamesComponent'
    };

    var playersState = {
        name: 'players',
        url: '/players',
        component: 'playersComponent'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(gamesState);
    $stateProvider.state(playersState);

    $urlRouterProvider.when('', '/');

});