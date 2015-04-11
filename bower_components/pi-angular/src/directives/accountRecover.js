(function(){
	
	var AccountRecover = function(AccountRecoverService)
	{
		var linkFn = function(scope, elem, attrs)
		{
			scope.save = function()
			{
				var successFn = function(res)
					{
						scope.onSuccessFn(res);
					},
					errorFn = function(res)
					{
						scope.onError(res);
					};

				AccountRecoverService.requestRecover(scope.email)
					.then(successFn, errorFn);
			};

			scope.cancel = function()
			{

			};
		};

		return {
			scope: {
				'piConfig': '=piConfig',
				'onSuccess': '=onSuccess',
				'onError': '=onError'
			},
			link: linkFn
		};
	};

	AccountRecover.$inject = ['AccountRecoverService'];

	AccountRecoverService = function($http, $q, modalSvc)
	{
		this.requestRecover = function(email)
		{
			var deferred = $q.defer(),
				successFn = function(res)
				{
					deferred.resolve(res.data);
				},
				errorFn = function(res)
				{
					deferred.reject(res);
				};
			$http.post('/api/account/recover')
				.then(successFn, errorFn, {email: email});

			return deferred.promise;
		};

		this.sendRecover = function(email, token, password, passwordConfirm)
		{
			var deferred = $q.defer(),
				model = {
					password: password,
					passwordConfirm: passwordConfirm,
					token: token,
					email: email
				},
				successFn = function(res)
				{
					deferred.resolve(res.data);
				},
				errorFn = function(res)
				{
					deferred.reject(res);
				};

			$http.post('/api/accouunt/recover/send', model)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		return this;
	};

	AccountRecoverService.$inject = ['$http', '$q', 'modalSvc'];

	//angular
//		.module('pi')
		//.directive('piAccountRecover', AccountRecover)
		//.factory('AccountRecoverService', AccountRecoverService);
})();