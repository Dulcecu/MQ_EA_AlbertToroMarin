(function() {
    'use strict';
    var app = angular.module('mainApp');
    app.controller('userCtrl', ['userSRV','$scope', function (userSRV,$scope) {

        $scope.users = [];
        $scope.subjectsdb = [];
        $scope.subjects=[];



        $scope.userAdd = function(){
            var newUser = {
            name: $scope.userName,
            study: $scope.userStudy,
            phonename:$scope.userPhoneName,
            phone:$scope.userPhone,
            address:$scope.userAddress
        };
        userSRV.pushUser(newUser,function (users) {
            $scope.userName = "";
            $scope.userStudy=""
            $scope.userPhone=""
            $scope.userAddress=""
            $scope.userPhoneName=""
            $scope.users = users;
        });
            };
        $scope.filterDB=function(){

            userSRV.filterdb( $scope.filterdb,function (users) {

                $scope.users = users;
                $scope.filterdb=""
            })
        };

        $scope.filterSDB=function(){

            userSRV.filtersdb( $scope.filtersdb,function (users) {

                $scope.users = users;
                $scope.filtersdb=""
            })
        };


        $scope.addsubject=function(){
            var data={name:$scope.subjectname}

            userSRV.addsub(data,function () {

               location.reload();
            })
        };

        $scope.detailofuser=function(){
            var data={name:$scope.username}
            userSRV.userdetail(data,function (subjects) {

                $scope.subjects = subjects;
                $scope.username="";
            })
        };

        $scope.showList = function() {
            userSRV.getUsers(function (users) {
                console.log(users)
                $scope.users = users;
            });
        };


        angular.element(document).ready(function () {
            userSRV.getSubjectsName(function (subjects) {
                $scope.subjectsdb = subjects;
            });
        });

        $scope.updatesub=function(){
            var data = {
                name: $scope.userName2,
                subject: $scope.subjectName.split("\n")[0]
            };
            $scope.userName = "";
            userSRV.updateSubject(data,function (list) {

            });
            $scope.userName2="";
            $scope.subjectName="";

        };
    }]);
})();