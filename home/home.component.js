function HomeController(gameSessionsFactory){
    console.log('Home component');

    var vm = this;

        gameSessionsFactory.getGameSessions().then((function(gameSessions){
            vm.gameSessions = gameSessions;
            vm.gameSessions.forEach(function(gameSession){
                gameSessionsFactory.getGameById(gameSession.game).then(function(game){
                    gameSession.game = game;
                });
                gameSessionsFactory.getPlayerById(gameSession.gameMaster).then(function(gameMaster){
                    gameSession.gameMaster = gameMaster;
                });
                gameSession.players.forEach(function(player, index){
                    gameSessionsFactory.getPlayerById(player).then(function(playerDetail){
                        gameSession.players[index] = playerDetail;
                    });
                });
            });
        }));

}

HomeController.$inject = ['gameSessionsFactory'];

angular.module('characterSheetmanager.homeComponent', []).component('homeComponent', {
    templateUrl: 'home/home.component.html',
    controller: HomeController,
    controllerAs: "homeCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory('gameSessionsFactory', function($http){
    return {
        getGameSessions: function(){
            var url = "http://localhost:3000/gameSessions";
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getGameSessions] . "+response.status+" : "+response.statusText);
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