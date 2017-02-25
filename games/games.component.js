function GamesController(gamesFactory){
    console.log('Games controller');

    var vm = this;

    vm.templates = [];
    gamesFactory.getTemplates().then(function(templates){
        vm.templates = templates;
    });

    vm.getGames = function(){
        gamesFactory.getGames().then(function(games){
            vm.games = games;
            vm.games.forEach(function(game){
                gamesFactory.getTemplateById(game.template).then(function(template){
                    game.template = template;
                });
            });
        });
    }
    vm.getGames();


    vm.newGame = {};
    vm.createGame = function(){
        vm.newGame.template = vm.newGame.template.id;
        gamesFactory.addGame(vm.newGame).then(function(response){
            console.log(response);
            vm.getGames();
            vm.newGame = {};
        });
    }

    vm.deleteGame = function(gameId){
        if(confirm('Are you sure you want to delete this game ?')){
            gamesFactory.deleteGame(gameId).then(function(response){
                console.log(response);
                vm.getGames();
            });
        }
    }
}

GamesController.$inject = ['gamesFactory'];

angular.module('characterSheetmanager.gamesComponent', []).component('gamesComponent', {
    templateUrl: 'games/games.component.html',
    controller: GamesController,
    controllerAs: "gamesCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory('gamesFactory', function($http){
    return {
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
        addGame: function(game){
            var url = "http://localhost:3000/games";
            return $http({
                method: 'POST',
                url: url,
                headers : {
                    'Content-Type': 'application/json'
                },
                data: game
            }).then(function(response){
                return response;
            }).catch(function(response){
                console.log("[Error] [addgame] . "+response.status+" : "+response.statusText);
            });
        },
        deleteGame: function(gameId){
            var url = "http://localhost:3000/games/"+gameId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [deleteGame] . "+response.status+" : "+response.statusText);
            });
        },
        getTemplateById: function(templateId){
            var url = "http://localhost:3000/templates/"+templateId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getTemplateById] . "+response.status+" : "+response.statusText);
            });
        },
        getTemplates: function(){
            var url = "http://localhost:3000/templates";
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getTemplates] . "+response.status+" : "+response.statusText);
            });
        }
    }
});