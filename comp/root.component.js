function RootController(rootFactory, $mdSidenav){
    console.log('Root component');

    var vm = this;

    vm.toggleSidenav = function(){
        $mdSidenav('left').toggle();
    }
}

RootController.$inject = ['rootFactory', '$mdSidenav'];

angular.module('characterSheetmanager.rootComponent', []).component('rootComponent', {
    templateUrl: 'comp/root.component.html',
    controller: RootController,
    controllerAs: "rootCtrl",
    bindings: {}
}).factory('rootFactory', function($http){
    return {
        getSettings: function(){
            var url = "http://localhost:3000/settings";
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getSettings] . "+response.status+" : "+response.statusText);
            });
        },
        getThemeById: function(themeId){
            var url = "http://localhost:3000/themes/"+themeId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getThemeById] . "+response.status+" : "+response.statusText);
            });
        }
    }
});