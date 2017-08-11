angular.module('starter.services', [])

    .factory('SPAS', function ($http) {
        var urlRS = "https://api.ragnar.shatkonlabs.com";
        var urlSPAS = "https://api.spas.shatkonlabs.com";
        return {
            getAd: function (id,last) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(urlSPAS + '/bill_board/'+id+'?type='+last.type+'&last_ad_id='+last.vedio_id);

                var promise = $http.get(urlSPAS + '/bill_board/'+id+'?type='+last.type+'&last_ad_id='+last.vedio_id).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(urlSPAS + '/bill_board/'+id+'?type='+last.type+'&last_ad_id='+last.vedio_id,JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getPostsByType: function (orgId, userId, type) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlRS + '/org/'+orgId+'/user/'+userId+'/posts?type=' + (type ? type : "")).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            orderByTable: function (bbId,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSPAS + '/bill_board/'+bbId+'/order', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postFeedback: function (bbId,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSPAS + '/bill_board/'+bbId+'/feedback', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            callWaiter: function (bbId,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSPAS + '/bill_board/'+bbId+'/waiter', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            createPost: function (orgId, userId,  data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlRS + '/org/'+orgId+'/user/'+userId+'/posts', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            loginUser: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise

                console.log(JSON.stringify(data));
                var promise = $http.post(urlRS + '/auth', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response.data));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        }

    })

    .factory('RagnarSocial', function ($http) {
        var urlRS = "http://api.ragnar.shatkonlabs.com";
        return {
            getPostsByType: function (orgId, userId, type) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlRS + '/org/'+orgId+'/user/'+userId+'/posts?type=' + (type ? type : "")).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            sendPostMessage: function (orgId, userId, postId, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlRS + '/org/'+orgId+'/user/'+userId+'/post/'+postId, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            createPost: function (orgId, userId,  data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlRS + '/org/'+orgId+'/user/'+userId+'/posts', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            loginUser: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise

                console.log(JSON.stringify(data));
                var promise = $http.post(urlRS + '/auth', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response.data));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        }

    })

    .factory('BlueTeam', function ($http) {
        // Might use a resource here that returns a JSON array

        var url = "https://blueteam.in/api";
        var urlSP = "https://blueteam.in/sp_api";
        var urlWazir = "https://blueteam.in/wazir_api";
        return {
            getServices: function (type) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/services' + (type ? type : "")).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getWork: function (worker_id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/work/' + worker_id + "?current_time=" + new Date()).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getUserById: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/workers/' + id ).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getRefWorkers: function (user_id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/workers?user_id=' + user_id ).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postWork: function (worker_id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/work/' + worker_id, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            calPrice: function (service, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/cal-price/' + service, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            checkMobile: function (mobile) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/service_provider?mobile=' + mobile).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getPrice: function (service) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/pricings/' + service).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getMysr: function (mobile) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/mysr/' + mobile).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getMysrByCEMId: function (cem_user_id, status) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/cem_mysr/' + cem_user_id + '?status=' + status).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getFaq: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/FAQ').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getTnc: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/tnc').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getServiceProviderServices: function (filter) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/services'+filter).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getCities: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/cities').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getCityAreas: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/cities/'+id+'/areas').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getServiceProviders: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/service/'+ id).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getMonthlyIncome: function (id,date) {
                var str = (date == "")?"":"?date="+date;
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/service_provider/'+ id + '/invoice'+str).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            search: function (keywords) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/search/'+ keywords).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },



            getVerification: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/verification_process').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            makeServiceRequest: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/service_request', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            feedbackRequest: function (id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+id+'/feedback_request', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            sendInvoice: function (id,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+id+'/invoice', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            createCampaigningRequest: function (id,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+ id +'/campaigning_request', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getServiceProvider: function (id) {
                var promise = $http.get(urlSP + '/service_provider/'+ id).then(function (response) {

                    console.log(JSON.stringify(response));

                    return response.data;
                });

                return promise;
            },
            //api.wazir.shatkonlabs.com/feedbacks/1/bt-sp-2/count

            getServiceProviderScore: function (id) {
                var promise = $http.get(urlWazir + '/feedbacks/1/bt-sp-'+id+'/count').then(function (response) {

                    console.log(JSON.stringify(response));

                    return response.data;
                });

                return promise;
            },

            getLocationDetails: function (id) {
                var promise = $http.get(urlSP + '/location/'+id).then(function (response) {

                    console.log(JSON.stringify(response));

                    return response.data;
                });

                return promise;
            },


            meetingRequest: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/meetings', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            updateSPLocation: function (id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(id,JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+id, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            postWorker: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/workers/addNew', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            updateSR: function (sr_id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log("request set by ", sr_id, JSON.stringify(data));
                var promise = $http.post(url + '/service_request/sr_id', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            updateRating: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/ratings', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            makePayment: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/payment', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postFeedback: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/feedback', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postRaw: function (data, type) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/raw?type=' + type, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            regUser: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise

                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            regUserServices: function (userId, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                var services = {"services":data};

                console.log(JSON.stringify(services));
                var promise = $http.post(urlSP + '/service_provider/'+userId+'/services', services).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            loginUser: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise

                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/auth', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response.data));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
    })

    .factory('CallLogService', ['$q', function ($q) {
        return {

            list: function (days) {
                var q = $q.defer();
                // days is how many days back to go
                window.plugins.calllog.list(days, function (response) {
                    q.resolve(response.rows);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            },

            contact: function (phoneNumber) {
                var q = $q.defer();
                window.plugins.calllog.contact(phoneNumber, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            },

            show: function (phoneNumber) {
                var q = $q.defer();
                window.plugins.calllog.show(phoneNumber, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            },

            delete: function (phoneNumber) {
                var q = $q.defer();
                window.plugins.calllog.delete(id, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            }
        }
    }])

    .factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    .factory('Contactlist', function () {
        return {
            getAllContacts: function () {
                return [
                    {name: 'Contact 1'},
                    {name: 'Contact 2'},
                    {name: 'Contact 3'},
                    {name: 'Contact 4'}
                ];
            }
        };
    });