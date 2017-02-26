function characterSheetController($state, $stateParams){
    console.log('characterSheet component');

    var vm = this;

    console.log($stateParams.characterSheet);
    if($stateParams.characterSheet !== null){
        vm.characterSheet = $stateParams.characterSheet;
    } else
        $state.go('home');
}

characterSheetController.$inject = ['$state', '$stateParams'];

angular.module('characterSheetmanager.characterSheetComponent', []).component('characterSheetComponent', {
    templateUrl: 'characterSheet/characterSheet.component.html',
    controller: characterSheetController,
    controllerAs: "characterSheetCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
});