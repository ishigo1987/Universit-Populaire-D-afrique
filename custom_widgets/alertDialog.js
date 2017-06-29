module.exports = (titleAlertDialog,messageAlertDialog,buttonOkText,buttonCancelText,callBackOkButton,callBackCancelButton) =>
 {
    new tabris.AlertDialog({
    title: titleAlertDialog,
    message: messageAlertDialog,
    buttons:{
      'ok': buttonOkText,
      'cancel': buttonCancelText
     }
    }).on('close:ok', ()=> {callBackOkButton();})
      .on('close:cancel', ()=> {callBackCancelButton();})
      .open();
 };
