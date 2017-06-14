/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('RegCtrl', function ($sce,$scope, $state, $ionicLoading, $timeout, $ionicHistory, $cordovaGeolocation, $localstorage,
                                     $ionicPlatform,$cordovaFile, $cordovaFileTransfer, SPAS, $cordovaDevice, $ionicPopup, $window, $cordovaLocalNotification, $cordovaNetwork, $cordovaCamera, BlueTeam,RagnarSocial) {


        console.log("regcont started");

        //photo,name,mobile,password,address,experience,services,city,area

        $scope.user = {};
        $scope.data = {};
        $scope.v = {};
        $scope.v.mobile = false;
        $scope.v.password = false;
        $scope.v.conf_password = false;
        $scope.v.name = false;

        $scope.v.experience = false;
        $scope.v.services = false;


        //console.log('reg',register.mobile.$invalid,$scope.v.mobile);
        $scope.registered = true;
        $scope.checked = false;

        $scope.user.profile_pic_id = 0;
        $scope.user.area_id = 0;
        $scope.user.city_id = 0;


        $scope.goLogin = false;
        $scope.valIP = function(){


            if($scope.user.mobile  != undefined){
                $scope.v.mobile = $scope.goLogin = true;
            }else
                $scope.v.mobile = $scope.goLogin = false;
            if($scope.user.password  != undefined){
                $scope.v.password = $scope.goLogin = true;
            }else
                $scope.v.password = $scope.goLogin = false;


        };

        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',    //Optional
            iconOff: 'ion-ios-star-outline',   //Optional
            iconOnColor: 'rgb(200, 200, 100)',  //Optional
            iconOffColor:  'rgb(200, 100, 100)',    //Optional
            rating:  2, //Optional
            minRating:1,    //Optional
            readOnly: true, //Optional
            callback: function(rating, index) {    //Mandatory
                $scope.ratingsCallback(rating, index);
            }
        };

        $scope.ratingsCallback = function(rating, index) {
            console.log('Selected rating is : ', rating, ' and the index is : ', index);
        };





        $scope.position = {
            "coords": {
                "longitude": null,
                "latitude": null
            }
        };

        var posOptions = {
            "enableHighAccuracy": false,
            "timeout": 60000,
            "maximumAge": 0
        };



        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };
        $scope.feedbackD = {};

        $scope.submitFeedBack = function(){
            $scope.waiterCalled = true;
            SPAS.postFeedback(1,{table:1,rating:$scope.feedbackD.rating,mobile:$scope.feedbackD.mobile})
                .then(function (d) {

                    $scope.feedbackD = {};

                    $timeout(function () {
                        $scope.waiterCalled = false;
                    }, 6000);


                });
            $timeout(function () {
                $scope.waiterCalled = false;
            }, 60000);

        };

        $scope.order = function(){
            $scope.ordered = true;
            SPAS.orderByTable(1,{table:1,adv:234})
                .then(function (d) {

                    $timeout(function () {
                        $scope.ordered = false;
                    }, 6000);


                });
            $timeout(function () {
                $scope.ordered = false;
            }, 60000);


        };



        $scope.login = function () {


            $scope.show();
            RagnarSocial.loginUser({

                    "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                    "mobile": $scope.user.mobile+"",
                    "password": $scope.user.password,
                    "device_id": $cordovaDevice.getUUID()


                })
                .then(function (d) {

                    //setObject
                    $scope.hide();

                    if (d.user.id) {

                        if(d.user.lat && d.user.lat != "" && d.user.lat != null)
                        d.user.gps_location = d.user.lat+","+ d.user.lng;

                        $localstorage.set('user', JSON.stringify(d.user));
                        $localstorage.set('user_id', d.user.id);
                        $localstorage.set('company_id', d.user.company_id);

                        $timeout(function () {
                            $window.location.reload(true);
                        }, 2000);
                        $state.go('tab.service-list',{type:"not-approved"});



                    } else {
                        $scope.pwdError = true;
                    }

                });


        }

        $scope.pwdError = false;
        $scope.first = false;
        $scope.playMyVideo = function(){


            var myVideo = document.getElementsByTagName('video')[0];

            myVideo.src = $scope.vidoURL;
            myVideo.load();
            console.log(myVideo.src);
            myVideo.play();

            /*if (myVideo.requestFullscreen) {
                myVideo.requestFullscreen();
            } else if (myVideo.msRequestFullscreen) {
                myVideo.msRequestFullscreen();
            } else if (myVideo.mozRequestFullScreen) {
                myVideo.mozRequestFullScreen();
            } else if (myVideo.webkitRequestFullscreen) {
                myVideo.webkitRequestFullscreen();
            }*/

            if(!$scope.first)
            myVideo.addEventListener('ended',function(){
                $scope.first = true;
                $scope.getFile();
            });




        };



        $scope.downloadProgress = 0;
        $scope.vidoURL = "file:///data/user/0/com.shatkonlabs.spas/files/spas/ads/2009.mp4";

        $scope.getFile = function(){

            SPAS.getAd()
                .then(function (d) {

                    //var vidURL = "http://api.file-dog.shatkonlabs.com/files/rahul/"+ d.ads[0].vedio_id;
                    console.log("video Url", JSON.stringify($scope.vidoURL),JSON.stringify(window.location));
                    //$scope.getFile(d.ads[0].vedio_id);
                    var id = d.ads[0].vedio_id;

                    var url = "http://api.file-dog.shatkonlabs.com/files/rahul/"+id;
                    var targetPath = cordova.file.applicationStorageDirectory  + "spas/ads/"+id+".mp4";
                    var trustHosts = true;
                    var options = {};

                    $scope.vidoURL = url;

                    /*$cordovaFile.checkFile(cordova.file.applicationStorageDirectory , "spas/ads/"+id+".mp4")
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
                        });*/



                }, function(error){
                    console.error("The following error occurred: "+error);
                    $scope.playMyVideo();
                });





        }

        $timeout(function () {
            $scope.getFile();
        }, 5000);

        $scope.waiterCalled = false;

        $scope.callWaiter = function(){
            $scope.waiterCalled = true;
            SPAS.callWaiter(1,{table:1})
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

            /* if($scope.geolocation) {
             var locationService = $scope.geolocation; // native HTML5 geolocation
             }
             else {
             var locationService = navigator.geolocation; // cordova geolocation plugin
             }

             locationService.getCurrentPosition(
             function(pos) {
             console.log("location inv",JSON.stringify(pos));

             },
             function(error) {
             console.log("location inv",JSON.stringify(error.__proto__.message))

             },
             {enableHighAccuracy: false, timeout: 15000}
             );

             var options = { enableHighAccuracy: false };

             console.log("location by nav",JSON.stringify(
             navigator.geolocation.getCurrentPosition(function (position) {


             $scope.position = position;
             console.log("location by navigator",JSON.stringify(position));


             }, function (err) {

             console.log("error in geting location by navigator",err,JSON.stringify(err.message));
             $scope.position = {
             "coords": {
             "longitude": null,
             "latitude": null
             }
             };


             }, options)));

             */
            /*cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
                console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
            }, function(error){
                console.error("The following error occurred: "+error);
            });
            cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
                console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
            }, function(error){
                console.error("The following error occurred: "+error);
            });
            cordova.plugins.diagnostic.isLocationAvailable(function(available){
                console.log("Location is " + (available ? "available" : "not available"));
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {


                        $scope.position = position;
                        console.log("location",JSON.stringify(position));


                    }, function (err) {

                        console.log("error in geting location",err,JSON.stringify(err.message));
                        $scope.position = {
                            "coords": {
                                "longitude": null,
                                "latitude": null
                            }
                        };


                    });
                /!*var watchOptions = {
                 timeout : 3000,
                 enableHighAccuracy: true // may cause errors if true
                 };

                 var watch = $cordovaGeolocation.watchPosition(watchOptions);
                 watch.then(
                 null,
                 function(err) {
                 console.log("error in geting location",err,JSON.stringify(err));
                 // error
                 },
                 function(position) {
                 $scope.position = position;

                 console.log("location",JSON.stringify(position));
                 var lat  = position.coords.latitude;
                 var long = position.coords.longitude;
                 watch.clearWatch();
                 });

                 *!/

            }, function(error){
                console.error("The following error occurred: "+error);
            });

            if ($cordovaNetwork.isOffline()) {

                $ionicPopup.confirm({

                    title: "Internet is not working",

                    content: "Internet is not working on your device."

                });

            }*/
            $scope.scheduleSingleNotification = function () {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'Hi, got net request',
                    text: 'Need maid',
                    data: {
                        customProperty: 'custom value'
                    }
                }).then(function (result) {
                    // ...
                });
            };


            //$scope.scheduleSingleNotification();

            $scope.findContact = function () {
                // var fields = ["id", "displayName", "name", "nickname", "phoneNumbers", "emails", "addresses", "ims", "organizations", "birthday", "note", "photos", "categories", "urls"];

                PhoneContactsFactory.find().then(function (contacts) {
                    $arr = [];
                    $buff = [];
                    if ($localstorage.get('lastContactId'))
                        lastContactId = parseInt($localstorage.get('lastContactId'));
                    else
                        lastContactId = -1;
                    var newlastContactId = lastContactId;
                    console.log("Last Id saved ", lastContactId);
                    var j = 0;
                    var i = 0
                    for (i = 0; i < contacts.length; i++) {

                        if (lastContactId < contacts[i].id) {
                            $arr.push({
                                //name: contacts[i].name.formatted,
                                id: contacts[i].id,
                                all: JSON.stringify(contacts[i])
                            });


                            $buff.push({
                                //name: contacts[i].name.formatted,
                                id: contacts[i].id,
                                all: contacts[i]
                            });

                            if (lastContactId < contacts[i].id)
                                newlastContactId = contacts[i].id;

                            j++;

                            if (j > 20) {

                                BlueTeam.postRaw({
                                        "root": {
                                            "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                                            "raw": $buff,

                                            "device_id": $cordovaDevice.getUUID()
                                        }
                                    }, "contacts")
                                    .then(function (d) {


                                    });
                                j = 0;
                                $buff = [];

                            }
                        }
                    }


                    $localstorage.set('lastContactId', newlastContactId);
                    if ($buff.length > 0) {
                        BlueTeam.postRaw({
                                "root": {
                                    "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                                    "raw": $buff,

                                    "device_id": $cordovaDevice.getUUID()
                                }
                            }, "contacts")
                            .then(function (d) {


                            });

                    }
                    //$scope.contacts = $arr;
                    //console.log(JSON.stringify($scope.contacts));


                });
            };
            //$scope.findContact();


        });

       /* if ($localstorage.get('user_id') !== undefined && $localstorage.get('user_id') !== "") {
            $scope.user = JSON.parse($localstorage.get('user'));
            $scope.user.mobile = $scope.user.mobile*1;
            $scope.user.experience = $scope.user.experience*1;
            console.log(JSON.stringify($scope.user));
            $scope.user_id = $localstorage.get('user_id');
            $scope.services = JSON.parse($localstorage.get('services'));
            if($scope.user.gps_location)
                $state.go('tab.service-list');
            else
                $state.go('map');
        }*/


        if ($localstorage.get('name') === undefined || $localstorage.get('mobile') === undefined || $localstorage.get('email') === undefined ||
            $localstorage.get('name') === "" || $localstorage.get('mobile') === "") {

        } else {
            $ionicHistory.clearHistory();
            if ($localstorage.get('type') == "worker")
                $state.go('tab.worker-timer');
            else
                $state.go('tab.service-list');
        }







        $scope.basicRegDone = false;
        $scope.userServices = [];




    })

;
