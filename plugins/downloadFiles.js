module.exports = (urlFile) =>
 {
    "use strict";
   var onSuccess = function(data) {
//    console.log('message: ' + data.message);
   };

   // onError Callback receives a json object
  //
  function onError(error) {
//   console.log('message: ' + error.message);
  }

   window.cordova.plugins.FileOpener.openFile(urlFile, onSuccess, onError);
 };