exports.create = () =>
 {
    "use strict";
    const themeColor = "#84BD3A";
    let layoutDataHelper = {top:["prev()", 30],left:"10%",right:"10%",};
    let enterEmailAdressView = new tabris.Page({
      title: `Adresse Email`,
      background:`#fafafa`
    });
    
    let introText = new tabris.TextView({
       layoutData:
          {
            top:15,
            right:"10%",
            left:"10%"
          },
       font: "16px roboto, noto",
       text:`Veuillez entrer votre adresse mail`,
       textColor:"#212121",
      }).appendTo(enterEmailAdressView);
    
    let adresseMailInput = new tabris.TextInput({
        layoutData:layoutDataHelper,
        font: "16px roboto, noto",
        message: "Entrez votre adresse mail",
        keyboard:"email",
        borderColor:themeColor
    }).appendTo(enterEmailAdressView);  

   let button = new tabris.Button({
      layoutData:layoutDataHelper,
      font: "16px roboto, noto",
      textColor:"#fff",
      text:"Continuer",
      background:themeColor,
      elevation:0
   }).on("select", () =>
      {
        const regexMail =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; 
        const adresseMailInputValue = adresseMailInput.text;
        if(adresseMailInputValue === "")
         {
             window.plugins.toast.showShortBottom("Veuillez entrer votre adresse mail");
         }
        else if(!regexMail.test(adresseMailInputValue))
         {
             window.plugins.toast.showShortBottom("Veuillez entrer une adresse mail valide");
         }
        else
         {
            let dataToSend = 
             {
              email: adresseMailInputValue 
             };
            localStorage.setItem("userInfos", JSON.stringify(dataToSend));
            // je crée ce localStorage pour signifier a la vue de verification d'email que je veux etre redirigé 
            //vers la vue entrer un nouveau mot de passe
            localStorage.setItem("enterEmailAdressView", "resetPassword");
            require("../modules/sendVerificationCode.js")(adresseMailInputValue,"enterEmailAdressView");
         }
      }).appendTo(enterEmailAdressView);   
    
    return enterEmailAdressView;
 };