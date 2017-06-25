module.exports = (quizzId,titlePage) =>
 {
    "use strict";
    // On lance une requete ajax de recuperation de quizz et on lance la gestion du quizz
    const themeColor = "#84BD3A";
    let activityIndicator;
    let quizzView = new tabris.Page({
      title: `Quizz ${titlePage}`,
      background:`#fafafa`,
      elevation:2
    }).on("disappear", function(){this.dispose();});
    
    let scrollView = new tabris.ScrollView({
        left:0,right:0,top:0,bottom:0
    }).appendTo(quizzView);
    
    let urlToSend = `https://www.upa.ovh/gestionApplication/retrieveCompleteQuizzToDbById.php?id_quizz=${quizzId}`;
    function RetrieveQuizzToDb()
     {
        let xhrDisplayQuizz =  new XMLHttpRequest();
        xhrDisplayQuizz.addEventListener("loadstart", () =>
         {
            activityIndicator = new tabris.ActivityIndicator({
              width:40,height:40,centerX:0,centerY:0
            }).appendTo(scrollView);  
         });
        xhrDisplayQuizz.addEventListener("load", () =>
         {
             activityIndicator.visible = false;
             let response = JSON.parse(xhrDisplayQuizz.responseText);
             let j = response.length;
             for(let i = 0;i<j; i++)
              {
                 let compositeQuestion = new tabris.Composite({
                     left:0,right:0,top:i===0?0:["prev()", 10],
                     background:"#fff",
                     elevation:2,
                  }).appendTo(scrollView);
                
                let questions = new tabris.TextView({
                    left:15, right:15, top:5,
                    text:response[i].question,
                     font:" 20px roboto noto"
                 }).appendTo(compositeQuestion);
              
              response[i].response.forEach(function(title) {
                new tabris.RadioButton({
                 left: 15, right:15, top: 'prev() 10',
                 text: title,
                 textColor:"#9e9e9e"
               }).on('checkedChanged', function({target, value: checked}) {
               if(checked)
                {
                  console.log(target.text);
                  console.log(response[i].correctAnswer);
                }
               }).appendTo(compositeQuestion);
               
              });
              }
             
         });
       xhrDisplayQuizz.addEventListener("error", () =>
         {
            activityIndicator.visible = false;
            require("../custom_widgets/snackbar.js")(quizzView,50,"Pas de connexion internet","Réessayer",themeColor,RetrieveQuizzToDb);
         });
       xhrDisplayQuizz.responseType = "text";
       xhrDisplayQuizz.open('GET',urlToSend, true);
       xhrDisplayQuizz.send(null);
     }
   
    let execRetrieveQuizzToDb = new RetrieveQuizzToDb();
    return quizzView;
 };