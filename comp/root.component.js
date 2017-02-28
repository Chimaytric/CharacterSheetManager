function RootController(){
    console.log('Root component');

    var vm = this;

    vm.theme = "toto";
}

RootController.$inject = [];

angular.module('characterSheetmanager.rootComponent', []).component('rootComponent', {
    templateUrl: 'comp/root.component.html',
    controller: RootController,
    controllerAs: "rootCtrl",
    bindings: {}
});