module.exports = (titleAlertDialog,messageAlertDialog,buttonOkText,buttonCancelText,callBackOkButton,callBackCancelButton) =>
 {
    new tabris.AlertDialog({
    title: titleAlertDialog,
    message: messageAlertDialog,
    buttons:{
      'ok': buttonOkText,
      'cancel': buttonCancelText
     }
    }).on({
       closeOk: () => callBackOkButton,
       closeCancel: () => callBackCancelButton
     }).open();
 };
