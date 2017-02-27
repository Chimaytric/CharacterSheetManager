function characterSheetController($state, $stateParams, characterSheetFactory){
    console.log('characterSheet component');

    var vm = this;

    if($stateParams.characterData !== null && $stateParams.template !== null && $stateParams.gameSessionId !== null && $stateParams.characterId !== null){
        vm.characterData = $stateParams.characterData;
        vm.gameSessionId = $stateParams.gameSessionId;
        vm.characterId = $stateParams.characterId;
        characterSheetFactory.getTemplateById($stateParams.template).then(function(template){
            vm.template = template;
        });
    } else
        $state.go('home');

    vm.saveCharacterSheet = function(){
        characterSheetFactory.getGameSessionById(vm.gameSessionId).then(function(gameSession){
            var currentGameSession = gameSession;
            currentGameSession.characters.forEach(function(character, index){
                if(character.player === vm.characterId){
                    currentGameSession.characters[index].characterSheet = vm.characterData;
                    characterSheetFactory.saveCharacterSheet(vm.gameSessionId, currentGameSession).then(function(response){
                        console.log(response);
                    });
                }
            })
        });
    }
}

characterSheetController.$inject = ['$state', '$stateParams', 'characterSheetFactory'];

angular.module('characterSheetmanager.characterSheetComponent', []).component('characterSheetComponent', {
    templateUrl: 'characterSheet/characterSheet.component.html',
    controller: characterSheetController,
    controllerAs: "characterSheetCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory('characterSheetFactory', function($http){
    return {
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
        saveCharacterSheet: function(gameSessionId, gameSession){
            var url = "http://localhost:3000/gameSessions/"+gameSessionId;
            return $http({
                method: 'PATCH',
                url: url,
                headers : {
                    'Content-Type': 'application/json'
                },
                data: gameSession
            }).then(function(response){
                return response;
            }).catch(function(response){
                console.log("[Error] [saveCharacterSheet] . "+response.status+" : "+response.statusText);
            });
        }
    }
});