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