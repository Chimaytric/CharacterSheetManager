function gameSessionDetailController($state, $stateParams, gameSessionDetailFactory){
    console.log('GameSessionDetail component');

    var vm = this;

    if($stateParams.gameSessionId !== null){
        gameSessionDetailFactory.getGameSessionById($stateParams.gameSessionId).then(function(gameSession){
            vm.gameSession = gameSession;
            gameSessionDetailFactory.getGameById(vm.gameSession.game).then(function(game){
                vm.gameSession.game = game;
            });
            gameSessionDetailFactory.getPlayerById(vm.gameSession.gameMaster).then(function(gameMaster){
                vm.gameSession.gameMaster = gameMaster;
            });
            vm.gameSession.characters.forEach(function(character, index){
                gameSessionDetailFactory.getPlayerById(character.player).then(function(player){
                    vm.gameSession.characters[index].player = player;
                });
            });
        });
    } else
        $state.go('home');
}

gameSessionDetailController.$inject = ['$state', '$stateParams', 'gameSessionDetailFactory'];

angular.module('characterSheetmanager.gameSessionDetailComponent', []).component('gameSessionDetailComponent', {
    templateUrl: 'gameSessionDetail/gameSessionDetail.component.html',
    controller: gameSessionDetailController,
    controllerAs: "gameSessionDetailCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory('gameSessionDetailFactory', function($http){
    return {
        getGameSessionById: function(gameSessionId){
            var url = "http://localhost:3000/gameSessions/"+gameSessionId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getGameSessionById] . "+response.status+" : "+response.statusText);
            });
        },
        getGameById: function(gameId){
            var url = "http://localhost:3000/games/"+gameId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getGameById] . "+response.status+" : "+response.statusText);
            });
        },
        getPlayerById: function(playerId){
            var url = "http://localhost:3000/players/"+playerId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getPlayerById] . "+response.status+" : "+response.statusText);
            });
        }
    }
});