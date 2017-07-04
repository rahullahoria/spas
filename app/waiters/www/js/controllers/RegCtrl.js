/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('RegCtrl', function ($sce,$scope, $state, $ionicLoading, $timeout, $ionicHistory,
                                     $cordovaGeolocation, $localstorage,
                                     $ionicPlatform,$cordovaFile,
                                     $cordovaFileTransfer, SPAS, $cordovaDevice, $ionicPopup, $window,
                                     $cordovaLocalNotification, $cordovaNetwork, $cordovaCamera, BlueTeam,RagnarSocial) {


        console.log("regcont started");

        //photo,name,mobile,password,address,experience,services,city,area

        $scope.user = {};
        $scope.data = {};
        $scope.feedbackD = {};
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

        $scope.number = 16;
        $scope.getNumber = function(num) {
            return new Array(num);
        }








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








        $scope.pwdError = false;
        $scope.first = false;









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
            $scope.scheduleSingleNotification = function (tableNo) {
                console.log("inside notification");
                $cordovaLocalNotification.schedule({
                    id: 1+tableNo,
                    title: 'Customer Need Help',
                    text: 'Table No: '+tableNo,
                    sound: '/img/siren.mp3',
                    data: {
                        customProperty: 'custom value'
                    }
                }).then(function (result) {
                    // ...
                    navigator.vibrate(2000);
                    console.log(JSON.stringify(result));
                },function (err) {
                    // ...
                    console.log(JSON.stringify(err));
                });
            };


            $scope.getReq();






        });

        $scope.status = new Array(21);

        $scope.getReq = function () {
            SPAS.GetStoreTableReq(1)
                .then(function (d) {
                    tables = d.tables;
                    console.log(JSON.stringify(d));

                    for(var i=0; i<tables.length;i++){
                        $scope.scheduleSingleNotification(tables[i].table_id);
                        $scope.status[tables[i].table_id] = 1;
                    }
                    $timeout(function(){$scope.getReq()}, 10000);


                },function(err){
                    console.log(JSON.stringify(err));
                    $timeout($scope.getReq(), 10000);
                });
        };

        $scope.updateStatus = function(tableId) {
            console.log(tableId);
            $scope.status[tableId] = 0;
            SPAS.UpdateTableStatus(1,1,tableId)
                .then(function(d){

                }, function(err){
                    console.log(JSON.stringify(err));
                })

        };









        $scope.basicRegDone = false;
        $scope.userServices = [];




    })

;
