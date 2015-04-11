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