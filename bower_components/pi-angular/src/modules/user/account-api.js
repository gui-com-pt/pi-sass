(function(){
	var svcFn = function($http, $q, $rootScope) {

        /**
         * Login
         *
         * @param email
         * @param password
         * @returns {*}
         */
        this.login = function(email, password) {
            var httpObj = {
                method: 'POST',
                url: '/api/account/login',
                data: {
                    email: email,
                    password: password
                }
            };

            return $http(httpObj);
        };

        /**
         * register new account
         * @param model
         * @returns {*}
         */
		this.register = function(model){
			var httpObj = {
				method: 'POST',
				url: '/api/account',
				data: model
			};

			return $http(httpObj);
		};

        /**
         * Request a recover link to email
         * @param email
         * @returns {*}
         */
        this.recoverFromEmail = function(email) {
            var httpObj = {
                method: 'POST',
                url: '/api/account/recover',
                data: {
                    email: email
                }
            };

            return $http(httpObj);
        };

        /**
         * Update account credentials
         * @param email User email or nick handle
         * @param currentPassword Current password
         * @param newPassword New password
         * @param newPasswordConfirm Confirmation of new password
         * @returns {*}
         */
        this.updatePassword = function(email, currentPassword, newPassword, newPasswordConfirm) {
            var httpObj = {
                method: 'POST',
                url: '/api/account/password',
                data: {
                    email: email,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    newPasswordConfirm: newPasswordConfirm
                }
            };

            return $http(httpObj);
        };

	};

	angular
		.module('pi')
		.service('accountApi', ['$http', '$q', '$rootScope', svcFn]);
	})();