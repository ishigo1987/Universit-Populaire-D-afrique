exports.create = () =>
 { 
  "use strict";
  const themeColor = "#84BD3A";
  let inscriptionView = new tabris.Page({
      title: `S'inscrire`,
      background:`#fafafa`
    }).on("disappear", function(){this.dispose();});
    
 let scrollView = new tabris.ScrollView({
        left:0,
        right:0,
        top:0,
        bottom:0,
        background: "#fafafa",
        }).appendTo(inscriptionView);
    
 let firstText = new tabris.TextView({
    layoutData:
     {
       top:15,
       centerX:0
     },
    font: "bold 20px roboto, noto",
    text:"Pas encore inscrit?",
    textColor:"#212121",
    }).appendTo(scrollView);
    
 let secondText = new tabris.TextView({
    layoutData:
     {
       top:["prev()", 10],
       centerX:0
     },
    font: "14px roboto, noto",
    text:"Créez votre compte en une minute",
    textColor:"#212121",
    }).appendTo(scrollView);
    
let identifiant = new tabris.TextInput({
     layoutData:
      {
        top:["prev()", 20],
        left:"10%",
        right:"10%",
      },
    font: "16px roboto, noto",
    message: "Entrez votre identifiant",
    borderColor:themeColor
 }).appendTo(scrollView);    
  
let email = new tabris.TextInput({
     layoutData:
      {
        top:["prev()", 20],
        left:"10%",
        right:"10%",
      },
    font: "16px roboto, noto",
    message: "Entrez votre adresse mail",
    keyboard:"email",
    borderColor:themeColor
 }).appendTo(scrollView);     
  
let phoneNumber = new tabris.TextInput({
     layoutData:
      {
        top:["prev()", 20],
        left:"10%",
        right:"10%",
      },
    font: "16px roboto, noto",
    message: "Entrez votre numero de telephone",
    keyboard:"phone",
    borderColor:themeColor
 }).appendTo(scrollView);    
   
let password = new tabris.TextInput({
      layoutData:
       {
        top:["prev()", 20],
        left:"10%",
        right:"10%",
       },
     font: "16px roboto, noto",
     message: "Entrez votre mot de passe",
     type:"password",
     borderColor:themeColor
    }).appendTo(scrollView);
    
let confirmPassword = new tabris.TextInput({
      layoutData:
       {
        top:["prev()", 20],
        left:"10%",
        right:"10%",
       },
     font: "16px roboto, noto",
     message: "Confirmez votre mot de passe",
     type:"password",
     borderColor:themeColor
    }).appendTo(scrollView);  
  
let button = new tabris.Button({
     layoutData:
       {
         top:["prev()", 30],
         left:"10%",
         right:"10%"
       },
     font: "16px roboto, noto",
     textColor:"#fff",
     text:"S'inscrire",
     background:themeColor
   }).on("select", () =>
    {
       //On teste que les champs ne sont pas vides
       const identifiantValue = identifiant.text;
       const emailValue = email.text;
       const phoneNumberValue = phoneNumber.text;
       const passwordValue = password.text;
       const confirmPasswordValue = confirmPassword.text;
       const regexMail =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; 
       if(identifiantValue === "" || emailValue === "" || phoneNumberValue === "" || passwordValue === "" || confirmPasswordValue === "")
        {
            window.plugins.toast.showShortCenter("Veuillez remplir tout les champs");
        }
       else if(!regexMail.test(emailValue))
        {
            window.plugins.toast.showShortCenter("Veuillez entrer une adresse mail valide");
        }
       else if(phoneNumberValue.length < 9)
        {
            window.plugins.toast.showShortCenter("Veuillez entrer un numéro de telephone valide");
        }
       else if(passwordValue !== confirmPasswordValue)
        {
            window.plugins.toast.showShortCenter("Les champs de mot de passe ne correspondent pas");
        }
       else
        {
          let dataToSend = 
           {
             identifiant:identifiantValue,
             email:emailValue,
             phoneNumber:phoneNumberValue,
             password:passwordValue
           };
            localStorage.setItem("userInfos", JSON.stringify(dataToSend));
            let responseVerificationCode = require("../modules/sendVerificationCode.js")(emailValue,"inscriptionView");
       }
    }).appendTo(scrollView);    
    
  return inscriptionView;
 };