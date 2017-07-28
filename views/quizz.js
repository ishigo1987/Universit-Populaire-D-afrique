module.exports = (quizzId, titlePage, numberOfQuestions, navigationViewToInsert) => {
    "use strict";
    // On lance une requete ajax de recuperation de quizz et on lance la gestion du quizz
    const themeColor = "#84BD3A";
    let activityIndicator;
    let createMenuActionIcon;
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
            quizzView.dispose();
        }
    });

    let scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
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
            let j = response.length;
            for (let i = 0; i < j; i++) {
                let compositeQuestion = new tabris.Composite({
                    left: 0,
                    right: 0,
                    top: i === 0 ? 0 : ["prev()", 10],
                    background: "#fff",
                    elevation: 2,
                }).appendTo(scrollView);

                arrayGoodAnswer.push(response[i].correctAnswer);

                let questions = new tabris.TextView({
                    left: 15,
                    right: 15,
                    top: 5,
                    text: response[i].question,
                    font: " 20px roboto noto"
                }).appendTo(compositeQuestion);

                response[i].response.forEach(function (title) {
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
            handleSendQuizz.on("select", () => {
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
                    require("../custom_widgets/alertDialog.js")(`Desolé`, `Vous n'avez trouvé que ${numberOfFoundedQuestions} questions sur ${numberOfQuestions}`, '', `Voir le resultat`, null, execShowResults);
                }
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
