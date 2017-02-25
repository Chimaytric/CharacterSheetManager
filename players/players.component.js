function PlayersController(playersFactory){
    console.log('Players controller');

    var vm = this;

    vm.newPlayer = {
        gender: "0"
    };

    vm.createPlayer = function(){
        if(vm.newPlayer.gender === "0"){
            vm.newPlayer.gender = 0;
        } else
            vm.newPlayer.gender = 1;
        console.log(vm.newPlayer);
        playersFactory.addPlayer(vm.newPlayer).then(function(response){
            console.log(response);
            vm.getPlayers();
        })
    }

    vm.deletePlayer = function(playerId){
        if(confirm('Are you sure you want to delete this player ?')){
            playersFactory.deletePlayer(playerId).then(function(response){
                console.log(response);
                vm.getPlayers();
            });
        }
    }

    vm.getPlayers = function(){
        playersFactory.getPlayers().then(function(players){
            vm.players = players;
            vm.players.forEach(function(player, index){
                if(player.gender === 0){
                    player.image = "https://www.w3schools.com/bootstrap/img_avatar3.png";
                } else
                    player.image = "https://www.w3schools.com/bootstrap/img_avatar4.png";
            });
        });
    }
    vm.getPlayers();
}

PlayersController.$inject = ['playersFactory'];

angular.module('characterSheetmanager.playersComponent', []).component('playersComponent', {
    templateUrl: 'players/players.component.html',
    controller: PlayersController,
    controllerAs: "playersCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory('playersFactory', function($http){
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
        },
        addPlayer: function(player){
            var url = "http://localhost:3000/players";
            return $http({
                method: 'POST',
                url: url,
                headers : {
                    'Content-Type': 'application/json'
                },
                data: player
            }).then(function(response){
                return response;
            }).catch(function(response){
                console.log("[Error] [getPlayers] . "+response.status+" : "+response.statusText);
            });
        },
        deletePlayer: function(playerId){
            var url = "http://localhost:3000/players/"+playerId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response){
                return response;
            }).catch(function(response){
                console.log("[Error] [getPlayers] . "+response.status+" : "+response.statusText);
            });
        }
    }
});