module.exports = (idQuizzResult,titlePageResult,navigationViewToInsert) =>
 {
    "use strict"; 
    const themeColor = "#84BD3A";
    let activityIndicator;
    let quizzViewResults = new tabris.Page({
        title: `Resultats quizz ${titlePageResult}`,
        background: `#fafafa`,
        elevation: 2
    });
    
     let scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(quizzViewResults);
    
    let urlToSend = `https://www.upa.ovh/gestionApplication/retrieveCompleteQuizzToDbById.php?id_quizz=${idQuizzResult}`;
    
    function retrieveQuizzResultToDb()
     {
         let xhrDisplayResultsQuizz = new XMLHttpRequest();
        xhrDisplayResultsQuizz.addEventListener("loadstart", () => {
            activityIndicator = new tabris.ActivityIndicator({
                width: 40,
                height: 40,
                centerX: 0,
                centerY: 0
            }).appendTo(scrollView);
         });
        xhrDisplayResultsQuizz.addEventListener("load", () =>
         {
            activityIndicator.visible = false;
            let response = JSON.parse(xhrDisplayResultsQuizz.responseText);
            let j = response.length;
            for (let i = 0; i < j; i++) {
                let compositeQuestion = new tabris.Composite({
                    left: 0,
                    right: 0,
                    top: i === 0 ? 0 : ["prev()", 10],
                    background: "#fff",
                    elevation: 2,
                }).appendTo(scrollView);
                
                let questions = new tabris.TextView({
                    left: 15,
                    right: 15,
                    top: 10,
                    text: response[i].question,
                    font: " 20px roboto noto",
                    id:"quizzQuestions"
                }).appendTo(scrollView);
                
                let responses = new tabris.TextView({
                    left: 15,
                    right: 15,
                    top:["#quizzQuestions", 5],
                    textColor:themeColor,
                    font: "18px roboto noto",
                    text:response[i].correctAnswer
                }).appendTo(scrollView);
            }
         });
        xhrDisplayResultsQuizz.addEventListener("error", () =>
         {
            activityIndicator.visible = false;
            require("../custom_widgets/snackbar.js")(quizzViewResults, 50, "Pas de connexion internet", "Réessayer", themeColor, retrieveQuizzResultToDb);
         });
        xhrDisplayResultsQuizz.responseType = "text";
        xhrDisplayResultsQuizz.open('GET', urlToSend, true);
        xhrDisplayResultsQuizz.send(null);
     }
    retrieveQuizzResultToDb();
   return quizzViewResults;
 };