function SettingsController(settingsFactory){
    console.log('Settings component');

    var vm = this;

    settingsFactory.getSettings().then(function(settings){
        vm.settings = settings;
        if(vm.settings.theme !== 0){
            settingsFactory.getThemeById(vm.settings.theme).then(function(theme){
                vm.currentTheme = theme;
                vm.newTheme = vm.currentTheme;
            });
        }
    });
    settingsFactory.getThemes().then(function(themes){
        vm.themes = themes;
        vm.themes.push({
            id: 0,
            name: "Default theme"
        });
    });

    vm.applyNewTheme = function(){
        vm.settings.theme = vm.newTheme.id;
        vm.currentTheme = vm.newTheme;
        settingsFactory.applyNewTheme(vm.settings).then(function(response){
            vm.parent.settings.theme = vm.newTheme.id;
            vm.parent.currentTheme = vm.newTheme;
        });
    }

}

SettingsController.$inject = ['settingsFactory'];

angular.module('characterSheetmanager.settingsComponent', []).component('settingsComponent', {
    templateUrl: 'settings/settings.component.html',
    controller: SettingsController,
    controllerAs: "settingsCtrl",
    require: {
        parent: '^rootComponent'
    },
    bindings: {}
}).factory('settingsFactory', function($http){
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
        getThemes: function(){
            var url = "http://localhost:3000/themes";
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            }).catch(function(response){
                console.log("[Error] [getThemes] . "+response.status+" : "+response.statusText);
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
        },
        applyNewTheme: function(settings){
            var url = "http://localhost:3000/settings";
            return $http({
                method: 'PATCH',
                url: url,
                headers : {
                    'Content-Type': 'application/json'
                },
                data: settings
            }).then(function(response){
                return response;
            }).catch(function(response){
                console.log("[Error] [applyNewTheme] . "+response.status+" : "+response.statusText);
            });
        }
    }
});