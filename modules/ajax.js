module.exports = (data,request_name,view_to_call_ajax,widget_to_dispose) =>
 {
    "use strict";
    let urlToSend;
    if(request_name === "Code de verification")
     {
       urlToSend = `https://www.upa.ovh/gestionApplication/sendVerificationCode.php?email=${data.email}&code=${data.code}`;
     }
    else if(request_name === "inscription dans la bd")
     {
         urlToSend = `https://www.upa.ovh/gestionApplication/inscription.php?identifiant=${data.identifiant}&email=${data.email}&telephone=${data.phoneNumber}&password=${data.password}`;
     }
   else if(request_name === "verification login password")
     {
        urlToSend = `https://www.upa.ovh/gestionApplication/connexion.php?identifiant=${data.identifiant}&password=${data.password}&emailOrLogin=${data.emailOrLogin}`;
     }
    let xhr = new XMLHttpRequest();
        xhr.addEventListener("loadstart", () =>
         {
            // Ici on va utiliser le plugin de dialog
            if(view_to_call_ajax === "inscriptionView")
             {
                 window.plugins.toast.showShortCenter("Inscription en cours...");
             }
            else if(view_to_call_ajax === "verificationEmailView")
             {
                 window.plugins.toast.showShortBottom("Envoi d'un code de vérification en cours...");
             }
            else if(view_to_call_ajax === "verificationViewInsertInscription")
             {
                 require("../plugins/pDialog.js")("Finalisation de l'inscription en cours...",false,true);
             }
            else if(view_to_call_ajax === "connexionView")
             {
                 require("../plugins/pDialog.js")("Connexion en cours...",false,true);
             }
            else if(view_to_call_ajax === "enterEmailAdressView")
             {
                 require("../plugins/pDialog.js")("Envoi d'un code de vérification en cours...",false,true);
             }
            
         });
        xhr.addEventListener("load", () =>
         {
            let xhrResponse = JSON.parse(xhr.responseText);
            if(xhrResponse.message === "Code envoye")
             {
                if(view_to_call_ajax === "inscriptionView")
                 {
                    let goToEnterVerificationCode = require("../views/verificationEmail.js");
                        goToEnterVerificationCode.create();
                 }
                else if(view_to_call_ajax === "enterEmailAdressView")
                 {
                     require("../plugins/pDialog.js")("",true,false);
                     let goToEnterVerificationCode = require("../views/verificationEmail.js");
                         goToEnterVerificationCode.create();
                 }
                else
                 {
                     window.plugins.toast.showShortBottom("Code envoyé");
                 }
             }
            else if(xhrResponse.message === "Inscription ok")
             {
                require("../plugins/pDialog.js")("",true,false);
                localStorage.removeItem("userInfos");
                localStorage.removeItem("verificationCode");
                let connexionView = require("../views/connexion.js");
                    connexionView.create();
             }
           else if(xhrResponse.message === "Cette adresse mail existe deja veuillez vous connecter")
            {
                require("../plugins/pDialog.js")("",true,false);
                window.plugins.toast.showShortBottom("Cette adresse mail existe deja veuillez vous connecter");
                localStorage.removeItem("userInfos");
                localStorage.removeItem("verificationCode");
                let connexionView = require("../views/connexion.js");
                    connexionView.create();
            }
          else if(xhrResponse.message === "Operation finie sur la connexion")
            {
               if(xhrResponse.statut === "Connexion ok")
                {
                  require("../plugins/pDialog.js")("",true,false);
                  let userInfos = 
                   {
                     email:xhrResponse.email,
                     telephone:xhrResponse.telephone,
                     identifiant:xhrResponse.identifiant
                   };
                  localStorage.setItem("storeUserInfos", JSON.stringify(userInfos));
                  let homePage = require("../views/home.js");
                      homePage.create();
                  widget_to_dispose.dispose();
                }
               else if(xhrResponse.statut === "Le couple login mot de passe ne correspond pas")
                {
                    require("../plugins/pDialog.js")("",true,false);
                    window.plugins.toast.showShortBottom("Le couple login mot de passe ne correspond pas");
                }
                
            }
         });
        xhr.addEventListener("error", () =>
         {
            require("../plugins/pDialog.js")("",true,false);
            window.plugins.toast.showShortCenter("Pas de connexion internet");
         });
        xhr.responseType = "text";
        xhr.open('GET',urlToSend, true);
        xhr.send(null);
 };