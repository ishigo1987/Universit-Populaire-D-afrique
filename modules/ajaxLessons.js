module.exports = (tabPart,urlToSend,areaToInsert,themeColorText) =>
 {
    function AjaxlessonsJson()
     {
         let activityIndicator;
         let xhrAjaxLessons = new XMLHttpRequest();
             xhrAjaxLessons.addEventListener("loadstart", () =>
              {
                 activityIndicator = new tabris.ActivityIndicator({
                    width:40,height:40,centerX:0,centerY:0
                  }).appendTo(areaToInsert);  
              });
             xhrAjaxLessons.addEventListener("load", () =>
              {
                  activityIndicator.visible = false;
                  const fontAfterCategorieView = "normal 15px roboto, noto";
                  let responseJson = JSON.parse(xhrAjaxLessons.responseText);
                  let j = responseJson.titre.length;
                  for(let i=0; i<j; i++)
                   {
//                         let card = initialiseCard(responseJson.description[i], responseJson.titre[i], {
//                             top:["prev()", 10],
//                             image:"https://upa.ovh/gestionPanel/"+responseJson.photo_cours[i]+"",
//                             imageCaptionColor: '#ffffff',
//                             imagePosition: 'top',
//                             imageCaption:responseJson.categorie[i],
//                             imageCaptionColor:"#84BD3A"
//                         }).appendTo(areaToInsert);
                          let compositeCard = new tabris.Composite({
                              left:0,right:0,top:i===0?0:["prev()", 10],
                              background:"#fff",
                              height:300,
                              elevation:2,
                              opacity:0,
                              id:"compositeCard"
                             }).appendTo(areaToInsert);
                           compositeCard.set({transform:{scaleX:0,scaleY:0}});
                           compositeCard.animate({
                               transform:{scaleX:1,scaleY:1},
                               opacity:1
                              },
                              {
                                delay: 0,
                                duration:250,
                                repeat:0,
                                reverse:false,
                                easing: "ease-in"
                             });
                          
                        let imageCardView = new tabris.ImageView({
                              left:20,top:20,width:70,height:70,
                              cornerRadius:35,
                              image:{src:"https://upa.ovh/gestionPanel/"+responseJson.photo_cours[i]+""},
                              scaleMode:"fill",
                              id:"imageCard"
                           }).appendTo(compositeCard);
                      
                          let categorieCardView = new tabris.TextView({
                              left:["#imageCard", 10],top:25,right:10,
                              font: "bold 17px roboto, noto",
                              text:responseJson.categorie[i],
                              textColor:"#424242"
                           }).appendTo(compositeCard);
                            
                          let timeCardView = new tabris.TextView({
                              left:["#imageCard", 10],top:45,
                              font: fontAfterCategorieView,
                              text:"Durée:",
                              id:"timeCard"
                           }).appendTo(compositeCard);
                       
                          let valueTimeCardView = new tabris.TextView({
                              left:["#timeCard", 3],top:45,
                              font: fontAfterCategorieView,
                              text:responseJson.temps_apprentissage[i],
                              textColor:themeColorText
                           }).appendTo(compositeCard);
                       
                          let levelCardView = new tabris.TextView({
                              left:["#imageCard", 10],top:65,
                              font: fontAfterCategorieView,
                              text:"Niveau:",
                              id:"levelCard"
                        }).appendTo(compositeCard);
                       
                          let valueLevelCardView = new tabris.TextView({
                              left:["#levelCard", 3],top:65,
                              font: fontAfterCategorieView,
                              text:responseJson.niveau[i],
                              textColor:themeColorText
                           }).appendTo(compositeCard);
                       
                          let titreCardView = new tabris.TextView({
                              left:20,top:["#imageCard",15],right:20,
                              font: "17px roboto, noto",
                              text:responseJson.titre[i],
                              textColor:"#424242"
                           }).appendTo(compositeCard);
                       
                         let descriptionCardView = new tabris.TextView({
                             left:20,top:["prev()",5],right:10,
                             font: fontAfterCategorieView,
                             text:responseJson.description[i],
                             textColor:"#757575"
                          }).appendTo(compositeCard);
                         
                         let imgShare = new tabris.ImageView({
                             left:20,bottom:["#compositeCard", 12],
                             image:{src:"icons/android/share_1.png"},
                             scaleMode:"fill",
                             width:16,
                             height:16,
                             id:"imgShare"
                           }).appendTo(compositeCard);
                       
                       let textShare = new tabris.TextView({
                           left:["#imgShare", 5],bottom:["#compositeCard", 12],
                           font:"bold 13px roboto, noto",
                           text:"Partager",
                           textColor:themeColorText
                       }).appendTo(compositeCard);
                             textShare.textToShare = responseJson.titre[i];
                             textShare.on("tap", function(){
                             let textToShare = this.textToShare;
                             let secondPartText = "Ce cours est téléchargeable sur l'application mobile pour android UPA a ce lien";
                             // Ce lien sera remplacé par le lien sur le playstore
                             let linkDownloadUpa = "https://upa.ovh";
                             let messageToShare = textToShare + "\n" + secondPartText + "\n" + linkDownloadUpa;
                             window.plugins.socialsharing.share(messageToShare);
                             });
                        
                       let textDownload = new tabris.TextView({
                             right:20,bottom:["#compositeCard", 12],
                             font:"bold 13px roboto, noto",
                             text:"Télécharger",
                             textColor:themeColorText,
                             id:"textDownload"
                          }).appendTo(compositeCard);
                             textDownload.linkToDownload = "https://upa.ovh/gestionPanel/"+responseJson.url_cours[i]+"";
                             textDownload.on("tap", function(){
                             window.plugins.toast.showShortBottom(`Téléchargement du fichier ${responseJson.titre[i]} en cours il s'ouvrira automatiquement une fois le téléchargement terminé`);
                             require("../plugins/downloadFiles.js")(this.linkToDownload);
                             });
                        
                       let imgDownload = new tabris.ImageView({
                             right:["#textDownload", 5],bottom:["#compositeCard", 12],
                             image:{src:"icons/android/download_1.png"},
                             scaleMode:"fill",
                             width:16,
                             height:16,
                           }).appendTo(compositeCard);
                       
                   }
                 
              });
             xhrAjaxLessons.addEventListener("error", () =>
              {
                  activityIndicator.visible = false;
                  require("../custom_widgets/snackbar.js")(tabPart,50,"Pas de connexion internet","Réessayer",themeColorText,AjaxlessonsJson);
              });
             xhrAjaxLessons.responseType = "text";
             xhrAjaxLessons.open('GET',urlToSend, true);
             xhrAjaxLessons.send(null);
         
    }
   let execAjaxlessonsJson = new AjaxlessonsJson();

 };