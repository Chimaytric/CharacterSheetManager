function PlayersController(playersFactory, $mdDialog){
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
        });
    }
    vm.getPlayers();

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
}

PlayersController.$inject = ['playersFactory', '$mdDialog'];

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