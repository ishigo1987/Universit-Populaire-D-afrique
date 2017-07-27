module.exports = (emailTosendCode, whatViewAskVerificationCode) => {
    "use strict";
    let generateNumber = new Uint16Array(1);
    window.crypto.getRandomValues(generateNumber);
    let codeVerification = String(generateNumber[0]);
    if (codeVerification.length === 4) {
        codeVerification = `5${codeVerification}`;
    }
    let jsonToSend = {
        email: emailTosendCode,
        code: codeVerification
    }
    localStorage.setItem("verificationCode", codeVerification);
    let StatusSendVerificationCode = require("./ajax.js")(jsonToSend, "Code de verification", whatViewAskVerificationCode, undefined);
};
