function HeaderController(){
    console.log('Header component');
}

HeaderController.$inject = [];

angular.module('characterSheetmanager.headerComponent', []).component('headerComponent', {
    templateUrl: 'comp/header.component.html',
    controller: HeaderController,
    controllerAs: "headerCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
});