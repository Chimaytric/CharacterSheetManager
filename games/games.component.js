function GamesController(){
    console.log('Games controller');
}

GamesController.$inject = [];

angular.module('characterSheetmanager.gamesComponent', []).component('gamesComponent', {
    templateUrl: 'games/games.component.html',
    controller: GamesController,
    controllerAs: "gamesCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
});