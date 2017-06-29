module.exports = (emailTosendCode,whatViewAskVerificationCode) =>
 {
    "use strict";
    let generateNumber = new Uint16Array(1);
    window.crypto.getRandomValues(generateNumber);
    let codeVerification = generateNumber[0];
    let jsonToSend = 
     {
        email:emailTosendCode,
        code:codeVerification
     }
    localStorage.setItem("verificationCode", String(codeVerification));
    let StatusSendVerificationCode = require("./ajax.js")(jsonToSend,"Code de verification",whatViewAskVerificationCode,undefined);
 };