function RootController(rootFactory){
    console.log('Root component');

    var vm = this;

    rootFactory.getSettings().then(function(settings){
        vm.settings = settings;
        if(vm.settings.theme !== 0){
            rootFactory.getThemeById(vm.settings.theme).then(function(theme){
                vm.currentTheme = theme;
            });
        }
    });
}

RootController.$inject = ['rootFactory'];

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