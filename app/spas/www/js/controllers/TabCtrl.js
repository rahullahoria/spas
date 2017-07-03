/**
 * Created by spider-ninja on 11/28/16.
 */
angular.module('starter.controllers')


    .controller('TabCtrl', function ($scope, $state, $ionicPopup, $cordovaSocialSharing, $ionicPlatform, $ionicModal, $timeout, $ionicHistory, $cordovaToast, $localstorage) {

        $scope.count = 0;
        $ionicPlatform.registerBackButtonAction(function (event) {
            if ($state.current.name == "tab.service-list") {
                $cordovaToast.showLongBottom('Press 2 more time to exit').then(function (success) {
                    // success
                }, function (error) {
                    // error
                });

                $scope.count++;
                if ($scope.count >= 3)
                    navigator.app.exitApp();
            }

            if ($state.current.name == "reg") {
                $cordovaToast.showLongBottom('Press 2 more time to exit').then(function (success) {
                    // success
                }, function (error) {
                    // error
                });

                $scope.count++;
                if ($scope.count >= 3)
                    navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);


    })


;