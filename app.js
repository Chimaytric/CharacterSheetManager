'use strict'

angular.module('characterSheetmanager', [
    'ui.router',
    'characterSheetmanager.rootComponent',
    'characterSheetmanager.headerComponent',
    'characterSheetmanager.homeComponent',
    'characterSheetmanager.gamesComponent',
    'characterSheetmanager.playersComponent',
    'characterSheetmanager.gameSessionDetailComponent'
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

    var gameSessionDetailState = {
        name: 'gameSessionDetail',
        url: '/gameSession',
        params: {
            gameSessionId: null
        },
        component: 'gameSessionDetailComponent'
    }

    $stateProvider.state(homeState);
    $stateProvider.state(gamesState);
    $stateProvider.state(playersState);
    $stateProvider.state(gameSessionDetailState);

    $urlRouterProvider.when('', '/');

});