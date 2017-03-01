'use strict'

angular.module('characterSheetmanager', [
    'ui.router',
    'characterSheetmanager.rootComponent',
    'characterSheetmanager.headerComponent',
    'characterSheetmanager.homeComponent',
    'characterSheetmanager.gamesComponent',
    'characterSheetmanager.playersComponent',
    'characterSheetmanager.gameSessionDetailComponent',
    'characterSheetmanager.characterSheetComponent',
    'characterSheetmanager.settingsComponent'
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

    var characterSheetState = {
        name: 'characterSheet',
        url: '/characterSheet',
        params: {
            template: null,
            characterData: null,
            gameSessionId: null,
            characterId: null
        },
        component: 'characterSheetComponent'
    }

    var settingsState = {
         name: 'settings',
         url: '/settings',
         component: 'settingsComponent'
    }

    $stateProvider.state(homeState);
    $stateProvider.state(gamesState);
    $stateProvider.state(playersState);
    $stateProvider.state(gameSessionDetailState);
    $stateProvider.state(characterSheetState);
    $stateProvider.state(settingsState);

    $urlRouterProvider.when('', '/');

});