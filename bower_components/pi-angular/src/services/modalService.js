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