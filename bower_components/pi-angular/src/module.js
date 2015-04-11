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