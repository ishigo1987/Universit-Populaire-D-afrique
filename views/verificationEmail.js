exports.create = () =>
 {
    "use strict";
    const themeColor = "#84BD3A";
    let createnavigationView;
    let executeNavigationView = require("../helpers/navigationViewAnimation.js")(createnavigationView, false);
    let userInfos = JSON.parse(localStorage.getItem("userInfos"));
    let emailUser = userInfos.email;
    let layoutDataHelper = {top:["prev()", 30],left:"10%",right:"10%",};
    let pageVerifNumber = new tabris.Page({
        title: `Verification de votre adresse mail`,
        background:`#fafafa`
     }).on("disappear", () =>
         {
           pageVerifNumber.dispose();
           executeNavigationView.dispose();
         }).appendTo(executeNavigationView);
    
     let introText = new tabris.TextView({
       layoutData:
          {
            top:15,
            right:"10%",
            left:"10%"
          },
       font: "16px roboto, noto",
       text:`Nous vous avons envoyé un code de verification a l'adresse mail ${emailUser}`,
       textColor:"#212121",
      }).appendTo(pageVerifNumber);
    
    let codeInput = new tabris.TextInput({
        layoutData:layoutDataHelper,
        font: "16px roboto, noto",
        message: "Entrez le code",
        keyboard:"number",
        borderColor:themeColor
    }).appendTo(pageVerifNumber);  

  let button = new tabris.Button({
      layoutData:layoutDataHelper,
      font: "16px roboto, noto",
      textColor:"#fff",
      text:"Continuer",
      background:themeColor,
      elevation:0
   }).on("select", () =>
      {
        const codeInputValue = codeInput.text;
        let lsVerificationCode = localStorage.getItem("verificationCode");
        if(codeInputValue === "")
         {
           window.plugins.toast.showShortBottom("Veuillez entrer le code de vérification");
         }
        else if(codeInputValue.length < 5)
         {
            window.plugins.toast.showShortBottom("Le code doit avoir 5 chiffres");
         }
        else if(String(codeInputValue) !== lsVerificationCode)
         {
            window.plugins.toast.showShortBottom("Le code que vous avez entré ne correspond pas"); 
         }
        else if(String(codeInputValue) === lsVerificationCode)
         {
            let temporaryData = localStorage.getItem("enterEmailAdressView");
            if(temporaryData !== null)
             {
               // Alors on redirige l'utilisateur vers la vue ou il doit entrer son nouveau password
               let goToEnterNewPassword = require("./enterNewPassword.js");
                   goToEnterNewPassword.create();
             }
            else
             {
               let finishInscriptionUser = require("../modules/ajax.js")(userInfos,"inscription dans la bd","verificationViewInsertInscription",undefined);
             }
         }
      
      }).appendTo(pageVerifNumber);  
    
  let resendCode = new tabris.TextView({
      layoutData:{
          top:["prev()", 20],
          centerX:0
      },
      font: "16px roboto, noto",
      textColor:themeColor,
      text:"renvoyer le code"
  }).on("tap", () =>
     {
       let resendCode = require("../modules/sendVerificationCode.js")(emailUser,"verificationEmailView");
     }).appendTo(pageVerifNumber);
    
  return executeNavigationView;
};