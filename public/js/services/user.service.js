(function() {
    'use strict';
    var app = angular.module('mainApp');
    app.service('userSRV', ['$http',function ($http) {

        this.pushUser = function (newUser, callback) {
            var req = {
                method: 'POST',
                url: '/push',
                headers: {'Content-Type': 'application/json'},
                data: newUser

            };
            $http(req).then(function () {
                callback("Added correctly");
            });
        };
        this.addsub = function (newsub,callback) {
            var req = {
                method: 'POST',
                url: '/pushsub',
                headers: {'Content-Type': 'application/json'},
                data: newsub

            };
            $http(req).then(function (response) {

                callback(response.data)

            });
        };
        this.getUsers = function (callback) {

            $http.get('/all').then(function (response) {
                callback (response.data);
            });

        };
        this.getSubjectsName = function (callback) {

            $http.get('/allsubjects').then(function (response) {
                callback (response.data);
            });

        };

        this.filterdb =function (data,callback) {

            var req = {
                method: 'GET',
                data: data,
                url: '/filterdb/'+data,
                headers: {'Content-Type': 'application/json'}

            };

             $http(req).then(function (response) {

              callback(response.data)

             });
        };

        this.filtersdb =function (data,callback) {

            var req = {
                method: 'GET',
                data: data,
                url: '/filtersdb/'+data,
                headers: {'Content-Type': 'application/json'}

            };

            $http(req).then(function (response) {

                callback(response.data)

            });
        };

        this.userdetail= function (data, callback) {
            var req = {
                method: 'POST',
                url: '/userdetail',
                headers: {'Content-Type': 'application/json'},
                data: data

            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        };
        this.updateSubject=function(data,callback){
            var req = {
                method: 'PUT',
                url: '/updsub',
                headers: {'Content-Type': 'application/json'},
                data: data
            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        }


    }]);
})();