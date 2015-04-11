(function(){
	var settings = {

	};
	var configFn = function(FacebookProvider, piProvider){
		
		if(piProvider.hasOAuthProvider('facebook')) {
			var appId = piSettings.getOAuthAppId('facebook');
			FacebookProvider.init(appId);
		}
	};
	configFn.$inject = ['FacebookProvider', 'piProvider'];

	angular
		.module('pi', ['ngResource', 'facebook']);
	//	.config(configFn);
})();
/**
 *
 */
(function(){
	var settings = {};

	var flags = {
		sdk: false,
		ready: false
	};

	var provider = function(){
		
      this.setAppId = function(appId){
      	settings.appId = appId;
      };

      this.getAppId = function(){
      	return appId;
      };

      settings.locale = 'pt_PT';

      this.setLocale = function(locale) {
      	settings.locale = locale;
      };

      this.getLocal = function(){
      	return settings.locale;
      };
    
		settings.status = true;

		this.setStatus = function(status) {
		  settings.status = status;
		};

		this.getStatus = function() {
		  return settings.status;
		};

	settings.version = '2.0';
	this.setSdkVersion = function(version) {
		settings.version = version;
	};

	this.getSdkVersion = function(){
		return settings.version;
	};

	      /*
         * load SDK
         */
        settings.loadSDK = true;

        this.setLoadSDK = function(a) {
          settings.loadSDK = !!a;
        };

        this.getLoadSDK = function() {
          return settings.loadSDK;
        };

        /**
         * Custom option setting
         * key @type {String}
         * value @type {*}
         * @return {*}
         */
        this.setInitCustomOption = function(key, value) {
          if (!angular.isString(key)) {
            return false;
          }

          settings[key] = value;
          return settings[key];
        };

        /**
         * get init option
         * @param  {String} key
         * @return {*}
         */
        this.getInitOption = function(key) {
          // If key is not String or If non existing key return null
          if (!angular.isString(key) || !settings.hasOwnProperty(key)) {
            return false;
          }

          return settings[key];
        };

      this.shareDialog = function(title, content, url) {

      };

      this.like = function(postId) {
      	FB.ui(
		 {
		  method: 'share',
		  href: 'https://developers.facebook.com/docs/'
		}, function(response){});
      };

      this.getComments = function(url) {

      };

      var getFn = function($q, $rootScope, $timeout, $window){

      		/**
      		 * The NgFacebook class is retrieved from Facebook Service request
      		 */
      		function NgFacebook(){
      			this.appId = settings.appId;
      		}

      		NgFacebook.prototype.isReady = function(){
      			return flags.ready;
      		};

      		
      };

      this.$get = [
      	'$q',
      	'$rootScope',
      	'$timeout',
      	'$window', getFn];

	};

	angular
		.module('pi')
		.value('fbSettings', settings)
		.value('fbFlags', flags)

})();
/**
 * Pi Provider
 *
 * The main module provider
 */
(function(){
	
	/**
	 * Global settings
	 *
	 * Settings that don't belong to a specific module are stored here
	 */	
 	var settings = { };

	var providerFn = function(){

		/**
		 * OAuth Provider
		 */
		settings.oAuthProviders =  [];

		this.getAuthProviders = function(){
			return settings.oAuthProviders;
		};

		this.addOAuthProvider = function(provider, appId) {
			settings.oAuthProviders.push({
				key: provider,
				appId: appId
			});
		};

		this.hasOAuthProvider = function(provider){
			angular.forEach(settings.oAuthProviders, function(value, key) {
				if(value.key == provider)  {
					return true;
				}
			});
			return false;
		};

		this.getOAuthAppId = function(provider){
			angular.forEach(settings.oAuthProviders, function(value, key) {
				if(value.key == provider) {
					return value.appId;
				}
			});

			return null;
		};


		/**
		 * Rest API
		 */
		settings.apiBaseUrl = '/api';

		this.getApiBaseUrl = function(){
			return settings.apiBaseUrl;
		};

		this.setApiBaseUrl = function(url){
			settings.apiBaseUrl = url;
		};

		/**
		 * Module version
		 */

		settings.version = '0.1';

		this.getVersion = function(){
			return settings.version;
		};

		this.setVersion = function(version) {
			settings.version = version;
		};

		/**
		 * Pi Modules
		 */
		settings.modules = [];

		this.getModules = function(){
			return settings.modules;
		};

		this.addModule = function(module) {
			settings.modules.push(module);
		};

		this.hasModule = function(module) {
			var ex = false;
			angular.forEach(settings.modules, function(value, vakey) {
				if(value === module) {
					ex = true;
				};
			});
			
			return ex;
		};

		var getFn = function(piSettings){

		};


		this.$get = [
		'piSettings', getFn];

        return this;
	};
	angular
        .module('pi')
        .value('piSettings', settings)
		.provider('piApp', providerFn);
})();
(function(){
	angular
		.module('pi.form', []);
})();
(function(){
	angular.
		module('pi.ui-extensions', ['ui.router']);
})();
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
/**
 * @ng-doc directive
 * @name gist
 * @description
 *
 * Directive to embed a iframe from GitHub Gist service.
 * Original directive: https://gist.github.com/tleunen/5277011
 */
(function(){
	var directiveFn = function() { 
	    return function(scope, elm, attrs) {
	        var gistId = attrs.gistId;

	        var iframe = document.createElement('iframe');
	        iframe.setAttribute('width', '100%');
	        iframe.setAttribute('frameborder', '0');
	        iframe.id = "gist-" + gistId;
	        elm[0].appendChild(iframe);

	        var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js"></sc'+'ript></body></html>';

	        var doc = iframe.document;
	        if (iframe.contentDocument) doc = iframe.contentDocument;
	        else if (iframe.contentWindow) doc = iframe.contentWindow.document;

	        doc.open();
	        doc.writeln(iframeHtml);
	        doc.close();
	    };
	 };

	 angular
	 	.module('pi')
	 	.directive('gist', directiveFn);
})();
(function(){
  var PiMetaDirective = function(FieldsMetaService, $parse)
  {
      return {
        templateUrl: '/html/pi/meta.html',
        scope: {
          'piConfig': '=piConfig',
          'piMeta': '=piMeta'
        },
        link: function(scope, elem, attrs)
        {
          var service = undefined;

          if(!_.isUndefined(scope.piConfig))
          {
            var config = scope.piConfig;
            if(_.isArray(config.defaults))
            {
              service = new FieldsMetaService(config.defaults);
            } else {
              service = new FieldsMetaService();
            }
          } else {
            service = new FieldsMetaService();
          }
          scope.meta = service.meta;

          scope.addModel = {};

          scope.add = function()
          {
            service.add(scope.addModel);
          };

          scope.piMeta = service.meta;
          scope.metaEdit = scope.piMeta[0];
        }
      }
  };
  PiMetaDirective.$inject = ['FieldsMetaService', '$parse'];

  angular
      .module('pi')
      .directive('piMeta', PiMetaDirective);
})();
(function(){

    /**
     * @name Partition Filter
     *
     * @description
     * Published at StackOveflow 
     * http://stackoverflow.com/questions/21644493/how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap
     */
    var Partition = function() {
    var cache = {}; // holds old arrays for difference repeat scopes
    var filter = function(newArr, size, scope) {
      var i,
        oldLength = 0,
        newLength = 0,
        arr = [],
        id = scope.$id,
        currentArr = cache[id];
      if (!newArr) return;

      if (currentArr) {
        for (i = 0; i < currentArr.length; i++) {
          oldLength += currentArr[i].length;
        }
      }
      if (newArr.length == oldLength) {
        return currentArr; // so we keep the old object and prevent rebuild (it blurs inputs)
      } else {
        for (i = 0; i < newArr.length; i += size) {
          arr.push(newArr.slice(i, i + size));
        }
        cache[id] = arr;
        return arr;
      }
    };
    return filter;
  }; 

  angular
    .module('pi')
    .filter('partition', Partition);
})();
/**
 * @ng-doc directive
 * @name scrollToId
 * @dependencies jquery jquery.animate
 *
 * @description
 * Scroll to an element by his id, animating the window
 *
 * @example
 * <a id="firstSection">First Section</a>
 * <a scroll-to-id scroll-to="firstSection">Scroll to first section</a>
 */
(function(){
	var fn =  function() {                                                      
	    return {                                                                                 
	        restrict: 'A',                                                                       
	        scope: {                                                                             
	            scrollTo: "@"                                                                    
	        },                                                                                   
	        link: function(scope, $elm,attr) {

	        	$elm.on('click', function() {                                                    
	                $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
	            });
	        }                
	    };
    };
})();
var INTEGER_REGEXP = /^\-?\d*$/;

(function(){
  var PiSeoValidator = function(SeoValidator)
  {


    var linkFn = function(scope, elem, attrs, ctrl)
    {
      ctrl.$parsers.unshift(function(viewValue) {
       if (INTEGER_REGEXP.test(viewValue)) {
         // it is valid
         ctrl.$setValidity('integer', true);
         return viewValue;
       } else {
         // it is invalid, return undefined (no model update)
         ctrl.$setValidity('integer', false);
         return undefined;
       }
     });
    };

    return {
      require: 'ngModel', // Validation is run agains the ng-model
      link: linkFn
    };
  };

  PiSeoValidator.$inject = ['SeoValidator'];

  angular
    .module('pi')
    .directive('piSeoValidator', PiSeoValidator);
})();

/**
 * Filter to reverse a list
 * @ngdoc filter
 * @name reserve
 * @kind function
 *
 * @description
 * Reverse a array without replacing the original array since slice is used to return the array 
 *
 * @return {Array}
 *
 * @example
 * <div ng-repeat="verses in bibles.kingJames | reverse">
 * 	<em ng-bind="verse.number"></em> <span ng-bind="verse.message"></span>
 * </div>
 */
(function(){
	
	var reverseFilter = function(){

	  return function(items) {
	    return items ? items.slice().reverse() : [];
	  };

	};

	angular.module('pi')
		.filter('reverse', reverseFilter);
})();
(function(){
	
    /**
     * @ngdoc directive
     * @name Pi Form
     * @description Directory to create a form
     */
	var piForm = function(){

        var compileFn = function(cElement, cAttrs, transclude) {

            var preFn = function(scope, pElement, pAttrs, pController) {

                },
                postFn = function(scope, pElement, pAttrs, pController) {

                };

            return {
                pre: preFn,
                post: postFn
            }
        };

        return {
            restrict: 'EAC',
            compile: compileFn,
            require: 'ngModel'
        };
    };

    var piFormGroup = function(){
        var controllerFn = function(){
            this.focus = function(){
                // show all labels with hide attr on form group
            };

            this.unfocus = function(){
                // hide all la
                // bels with hide attr  on form group
            }
        }
        return {
            controller: controllerFn
        }
    };

    var piFormFooter = function(){
        return {};
    };

    var piFormControl = function(){
        var compileFn = function(cElement, cAttrs) {

            var preFn = function(scope, pElement, pAttrs, parentCtrl) {
                    var focusFn = function(fElement) {
                        parentCtrl.focus();
                    };
                    pElement.on('focus', focusFn);
                },
                postFn = function(scope, pElement, pAttrs) {

                };

            return {
                pre: preFn,
                post: postFn
            }
        };
        return {
            compile: compileFn
        }
    };

    var piFormLabel = function(){

        var compileFn = function(cElement, cAttrs, transclude) {

            var preFn = function(scope, pElement, pAttrs, pController) {
                    if(_.isNull(pAttrs.piHideFocus) && pAttrs.piHideFocus == true) {
                        cElement.css('display', 'none');
                    }
                },
                postFn = function(scope, pElement, pAttrs, pController) {

                };

            return {
                pre: preFn,
                post: postFn
            }
        };

        return {
            restrict: 'EAC',
            compile: compileFn
        };
    }

    angular
        .module('pi.form')
        .directive('piForm', piForm)
        .directive('piFormGroup', piFormGroup)
        .directive('piFormLabel', piFormLabel)
        .directive('piFormFooter', piFormFooter);

})();
(function(){
	var fn = function(apiException){

		var svc = function(response) {
			this.response = response;

			this.handle = function() {
				if(_.isUndefined(this.response || _.isUndefined(this.response.data))) {
					throw apiException.badRequest;
				}

				if(this.response.statusCode >= 400) {
					
				}

				this.success = true;
				return this.response.data;
			};
		};

		return {
			service: svc,
			setProvider: function(dependency) {
				svc.setHandler(dependency);
			}
		}
	};

	angular
        .module('pi')
		.constant('apiException', {
			badRequest: 502,
			notFound: 404,
			notAuthorize: 501,
			ok: 200
		})
		.factory('apiResponseProvider', ['apiException', fn]);
})();
(function(){
	
	var apiFn = function(){
		this.get = function(articleId) {
			var httpObj = {
				method: 'GET',
				url: '/api/blog/article/' + articleId
			};

			return $http(httpObj);
		};

		this.post = function(blogId, model) {
			model.blogId = blogId;

			var httpObj = {
				method: 'POST',
				url: '/api/blog/article',
				data: model
			};

			return $http(httpObj);
		};

		this.put = function(articleId, model) {
			var httpObj = {
				method: 'POST',
				url: '/api/blog/article/:id',
				data: model
			};

			return $http(httpObj);
		};

		this.remove = function(articleId) {
			var httpObj = {
				method: 'DELETE',
				url: '/api/blog/article/' + articleId
			};

			return $http(httpObj);
		};
	};

	var blogArticleResource = function($resource) {
		return $resource('/api/blog/article/:id');
	};
	blogArticleResource.$inject = ['$resource'];

	angular
		.module('pi')
		.factory('blogArticleResource', blogArticleResource)
		.service('blogArticleApi', ['$rootScope', '$q', '$http', apiFn]);

})();
/**
 * @ng-doc service
 * @name blogArticleCreateService
 *
 * @description
 * Create a new Article
 *
 * @dependencies blogApi
 */
(function(){
	
	var createService = function(blogApi){

		var fn = function(blogId) {
			this.blogId = blogId;
			this.model = {};
		};

		/*
		 * Title is validated agains the API to check titles already in use
		 */
		fn.prototype.slugIsValid = function(){
			if(blogApi.validateSlugTitle(this.model.title) == false) {

			};
		};

		fn.prototype.validateSeo = function(){

		};

		fn.prototype.create = function(){
			return blogApi.createArticle(this.model);
		};

		return fn;
	};

	createService.$inject = ['blogApi'];

	angular
		.module('pi')
		.factory('articleCreateService', createService);

})();
(function(){
	var apiFn = function($rootScope, $http, $q){
		this.get = function(id){
			var httpObj = {
				method: 'GET',
				url: '/api/blog/' + id
			};

			return $http(httpObj);
		};

		this.post = function(model) {
			var httpObj = {
				method: 'POST',
				url: '/api/blog',
				data: model
			};

			return $http(httpObj);
		};

		this.put = function(blogId, model) {
			var httpObj = {
				method: 'POST',
				url: '/api/blog/' + blogId,
				datA: datA
			};

			return $http(httpObj);
		};

		this.remove = function(blogId) {
			var httpObj = {
				method: 'DELETE',
				url: '/api/blog/' + blogId
			};

			return $http(httpObj);
		};
	};

	angular
		.module('pi')
		.service('blogApi', ['$rootScope', '$http', '$q', apiFn]);
})();
(function(){
	var directiveFn = function() {
		var linkFn = function(scope, element, attrs, blogApi) {
			scope.model = {};

			scope.submit = function(){
				
				blogApi
					.post(scope.model)
					.then(successFn, errorFn);
			};
		};

		return {
			link: linkFn,
			replace: false
		}
	};

	angular
		.module('piBlogCreate', [''])
})();
(function(){

	var svcFn = function($http, $q){
		/**
		 * Create a new forum
		 *
		 * @param model Request model
		 * @param parentId The forum parent id. If null or undefined, the forum is created as a Parent
		 */
		this.create = function(model, parentId) {

			var data = angular.copy(model);
			if(!_.isUndefined(parentId)) {
				data.parentId = parentId;
			}

			var deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res.data);
				},
				httpObj = {
					method: 'POST',
					url: '/api/community/forum',
					data: data
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		this.updateInformation = function(forumId, model) {
			var data = angular.copy(model);
			data.id = forumId;

			var deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res);
				},
				httpObj = {
					method: 'POST',
					url: '/api/community/forum/info',
					data: data
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		this.remove = function(forumId, reason) {
			var data = {
					id: forumId
				},
				deferred = $q.defer(),
				succesFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res);
				},
				httpObj = {
					method: 'DELETE',
					url: '/api/community/forum',
					data: data
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		angular
			.module('pi')
			.service('forumApi', ['$http', '$q', svcFn]);
	};
});
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
(function(){
    var svcFn = function(accountApi, $q) {

        this.recover = function(email){

            var deferred = $q.defer(),
                successFn = function(res){
                    deferred.resolve(res.data);
                },
                errorFn = function(res) {
                    deferred.reject(res);
                };

            accountApi
                .recoverFromEmail(email)
                .then(successFn, errorFn);

            return deferred.promise;
        };
    };

    var directiveFn = function(recoverSvc){
        var linkFn = function(scope, element, attrs) {

            scope.recover = function(){

                var successFn = function(res){
                        scope.onSuccess(res);
                    },
                    errorFn = function(res) {
                        scope.onError(res);
                    };

                recoverSvc
                    .recover(scope.email)
                    .then(successFn, errorFn);
            };
        };

        return {
            link: linkFn,
            replace: false,
            scope: {
                'onSuccess': '&',
                'onError': '&'            }
        }
    };

    var directiveSubmit = function()
    {
        var linkFn = function(scope, element, attrs, parentCtrl)
        {
            element.bind('click', function(){
                parentCtrl.recover();
            })
        };

        return {
            replace: false,
            link: linkFn
        }
    };

    angular
        .module('pi')
        .service('recoverSvc', ['accountApi', '$q', svcFn])
        .directive('piAccountRecover', ['recoverSvc', directiveFn])
        .directive('piAccountRecoverSubmit', directiveSubmit);
})();
(function(){
	var svcFn = function(accountApi, $q) {

		this.basic = function(email, password, passwordConfirm, requestModel) {

			if(_.isUndefined(requestModel) && !_.isObject(requestModel)) {
				requestModel = {};
			}
			requestModel.email = email;
			requestModel.password = password;

			var deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res.data);
				};

            accountApi.register(requestModel)
				.then(successFn, errorFn);

			return deferred.promise;
		};

	};

	var directiveFn = function(registerSvc){
		
		var linkFn = function(scope, element, attrs) {
			
			var disposeFn = function(){

			};

			element.on('$destroy', disposeFn);

			scope.account = {};

			scope.submit = function(){
				var model = {};
				registerSvc.basic(scope.account.email, scope.account.password, model);
			};

		};
		return {
			link: linkFn,
			scope: {
				'account': ''
			},
			replace: false
		}
	};

	angular
		.module('pi')
		.service('registerSvc', ['accountApi', '$q', svcFn])
		.directive('piRegister', ['registerSvc', directiveFn]);

})();


(function(){
	var TestService = function(ServiceBase){
		var service = new ServiceBase('TestService');

		return service;
	};

	TestService.$inject = ['ServiceBase'];

	angular
		.module('pi')
		.factory('TestService', TestService);

	var TestAppHost = function(AppHost) {
		var config = {
			'appName': 'test'
		};
		
		return new AppHost(config);
	};

	TestAppHost.$inject = ['AppHost'];

	var AppHost = function($log, ServiceBroker){

		var fn = function(configs) {

			var self = this;
			this.appName = configs.appName || 'default';
			this.mode = configs.mode || 'production';
			this.plugins = [];

			this.init = function()
			{
				var services = discoveryServices();
				self.registerService(services);
			};
			this.setConfigs = function(configs)
			{
				if(!_.isUndefined(configs['appName'])) {
					self.appName = configs.appName;
				}
				if(!_.isUndefined(configs['mode'])) {
					self.mode = configs.mode;
				}

				self.configs = configs;
			};

			this.getConfigs = function()
			{
				return self.configs;
			}

			this.registerService = function(service)
			{
				return ServiceBroker.register(service);
			};

			this.execute = function(requestType, method, requestDto)
			{
				return ServiceBroker.executeRequest(requestType, method, requestDto);
			};

			var discoveryServices = function()
			{
				return [
					{
						id: "serverId",
						endpoint: '/api/user',
						requestsTypes: [
							{
								name: 'GetUser',
								methods: ['GET'],
								roles: []
							},
							'PutUser',
							'DeleteUser'
						]
					},
					{
						id: "serverId2",
						endpoint: '/api/group'
					}
				];
			};
		};

		return fn;
	};

	AppHost.$inject = ['$log'];

	angular
		.module('pi')
		.factory('AppHost', AppHost)
		.factory('TestAppHost', TestAppHost);
})();
(function(){
	var FieldsMetaService = function()
	{
      var fn = function(defaultMeta)
      {
          meta = _.isArray(defaultMeta) ? defaultMeta : [];

          var addMeta = function(value, key)
          {
            meta.push({
              value: value,
              key: key
            });
          };

          var removeMeta = function(value)
          {

          };

          return {
              add: addMeta,
              remove: removeMeta,
              meta: meta
          }
      };

      return fn;
  };

  angular
    .module('pi')
    .factory('FieldsMetaService', FieldsMetaService);
})();
(function(){
	var ServiceBase = function($resource, $q, MessageBroker) {
		var fn = function(serviceName)
		{
			this.serviceName = serviceName;
			this.requests	 = 0;
			this.currentRequest = undefined;
			this.httpBusy = false;
			this.MessageBroker = MessageBroker;
		};

		fn.prototype.update = function(first_argument) {
			// body...
		};

		fn.prototype.get = function(id) {
			
		};

		fn.prototype.remove = function(id) {
			// body...
		};

		fn.prototype.query = function() {
			// body...
		};

		return fn;
	};

	ServiceBase.$inject = ['$resource', '$q', 'MessageBroker'];

	angular
		.module('pi')
		.factory('ServiceBase', ServiceBase)
})();
(function(){

	var ServiceBroker = function($log, ServiceRunner) 
	{
		var services = [];
		/* Map the Service Request Type and the Service index
		 */
		var servicesMap = {};
		var self = this;

		this.register = function(serviceType)
		{
			var register = function(service)
			{
				var index = services.push(service);
				angular.forEach(service.requestsTypes, function(requestType, typeIndex){
					servicesMap[serviceType] = index;
				});
			}
			
			if(_.isArray(serviceType))
			{
				angular.forEach(serviceType, function(value, key) {
					register(value);
				});
			} else {
				register(serviceType);
			}
		};

		this.unregister = function(serviceType)
		{

		};

		/**
		 * Execute a request
		 * @param  {[type]} requestType [description]
		 * @param  {[type]} method      [description]
		 * @param  {[type]} requestDto  [description]
		 * @return {promise}             [description]
		 */
		this.executeRequest = function(requestType, method, requestDto)
		{
			var service = services[servicesMap[requestType]];
			var runner = new ServiceRunner(service, requestType, requestDto);
			
			return runner.execute(method);
		};

	};
	ServiceBroker.$inject = ['$log', 'ServiceRunner'];

	angular
		.module('pi')
		.factory('ServiceBroker', ServiceBroker);
})();
(function(){
	var ServiceConsumer = function($log) 
	{
		this.send = function()
		{

		};
	};
	ServiceConsumer.$inject = ['$log'];

	angular
		.module('pi')
		.factory('ServiceConsumer', ServiceConsumer)
})();
(function(){

	/**
	 * Service Request
	 */

	var PiServiceRequest = function()
	{
		var fn = function()
		{
			/**
			 * Unique identifier for the Service
			 * @type {[type]}
			 */
			this.id = undefined;
			this.externalId = undefined;
			this.attributes = []
		};

		fn.prototype.AddAttribute = function(objectOrArray) {
			if(_.isArray(objectOrArray))
			{
				this.attributes = objectOrArray;
			} 
			else if(_.isObject(objectOrArray))
			{
				this.attributes.push(objectOrArray);
			}
		};

		fn.prototype.Attributes = function() {
			return this.attributes;
		};

		return fn;
	};

	angular
		.module('pi')
		.factory('piServiceRequest)', PiServiceRequest);
})();
(function(){

	var ServiceRunner = function($http, $q){

		var fn = function(service, requestType, requestDto)
		{
			if(!_.isObject(service) || !_.isObject(requestType))
			{
				return false;
			}
			var self = this;

			this.execute = function(httpMethod)
			{
				var deferred = $q.defer(),
					success = function(response) 
					{
						deferred.resolve(res.data);
					},
					error = function(resposne)
					{
						deferred.reject(response);
					};

				$http({
					method: httpMethod,
					data: requestDto,
					url: service.endpoint
				})
				.then(success, error);

				return deferred.promise;
			};
			
		};

		return fn;
	};
	ServiceRunner.$inject = ['$http', '$q'];

	angular
		.module('pi')
		.factory('ServiceRunner', ServiceRunner);

})();
(function(){

	 var fn = function(){
	 	return {
	      createNew: function () {
	        var stack = [];

	        return {
	          add: function (key, value) {
	            stack.push({
	              key: key,
	              value: value
	            });
	          },
	          get: function (key) {
	            for (var i = 0; i < stack.length; i++) {
	              if (key == stack[i].key) {
	                return stack[i];
	              }
	            }
	          },
	          keys: function() {
	            var keys = [];
	            for (var i = 0; i < stack.length; i++) {
	              keys.push(stack[i].key);
	            }
	            return keys;
	          },
	          top: function () {
	            return stack[stack.length - 1];
	          },
	          remove: function (key) {
	            var idx = -1;
	            for (var i = 0; i < stack.length; i++) {
	              if (key == stack[i].key) {
	                idx = i;
	                break;
	              }
	            }
	            return stack.splice(idx, 1)[0];
	          },
	          removeTop: function () {
	            return stack.splice(stack.length - 1, 1)[0];
	          },
	          length: function () {
	            return stack.length;
	          }
	        };
	      }
	    };
	 };

	 angular
	 	.module('pi')
	 	.factory('StackedMap')
});
(function(){

	var UpdateBuilder = function($log){
		var fn = function(){
			this.current = undefined;
			this.request = {};
			var self = this;

			this.field = function(field) {
				self.current = field;
				return self;
			};

			this.set = function(value) {
				self.request[self.current] = value;
				self.current = undefined;
				$log.debug('field ' + self.current + ' set ' + value);
				return self;
			};

			this.getRequest = function(){
				return self.request;
			};
		};

		return fn;
	};

	UpdateBuilder.$inject = ['$log'];

	angular
		.module('pi')
		.factory('UpdateBuilder', UpdateBuilder);
})();

(function(){
	
	var svcFn = function($rootScope){

		var svc = function(model){
			var self = this;
			this.model = model;
			
			this.get = function(){
				return self.model;
			};

		};

		svc.prototype.build = function(skip, take) {
			
			if(_.isUndefined(this.model.skip)) {
				this.model.skip = _.isUndefined(skip) ? 0 : skip;
			}

			if(_.isUndefined(this.model.take)) {
				this.model.take = _.isUndefined(take) ? 40 : take;
			}
		};

		return svc;		
	};

	angular
		.module('pi')
		.factory('queryModelFactory', ['$rootScope', svcFn]);
})();
(function(){
	var commonUtils = function(){

		this.capitalizeFirstLetter = function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		this.randomText =  function(counter)
		{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < counter; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
		};

		return this;
	};


	angular
		.module('pi')
		.factory('commonUtils', commonUtils);
})();

(function(){
	var pagingFn = function(){

        var svc = function(queryFnName){
            this.queryFnName = queryFnName;
            this.observerCallbacks = [];

            this.modelQuery = {
                current: 1,
                limit: 20,
                count: 0
            };

            var self = this;


            this.registerObserver = function(callback){
                self.observerCallbacks.push(callback);
            };

            this.notifyObservers = function() {
                angular.forEach(self.observerCallbacks, function(callback) {
                    callback();
                });
            };

        };

        svc.prototype.update = function(){
            this[this.queryFnName]();
        };

        svc.prototype.dataNext = function(){
            this.modelQuery.current++;
            this.bids = [];

            return this.queryFnName();

        };

        svc.prototype.dataPrevious = function(){
            this.modelQuery.current--;
            this.bids = [];

            this[this.queryFnName]();
        };

        return svc;
    };

    angular
    	.module('pi')
    	.factory('dataPagingBase', pagingFn)
})();
/**
(function(){

	var fn = function($q){
		var modals = [];

		var add = function(modalObj) {
			
		};

		var templatePath, 
			setTemplatePath = function(path) {

		};

		var getFn = function(){
			return {
				getTemplatePath: function(){
					return templatePath;
				}
			}
		};
		getFn.$inject = [];


		return {
			setTemplatePath: setTemplatePath,
			$get: getFn
		}

		
	};

	fn.$inject = ['$q'];

	angular
		.module('pi')
		.provider('ModalService', fn);
})();
*/
(function(){
	
	var registerFactory = function($http, $q){

		this.register = function(registerModel) {
			var model = registerModel;
				deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res);
				},
				httpObj = {
					method: 'POST',
					url: '/api/register',
					data: model
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};
	};

	angular	
		.module('pi')
		.service('piRegisterService', registerFactory);
})();
/**
 * @author Gui <guilhermecardoso@volupio.com>
 * @ng-doc service
 * @name SEO Validator
 *
 * @description
 * Helper class to validate SEO
 * Functions started with "validate" will be used agains validateObject() with common properties array
 */
 var seoValidationResult = {
 	message: '',
 	error: false
 };

(function(){
	var SeoValidator = function(commonUtils, $log){
		var self = this,
			commonProperties = ['title', 'content', 'url', 'excerpt'];

    var createError = function(property, message)
    {
      return {
        key: property,
        value: message
      };

    };

    var validators = {
        validateTitle: function(title) {
    			if(title.length < 10 || title.length > 70) {
            return createError('title', 'Title length should be between 30 and 70');
    			}
          return true;
    		},
        validateContent: function(content) {

          if(content.length < 30 || content.length > 70) {
            return createError('content', 'Title length should be between 30 and 70');
          }
          return true;
    		},
        validateExcerpt: function(excerpt){
          if(excerpt.length < 10 || excerpt.length > 50) {
            return createError('excerpt', 'Title length should be between 30 and 70');
          }
          return true;
    		},
        validateUrl: function(url){
          if(url.length < 10 || url.length > 70) {
            return createError('url', 'Title length should be between 30 and 70');
          }
          return true;
    		}
    };
    this.validateTitle = validators.validateTitle;
    this.validateContext = validators.validateContent;
    this.validateExcerpt = validators.validateExcerpts;
    this.validateUrl = validators.validateUrl;
		/*
		 * Runs all the validation functions of the service agains the object
		 * The existence of the properties is checked, and the object must have the regular properties: title, content, url, etc
		 */
		this.validateObject = function(obj) {
			var results = [];

      angular.forEach(commonProperties, function(prop, key) {
				if(prop in obj) {
					/*var fnName = String('validate' + commonUtils.capitalizeFirstLetter(prop)),
            obj[prop],
            validators[fnName](val);

          if(!_.isUndefined(res) && res === 'true');
          {
            results.push(res);
          }*/
				}
			});

      if(results.length >= 0)
      {
        return {
          error: true,
          validation: results
        }
      }

      return true;
		};

    return this;
	};

  SeoValidator.$inject = ['commonUtils', '$log'];

	angular
		.module('pi')
		.factory('SeoValidator', SeoValidator);
})();

(function(){
	/**
	 * @ng-doc overview
	 * @name pi template editor
	 * 
	 * @description
	 * template editor for pi based apps
	 * the editor store dom with angular directives in jsonml
	 */

	 var svcFn = function(){

	 	/**
	 	 * @param bodyJson the jsonml retrieved from database
	 	 */
	 	var main = function(bodyJson) {
	 		this.toolBar = {
	 			items: [],
	 			version: '0.0.1'
	 		};
	 	}

	 };


	 var directive = function($compile){
	 	var compileFn = function(element, attributes) {
	 		var preFn = function(scope, element, attributes, controller) {

	 				},
	 				postFn = function(scope, iElement, attributes, controller) {
	 					$compile(iElement)(scope);
	 				};

	 		return {
	 			pre: preFn,
	 			post: postFn
	 		}
	 	}
 		return {
 			compile: compileFn
 		}
	 };
})();
(function(){
	
	var configFn = function($provide) {

		// use $state.forceReload() to reload the current state
		// delegate cames from SO http://stackoverflow.com/questions/21714655/angular-js-angular-ui-router-reloading-current-state-refresh-data
		$provide.decorator('$state', function($delegate, $stateParams) {
	        $delegate.forceReload = function() {
	            return $delegate.go($delegate.current, $stateParams, {
	                reload: true,
	                inherit: false,
	                notify: true
	            });
	        };
	        return $delegate;
	    });
	};
	angular
		.module('pi.ui-extensions')
		.config(['$provide', configFn]);
})();
(function(){

	var svc = function($state, $rootScope, $window) {

	  var history = [];

	  angular.extend(this, {
	    push: function(state, params) {
	      history.push({ state: state, params: params });
	    },
	    all: function() {
	      return history;
	    },
	    go: function(step) {
	      // TODO:
	      // (1) Determine # of states in stack with URLs, attempt to
	      //    shell out to $window.history when possible
	      // (2) Attempt to figure out some algorthim for reversing that,
	      //     so you can also go forward

	      var prev = this.previous(step || -1);
	      return $state.go(prev.state, prev.params);
	    },
	    previous: function(step) {
	      return history[history.length - Math.abs(step || 1)];
	    },
	    back: function() {
	      return this.go(-1);
	    }
	  });

	};

	svc.$inject = ['$state', '$rootScope', '$window'];

	var directiveFn = function($history){
		
		var linkFn = function(scope, elem, attrs) {
			elem.on('click', function(){
				$history.back();
			});
		};

		return {
			link: linkFn,
			restrict: 'A'
		}
	};

	directiveFn.$inject = ['$history'];

	angular
		.module('pi.ui-extensions')
		.directive('piUiBack', directiveFn)
		.service('$history', svc);
})();
(function(){

	var runFn = function($rootScope, $history, $state) {
	
		$rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {
			if (!from.abstract) {
				$history.push(from, fromParams);
			}
	  	});

	  	$history.push($state.current, $state.params);
	};

	runFn.$inject = ['$rootScope', '$history', '$state'];

	angular
		.module('pi.ui-extensions')
		.run(runFn)
})();