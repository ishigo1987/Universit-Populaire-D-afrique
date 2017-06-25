module.exports = (message, boolean, stateShowHide) =>
 {
   if(stateShowHide === true)
    {
      cordova.plugin.pDialog.init({
       theme : 'DEVICE_LIGHT',
       progressStyle : 'SPINNER',
       cancelable : boolean,
  //    title : title,
       message : message
     });
    }
  else if(stateShowHide === false)
    {
	  cordova.plugin.pDialog.dismiss();
    }
 };