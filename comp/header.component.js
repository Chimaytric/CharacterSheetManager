function HeaderController($timeout, $mdSidenav){
    console.log('Header component');

    var vm = this;

    vm.toggleSidenav = function(){
        $mdSidenav('left').toggle();
    }

}

HeaderController.$inject = ['$timeout', '$mdSidenav'];

angular.module('characterSheetmanager.headerComponent', []).component('headerComponent', {
    templateUrl: 'comp/header.component.html',
    controller: HeaderController,
    controllerAs: "headerCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
});