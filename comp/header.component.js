function HeaderController(){
    console.log('Header component');
}

HeaderController.$inject = [];

angular.module('characterSheetmanager.headerComponent', ['ui.bootstrap']).component('headerComponent', {
    templateUrl: 'comp/header.component.html',
    controller: HeaderController,
    controllerAs: "headerCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
});