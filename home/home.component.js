function HomeController(gameSessionsFactory, $mdDialog){
    console.log('Home component');

    var vm = this;

    vm.openMenu = function($mdMenu, ev){
        $mdMenu.open(ev);
    }

    vm.openForm = function(ev){
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            vm.status = 'You said the information was "' + answer + '".';
        }, function() {
            vm.status = 'You cancelled the dialog.';
        });
    }
    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
        $mdDialog.hide();
        };

        $scope.cancel = function() {
        $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
        $mdDialog.hide(answer);
        };
    }

    vm.newSession = {
        players: []
    };

    gameSessionsFactory.getGames().then(function(games){
        vm.games = games;
    });
    gameSessionsFactory.getPlayers().then(function(players){
        vm.players = players;
        vm.newSession.gameMaster = players[0];
        vm.newPlayer = players[0];
    });

    vm.getSessions = function(){
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
    };
    vm.getSessions();

    vm.addSession = function(player){
        vm.newSession.players.push(player);
    };

    vm.addPlayer = function(){
        vm.newSession.players.push(vm.newPlayer);
        vm.newPlayer = null;
    };

    vm.addGameSession = function(){
        console.log(vm.newSession);
        vm.newSession.game = vm.newSession.game.id;
        vm.newSession.gameMaster = vm.newSession.gameMaster.id;
        vm.newSession.characters = [];
        vm.newSession.players.forEach(function(player, index){
            vm.newSession.players[index] = player.id;
            vm.newSession.characters.push({
                player: player.id,
                characterSheet: {}
            });
        });
        console.log(vm.newSession);
        
        gameSessionsFactory.addGameSession(vm.newSession).then(function(response){
            vm.getSessions();
            vm.newSession = {
                players: []
            };
        });
        
    }
    vm.deleteGameSession = function(gameSessionId){
        if(confirm('Are you sure you want to delete this game ?')){
            gameSessionsFactory.deleteGameSession(gameSessionId).then(function(response){
                vm.getSessions();
            });
        }
    };

}

HomeController.$inject = ['gameSessionsFactory', '$mdDialog'];

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
        addGameSession: function(gameSession){
            var url = "http://localhost:3000/gameSessions";
            return $http({
                method: 'POST',
                url: url,
                headers : {
                    'Content-Type': 'application/json'
                },
                data: gameSession
            }).then(function(response){
                return response;
            }).catch(function(response){
                console.log("[Error] [addGameSession] . "+response.status+" : "+response.statusText);
            });
        },
        deleteGameSession: function(gameSessionId){
            var url = "http://localhost:3000/gameSessions/"+gameSessionId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [deleteGameSession] . "+response.status+" : "+response.statusText);
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
        getGames: function(){
            var url = "http://localhost:3000/games";
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getGames] . "+response.status+" : "+response.statusText);
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
        },
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