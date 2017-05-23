/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')

    .controller('ServiceListCtrl',
        [ '$scope', '$state', '$ionicPopup', '$ionicLoading', '$ionicHistory',
            '$localstorage', '$ionicSlideBoxDelegate', '$cordovaToast','$cordovaDevice','BlueTeam', 'RagnarSocial',
            function ($scope, $state, $ionicPopup, $ionicLoading, $ionicHistory, $localstorage,
                      $ionicSlideBoxDelegate, $cordovaToast, $cordovaDevice, BlueTeam,RagnarSocial) {

                //JSON.parse()


                if ($localstorage.get('user_id') === undefined || $localstorage.get('user_id') === "") {
                    $ionicHistory.clearHistory();
                    $state.go('reg');
                    return;
                }

                console.log($localstorage.get('user'));
                $scope.user = JSON.parse($localstorage.get('user'));
                if($scope.user.gps_location){

                }
                else {
                    $state.go('map');
                    return;
                }
                $scope.user_id = $localstorage.get('user_id');
                $scope.services = JSON.parse($localstorage.get('services'));
                $scope.campaignRequest = {};


                //$scope.campaignRequest.device = $cordovaDevice.getUUID();


                $scope.show = function () {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                };
                $scope.hide = function () {
                    $ionicLoading.hide();
                };

                $scope.search = function (){
                    console.log($scope.search.keywords);
                    BlueTeam.search($scope.search.keywords).then(function (d) {

                        $scope.searchResults = d.allServices;
                        console.log(JSON.stringify($scope.searchResults));
                        $scope.hide();
                    });
                };

                $scope.createCampaigning = function(type){

                    $scope.campaignRequest.type = type;
                    var sendInfoPopup = $ionicPopup.show({
                        template: '<input type="number" ng-model="campaignRequest.amount"/>',
                        title: '<h4><b>'+type.toUpperCase() +' Campaigning</b></h4>',
                        subTitle: '<h5>You have '+ $scope.serviceProviderD[type+'_credit'] + ' created<br/> How much you want to us?</h5>',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>USE</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.campaignRequest.amount) {
                                        //don't allow the user to close unless he enters wifi password
                                        e.preventDefault();

                                    } else {

                                        return $scope.campaignRequest.amount;
                                    }
                                }
                            }
                        ]
                    });

                    sendInfoPopup.then(function (res) {
                        console.log("tep", res);
                        if (res) {
                            $scope.sendCampaigning();
                        }
                    });

                };
                $scope.sendCampaigning = function () {

                    $scope.show();


                    console.log(JSON.stringify($scope.position));
                    //$scope.campaignRequest.location = $scope.position.coords.latitude + ',' + $scope.position.coords.longitude;
                    BlueTeam.createCampaigningRequest($scope.user_id,$scope.campaignRequest)
                        .then(function (d) {
                            $scope.hide();

                            $scope.campaignRequest = {};
                            console.log(d.campaign_request.id);
                            if(d.campaign_request.id) {

                                $cordovaToast.showLongBottom('Request for Campaigning Sent, Successfully').then(function (success) {
                                    // success
                                }, function (error) {
                                    // error
                                });
                            } else {
                                $cordovaToast.showLongBottom('Sorry, Something went wrong!').then(function (success) {
                                    // success
                                }, function (error) {
                                    // error
                                });
                            }

                        });
                };
                //scope.show();


                $scope.doRefresh = function() {
                    RagnarSocial.getPostsByType(1,1,'approved').then(function (d) {

                        $scope.posts = d.posts;
                        console.log(JSON.stringify($scope.posts));

                    });



                };
                $scope.doRefresh();

            }]);
