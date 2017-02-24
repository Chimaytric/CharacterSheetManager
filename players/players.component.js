function PlayersController(){
    console.log('Players controller');
}

PlayersController.$inject = [];

angular.module('characterSheetmanager.playersComponent', []).component('playersComponent', {
    templateUrl: 'players/players.component.html',
    controller: PlayersController,
    controllerAs: "playersCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory(playersFactory, function($http){
    return {
        getPlayers: function(){
            var url = "http://localhost:3000/players";
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getPlayers] . "+response.status+" : "+response.statusText);
            });
        }
    }
});