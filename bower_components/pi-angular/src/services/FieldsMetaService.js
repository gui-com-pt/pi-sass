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
