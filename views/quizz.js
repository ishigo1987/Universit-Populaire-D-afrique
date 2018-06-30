module.exports = (quizzId, titlePage, numberOfQuestions, navigationViewToInsert) => {
    "use strict";
    // On lance une requete ajax de recuperation de quizz et on lance la gestion du quizz
    const themeColor = "#84BD3A";
    let activityIndicator;
    let createMenuActionIcon;
    let timer;
    let handleSendQuizz = require("../helpers/actionIcons.js")(createMenuActionIcon, "", "icons/android/check.png", "high", navigationViewToInsert);
    let quizzView = new tabris.Page({
        title: `Quizz ${titlePage}`,
        background: `#fafafa`,
        elevation: 2
    }).on({
        appear: () => {
            handleSendQuizz.visible = true;
        },
        disappear: () => {
            handleSendQuizz.visible = false;
            clearInterval(timer);
            quizzView.dispose();
        }
    });
    const areaTimer = new tabris.Composite({top:0,right:0,left:0,height:60,background:themeColor}).appendTo(quizzView);

    let scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 60,
        bottom: 0
    }).appendTo(quizzView);

    let urlToSend = `https://www.upa.ovh/gestionApplication/retrieveCompleteQuizzToDbById.php?id_quizz=${quizzId}`;

    function RetrieveQuizzToDb() {
        let xhrDisplayQuizz = new XMLHttpRequest();
        xhrDisplayQuizz.addEventListener("loadstart", () => {
            activityIndicator = new tabris.ActivityIndicator({
                width: 40,
                height: 40,
                centerX: 0,
                centerY: 0
            }).appendTo(scrollView);
        });
        xhrDisplayQuizz.addEventListener("load", () => {
            activityIndicator.visible = false;
            let arrayGoodAnswer = [];
            let response = JSON.parse(xhrDisplayQuizz.responseText);
            const quizzText = JSON.parse(response.quizz);
            let j = quizzText.length;
            const popover = new tabris.Popover({width: 300, height: 400}).open();
            const popoverNavigationView = new tabris.NavigationView({left:0,right:0,top:0,bottom:0,toolbarColor:themeColor, titleTextColor:"#fff"}).appendTo(popover.contentView);
            const instructionsText = new tabris.Page({title:'Insctructions'}).appendTo(popoverNavigationView);
            const textIntro = new tabris.TextView({top:40,left:15,right:15,text:`Répondez aux questions en cliquant sur la bonne réponse,vous disposez de ${response.temps_quizz} minute(s) pour terminer le quizz au bout du temps imparti le quizz sera considéré comme terminé.`,textColor:'#757575',font:"20px roboto"}).appendTo(instructionsText);
            const buttonToAgree = new tabris.Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Commencer le quizz",background: themeColor,elevation:0})
            .on('select',()=>{
              // Gestion de la durée du quizz
              const elapsedTimeText = new tabris.TextView({centerY:0,centerX:0,textColor:'#ffffff',text:'00',font:"18px roboto"}).appendTo(areaTimer);
              const totalTimeText = new tabris.TextView({centerY:0,left:['prev()',3],textColor:"#ffffff",text:`/${response.temps_quizz}min`,font:"18px roboto"}).appendTo(areaTimer);
              let totalTime = Number(response.temps_quizz) * 60;
              let counter = totalTime;
              timer = setInterval(()=>{
                counter--;
                elapsedTimeText.text = `-${counter}s`;
                if(counter === Math.round(totalTime / 2)){
                  window.plugins.toast.showLongCenter("Il ne vous reste plus que la moitié du temps.");
                }else if(counter === 0){
                  elapsedTimeText.text = '0s';
                  endOfQuizz();
                  clearInterval(timer);
                }
              },1000);
              popover.close();
            }).appendTo(instructionsText);
            for (let i = 0; i < j; i++) {
                let compositeQuestion = new tabris.Composite({
                    left: 0,
                    right: 0,
                    top: i === 0 ? 0 : ["prev()", 10],
                    background: "#fff",
                    elevation: 2,
                }).appendTo(scrollView);

                arrayGoodAnswer.push(quizzText[i].correctAnswer);

                let questions = new tabris.TextView({
                    left: 15,
                    right: 15,
                    top: 5,
                    text: quizzText[i].question,
                    font: " 20px roboto noto"
                }).appendTo(compositeQuestion);

              quizzText[i].response.forEach(function (title) {
                    new tabris.RadioButton({
                        left: 15,
                        right: 15,
                        top: 'prev() 10',
                        text: title,
                        textColor: "#9e9e9e",
                        class: "radioButtonQuizz"
                    }).appendTo(compositeQuestion);

                });
            }
            // Gestion de la validation du quizz lorsqu'on clique sur le bouton d'envoi
            function endOfQuizz(){
              let arraySelectResponse = [];
              let radioCollection = quizzView.find(".radioButtonQuizz");
              let k = radioCollection.length;
              for (let i = 0; i < k; i++) {
                  if (radioCollection[i].checked) {
                      arraySelectResponse.push(radioCollection[i].text);
                  }
              }
              if (JSON.stringify(arraySelectResponse) === JSON.stringify(arrayGoodAnswer)) {
                  function execCancelButton() {
                      while (k--) {
                          radioCollection[k].checked = false;
                      }
                  }
                  require("../custom_widgets/alertDialog.js")(`Felicitations`, `Vous avez trouvé toutes les ${numberOfQuestions} questions du quizz. Votre score est de 100%`, '', `Fermer`, null, execCancelButton);
              } else {
                  let numberOfFoundedQuestions = 0;
                  let l = arraySelectResponse.length;
                  while (l--) {
                      if (arrayGoodAnswer.includes(arraySelectResponse[l]) === true) {
                          numberOfFoundedQuestions++;
                      }
                  }

                  function execShowResults() {
                      let quizzViewResults = require("./resultsQuizz.js")(quizzId, titlePage, navigationViewToInsert);
                      quizzViewResults.appendTo(navigationViewToInsert);
                  }
                  if (numberOfFoundedQuestions === 0) {
                      require("../custom_widgets/alertDialog.js")(`Fin du quizz`, `Vous n'avez trouvé aucune questions`, '', `Voir le resultat`, null, execShowResults);
                  } else {
                      require("../custom_widgets/alertDialog.js")(`Fin du quizz`, `Vous n'avez trouvé que ${numberOfFoundedQuestions} question(s) sur ${numberOfQuestions}`, '', `Voir le resultat`, null, execShowResults);
                  }

              }
            }
            handleSendQuizz.on("select", () => {
              clearInterval(timer);
              endOfQuizz();
            });

        });
        xhrDisplayQuizz.addEventListener("error", () => {
            activityIndicator.visible = false;
            require("../custom_widgets/snackbar.js")(quizzView, 50, "Pas de connexion internet", "Réessayer", themeColor, RetrieveQuizzToDb);
        });
        xhrDisplayQuizz.responseType = "text";
        xhrDisplayQuizz.open('GET', urlToSend, true);
        xhrDisplayQuizz.send(null);
    }
    let execRetrieveQuizzToDb = new RetrieveQuizzToDb();
    return quizzView;
};
