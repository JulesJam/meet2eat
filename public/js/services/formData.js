angular
  .module('Meet2Eat')
  .factory('formData', formData);

function formData() {
  return {
    transform: function(data) {
      console.log("form data",data);
      var formData = new FormData();
      angular.forEach(data, function(value, key) {
        if(value._id) value = value._id;
        if(!!key.match(/(locationHome|locationWork)/)) value = JSON.stringify(value);
        if(!key.match(/^\$/)) formData.append(key, value);
      });

      return formData;
    }
  }
}