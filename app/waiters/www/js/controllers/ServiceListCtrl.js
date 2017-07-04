/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')

    .controller('ServiceListCtrl',
        [ '$scope', '$state', '$stateParams','$ionicPopup', '$ionicLoading', '$ionicHistory',
            '$localstorage', '$ionicSlideBoxDelegate', '$cordovaToast','$cordovaDevice','BlueTeam', 'RagnarSocial',
            function ($scope, $state, $stateParams, $ionicPopup, $ionicLoading, $ionicHistory, $localstorage,
                      $ionicSlideBoxDelegate, $cordovaToast, $cordovaDevice, BlueTeam,RagnarSocial) {

                //JSON.parse()
                $scope.type = $stateParams.type;

                $scope.datetimeValue = new Date();
                $scope.datetimeValue.setHours(7);
                $scope.datetimeValue.setMinutes(0);

                if ($localstorage.get('user_id') === undefined || $localstorage.get('user_id') === "") {
                    $ionicHistory.clearHistory();
                    $state.go('reg');
                    return;
                }

                console.log($localstorage.get('user'));
                $scope.user = JSON.parse($localstorage.get('user'));

                $scope.user_id = $localstorage.get('user_id');
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



                $scope.post = {};

                $scope.postSch = function (test,postId) {
                  console.log(test,$scope.post.drv,postId,$scope.datetimeValue);
                    $scope.post.scheduled = test;
                    $scope.post.status = "approved";

                    RagnarSocial.sendPostMessage($scope.user.company_id,$scope.user.id,postId,$scope.post)
                        .then(function (d) {
                            $scope.hide();
                            console.log(JSON.stringify(d));

                        });

                };

                $scope.addPost = function(){

                    var sendInfoPopup = $ionicPopup.show({
                        template:
                            'Title:<input type="text" ng-model="post.title"/><br>Description:<input type="text" ng-model="post.message"/>',
                        title: '<h4><b>Post Creation Request</b></h4>',
                        subTitle: '<h5> please give use following details</h5>',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>Create Post</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.post.message) {
                                        //don't allow the user to close unless he enters wifi password
                                        e.preventDefault();

                                    } else {

                                        return $scope.post.message;
                                    }
                                }
                            }
                        ]
                    });

                    sendInfoPopup.then(function (res) {
                        console.log("tep", res);
                        if (res) {
                            RagnarSocial.createPost($scope.user.company_id,$scope.user.id,$scope.post)
                                .then(function (d) {
                                    $scope.hide();
                                    console.log(JSON.stringify(d));

                                });
                        }
                    });

                };


                $scope.post.message = "";
                $scope.rejectPost = function(postId){
                    $scope.postId = postId;
                    $scope.post.status = 'rejected';

                    var sendInfoPopup = $ionicPopup.show({
                        template: '<input type="text" ng-model="post.message"/>',
                        title: '<h4><b> Can we know, why are you rejecting it?</b></h4>',
                        subTitle: '<h5> please type you message</h5>',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>Send</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.post.message) {
                                        //don't allow the user to close unless he enters wifi password
                                        e.preventDefault();

                                    } else {

                                        return $scope.post.message;
                                    }
                                }
                            }
                        ]
                    });

                    sendInfoPopup.then(function (res) {
                        console.log("tep", res);
                        if (res) {
                            $scope.postMessage();
                        }
                    });

                };
                $scope.postMessage = function () {

                    $scope.show();


                    RagnarSocial.sendPostMessage($scope.user.company_id,$scope.user.id,$scope.postId,$scope.post)
                        .then(function (d) {
                            $scope.hide();
                            console.log(JSON.stringify(d));

                        });
                };
                //scope.show();


                $scope.doRefresh = function() {
                    console.log('do refresh go called',$scope.user.company_id,$scope.user.id,$scope.type);
                    RagnarSocial.getPostsByType($scope.user.company_id,$scope.user.id,$scope.type).then(function (d) {

                        $scope.posts = d.posts;
                        console.log(JSON.stringify($scope.posts));

                    })
                        .finally(function () {
                            // Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.refreshComplete');
                        });



                };
                $scope.doRefresh();

            }]);
