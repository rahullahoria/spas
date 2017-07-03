/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('RegCtrl', function ($sce,$scope, $state, $ionicLoading, $timeout, $ionicHistory, $cordovaGeolocation, $localstorage,
                                     $ionicPlatform,$cordovaFile, $cordovaFileTransfer, $ionicPopup, SPAS, $ionicNavBarDelegate) {


        console.log("regcont started");

        $scope.user = {};
        $scope.data = {};
        $scope.feedbackD = {};
        $scope.feedbackD.rating = 4;

        $ionicNavBarDelegate.showBackButton(false);

        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',    //Optional
            iconOff: 'ion-ios-star-outline',   //Optional
            iconOnColor: 'rgb(200, 200, 100)',  //Optional
            iconOffColor:  'rgb(200, 100, 100)',    //Optional
            rating:  $scope.feedbackD.rating, //Optional
            minRating:1,    //Optional
            readOnly: true, //Optional
            callback: function(rating, index) {    //Mandatory
                $scope.ratingsCallback(rating, index);
            }
        };

        $scope.ratingsCallback = function(rating, index) {
            console.log('Selected rating is : ', rating, ' and the index is : ', index);
            $scope.feedbackD.rating = rating;
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };


        $scope.submitFeedBack = function(){
            //$scope.waiterCalled = true;
            SPAS.postFeedback(1,{table:1,rating:$scope.feedbackD.rating,mobile:$scope.feedbackD.mobile})
                .then(function (d) {

                    $scope.feedbackD = {};
                    $scope.giveFeedback = false;

                   /* $timeout(function () {
                        $scope.waiterCalled = false;
                    }, 6000);*/


                });
           /* $timeout(function () {
                $scope.waiterCalled = false;
            }, 60000);*/

        };

        $scope.order = function(){
            $scope.ordered = true;
            SPAS.orderByTable(1,{table:1,adv:234})
                .then(function (d) {

                    $timeout(function () {
                        $scope.ordered = false;
                    }, 60000);


                });
            $timeout(function () {
                $scope.ordered = false;
            }, 60000);


        };


        $scope.pwdError = false;
        $scope.first = false;
        $scope.playMyVideo = function(){


            var myVideo = document.getElementsByTagName('video')[0];

            myVideo.src = $scope.vidoURL;
            myVideo.load();

            console.log(myVideo.src);
            myVideo.play();

            myVideo.muted = true;
           /* if (myVideo.requestFullscreen) {
                myVideo.requestFullscreen();
            } else if (myVideo.msRequestFullscreen) {
                myVideo.msRequestFullscreen();
            } else if (myVideo.mozRequestFullScreen) {
                myVideo.mozRequestFullScreen();
            } else if (myVideo.webkitRequestFullscreen) {
                myVideo.webkitRequestFullscreen();
            }*/

            if(!$scope.first) {

                myVideo.addEventListener('error', function(event) {
                    $timeout(function () {
                        $scope.getFile();
                    }, 5000);
                });
                myVideo.addEventListener('ended', function () {
                    $scope.first = true;
                    $scope.getFile();
                });
            }




        };



        $scope.downloadProgress = 0;
        $scope.vidoURL = "";

        $scope.getFile = function(){
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $timeout(function () {
                        $scope.getFile();
                    }, 10000);

                    return true;

                }

            }

            SPAS.getAd()
                .then(function (d) {

                    //var vidURL = "http://api.file-dog.shatkonlabs.com/files/rahul/"+ d.ads[0].vedio_id;
                    console.log("video Url", JSON.stringify($scope.vidoURL),JSON.stringify(window.location));
                    //$scope.getFile(d.ads[0].vedio_id);
                    var id = d.ads[0].vedio_id;

                    var url = "http://api.file-dog.shatkonlabs.com/files/rahul/"+id;
                    var targetPath = cordova.file.dataDirectory  + "spas/ads/"+id+".mp4";
                    var trustHosts = true;
                    var options = {};

                    //$scope.vidoURL = url;

                    $cordovaFile.checkFile(cordova.file.dataDirectory , "spas/ads/"+id+".mp4")
                        .then(function (success) {
                            // success
                            $scope.vidoURL = targetPath;

                            $scope.playMyVideo();

                        }, function (error) {
                            // error
                            $scope.vidoURL = url;
                            $scope.playMyVideo();
                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                .then(function(result) {
                                    // Success!

                                    //$scope.vidoURL = targetPath;
                                    console.log($scope.vidoURL, "success");
                                    //alert("done sucess");
                                }, function(err) {
                                    // Error
                                    console.log(JSON.stringify(cordova.file),JSON.stringify(err),url,"errir");
                                }, function (progress) {
                                    $timeout(function () {
                                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                        //console.log("Downloading progress",$scope.downloadProgress);
                                    });
                                });
                        });



                }, function(error){
                    console.error("The following error occurred: "+error);
                    $scope.playMyVideo();
                });





        }



        $scope.waiterCalled = false;

        $scope.callWaiter = function(){
            $scope.waiterCalled = true;
            SPAS.callWaiter(1,{table:5})
                .then(function (d) {

                    $timeout(function () {
                        $scope.waiterCalled = false;
                    }, 6000);


                });
            $timeout(function () {
                $scope.waiterCalled = false;
            }, 60000);
        }



        $ionicPlatform.ready(function () {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    /*$ionicPopup.confirm({
                            title: "Internet Disconnected",
                            content: "The internet is disconnected on your device."
                        })
                        .then(function(result) {
                            if(!result) {
                                ionic.Platform.exitApp();
                            }
                        });*/
                }
                else {
                    $timeout(function () {
                        $scope.getFile();
                    }, 10000);
                }
            }
            else {
                $timeout(function () {
                    $scope.getFile();
                }, 10000);
            }




        });

        $scope.basicRegDone = false;
        $scope.userServices = [];

    })

;
