/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('MonthlyIncomeCtrl', function ($scope, $state, $ionicLoading, $ionicHistory, $localstorage, BlueTeam) {

        if ($localstorage.get('user_id') === undefined || $localstorage.get('user_id') === "") {
            $ionicHistory.clearHistory();
            $state.go('reg');
            return;
        }

        console.log($localstorage.get('user'));
        $scope.user = JSON.parse($localstorage.get('user'));
        $scope.user_id = $localstorage.get('user_id');
        $scope.services = JSON.parse($localstorage.get('services'));

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };
        $scope.thisMonthTotal = 0;

        $scope.monthYear = "";



        $scope.doRefresh = function(d){
            $scope.monthYear = d;
            $scope.thisMonthTotal = 0;
            console.log($scope.monthYear);
            BlueTeam.getMonthlyIncome($scope.user_id,$scope.monthYear).then(function (d) {

                $scope.show();

                $scope.invoices = d.invoices.invoices;
                $scope.months = d.invoices.months;

                for(var i =0; i < $scope.invoices.length; i++){
                    //new Date(millis)
                    $scope.invoices[i].creation = new Date($scope.invoices[i].creation);
                    $scope.thisMonthTotal += 1*$scope.invoices[i].amount ;
                }

                $scope.hide();
            });
        };

        $scope.doRefresh($scope.monthYear);


    });
