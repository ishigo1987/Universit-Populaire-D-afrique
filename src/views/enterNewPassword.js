exports.create = () =>
 {
    const themeColor = "#84BD3A";
    let layoutDataHelper = {top:["prev()", 30],left:"10%",right:"10%",};
    let createnavigationViewResetPassword;
    let executeNavigationViewPassword = require("../helpers/navigationViewAnimation.js")(createnavigationViewResetPassword, false);
    let pageNewPassword = new tabris.Page({
        title: `Mise a jour du mot de passe`,
        background:`#fafafa`
     }).appendTo(executeNavigationViewPassword);
    
    let introText = new tabris.TextView({
       layoutData:
          {
            top:15,
            right:"10%",
            left:"10%"
          },
       font: "16px roboto, noto",
       text:"Veuillez entrer un nouveau mot de passe que vous utiliserez dorénavant pour acceder a votre compte",
       textColor:"#212121",
      }).appendTo(pageNewPassword);
    
    let passwordInput = new tabris.TextInput({
        layoutData:layoutDataHelper,
        font: "16px roboto, noto",
        message: "Entrez votre nouveau mot de passe",
        borderColor:themeColor
    }).appendTo(pageNewPassword);  

  let button = new tabris.Button({
      layoutData:layoutDataHelper,
      font: "16px roboto, noto",
      textColor:"#fff",
      text:"Continuer",
      background:themeColor,
      elevation:0
   }).on("select", () =>
      {
        const passwordInputValue = passwordInput.text;
        if(passwordInputValue === "")
         {
             window.plugins.toast.showShortBottom("Veuillez entrer votre nouveau mot de passe");
         }
        else
         {
             let emailUser = JSON.parse(localStorage.getItem("userInfos"));
                 emailUser = emailUser.email;
             let urlToSend = `https://www.upa.ovh/gestionApplication/updatePassword.php?email=${emailUser}&password=${passwordInputValue}`;
             let xhrUpdatePassword = new XMLHttpRequest();
                 xhrUpdatePassword.addEventListener("loadstart", () =>
                  {
                     require("../plugins/pDialog.js")("Mise a jour du mot de passe en cours...",false,true);
                  });
                 xhrUpdatePassword.addEventListener("load", () =>
                  {
                     require("../plugins/pDialog.js")("",true,false);
                     let xhrUpdatePasswordResponse = JSON.parse(xhrUpdatePassword.responseText);
                     if(xhrUpdatePasswordResponse.Message === "Mot de passe mis a jour")
                      {
                        window.plugins.toast.showShortBottom("Mot de passe mis a jour");
                      }
                     else if(xhrUpdatePasswordResponse.Message === "Cet utilisateur n'est pas dans la Bd")
                      {
                          window.plugins.toast.showShortBottom("Impossible de mettre a jour le mot de passe");
                      }
                     localStorage.removeItem("userInfos");
                     let connexionView = require("./connexion.js");
                         connexionView.create();
                     executeNavigationViewPassword.dispose();
                  });
                 xhrUpdatePassword.addEventListener("error", () =>
                  {
                     require("../plugins/pDialog.js")("",true,false);
                     window.plugins.toast.showShortBottom("Pas de connexion internet");
                  });
                 
                 xhrUpdatePassword.responseType = "text";
                 xhrUpdatePassword.open('GET',urlToSend, true);
                 xhrUpdatePassword.send(null);
         }
      }).appendTo(pageNewPassword);
    
    return executeNavigationViewPassword;
 };