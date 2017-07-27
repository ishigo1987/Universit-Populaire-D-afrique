module.exports = (navigationViewToInsert) => {
    "use strict";
    const themeColor = "#84BD3A";
    let urlToSend;
    let activityIndicator;
    let createMenuActionIcon;
    let handleConcours = require("../helpers/actionIcons.js")(createMenuActionIcon, "Concours", "srcImg", "low", navigationViewToInsert);
    let handleExamens = require("../helpers/actionIcons.js")(createMenuActionIcon, "Examen", "srcImg", "low", navigationViewToInsert);
    let handleAll = require("../helpers/actionIcons.js")(createMenuActionIcon, "Tout afficher", "srcImg", "low", navigationViewToInsert);

    let examsAndConcoursView = new tabris.Page({
        title: `Examens et Concours`,
        background: `#fafafa`,
        elevation: 2,
        autoDispose: true
    }).on({
        appear: () => {
            handleConcours.visible = true;
            handleExamens.visible = true;
            handleAll.visible = true;
        },
        disappear: () => {
            handleConcours.visible = false;
            handleExamens.visible = false;
            handleAll.visible = false;
        }
    });

    handleConcours.on("select", () => {
        // On gere les concours
        urlToSend = `https://www.upa.ovh/gestionApplication/retrieveExamsAndConcoursToDb?request_type=Concours`;
        retrieveExamsAndConcoursToDb();
    });
    handleExamens.on("select", () => {
        // On gere les examens
        urlToSend = `https://www.upa.ovh/gestionApplication/retrieveExamsAndConcoursToDb?request_type=Examen`;
        retrieveExamsAndConcoursToDb();
    });
    handleAll.on("select", () => {
        // On gere l'affichage de tout examens ou concours
        urlToSend = `https://www.upa.ovh/gestionApplication/retrieveExamsAndConcoursToDb?request_type=all`;
        retrieveExamsAndConcoursToDb();
    });

    let scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "#fafafa",
    }).appendTo(examsAndConcoursView);

    urlToSend = `https://www.upa.ovh/gestionApplication/retrieveExamsAndConcoursToDb?request_type=all`;

    function retrieveExamsAndConcoursToDb() {
        let xhrRetrieveExamsAndConcours = new XMLHttpRequest();
        xhrRetrieveExamsAndConcours.addEventListener("loadstart", () => {
            scrollView.children().dispose();
            activityIndicator = new tabris.ActivityIndicator({
                width: 40,
                height: 40,
                centerX: 0,
                centerY: 0
            }).appendTo(scrollView);
        });

        xhrRetrieveExamsAndConcours.addEventListener("load", () => {
            activityIndicator.visible = false;
            const fontAfterCategorieView = "normal 16px roboto, noto";
            let response = JSON.parse(xhrRetrieveExamsAndConcours.responseText);
            if (response.Message === "Pas de resultat") {
                // la requete  n'a pas eu de resultat
                let imageNoResult = new tabris.ImageView({
                    centerX: 0,
                    centerY: 0,
                    image: {
                        src: "img/empty_search.png"
                    },
                    width: 48,
                    height: 48,
                    id: "imageSearch"
                }).appendTo(scrollView);

                let textNoConnection = new tabris.TextView({
                    top: ["#imageSearch", 10],
                    centerX: 0,
                    text: `Pas de résultat trouvé pour ${response.CategorieEmpty}`,
                    textColor: "#757575"
                }).appendTo(scrollView);
            } else {
                let j = response.titre.length;
                for (let i = 0; i < j; i++) {
                    let compositeCard = new tabris.Composite({
                        left: 0,
                        right: 0,
                        top: i === 0 ? 0 : ["prev()", 10],
                        background: "#fff",
                        elevation: 2,
                        opacity: 0,
                        id: "compositeCard"
                    }).appendTo(scrollView);
                    compositeCard.set({
                        transform: {
                            scaleX: 0,
                            scaleY: 0
                        }
                    });
                    compositeCard.animate({
                        transform: {
                            scaleX: 1,
                            scaleY: 1
                        },
                        opacity: 1
                    }, {
                        delay: 0,
                        duration: 250,
                        repeat: 0,
                        reverse: false,
                        easing: "ease-in"
                    });
                    let imageCardView = new tabris.ImageView({
                        left: 20,
                        top: 20,
                        width: 70,
                        height: 70,
                        cornerRadius: 35,
                        image: {
                            src: "https://upa.ovh/gestionPanel/" + response.photo_examens_concours[i] + ""
                        },
                        scaleMode: "fill",
                        id: "imageCard"
                    }).appendTo(compositeCard);

                    let categorieCardView = new tabris.TextView({
                        left: ["#imageCard", 10],
                        top: 25,
                        right: 10,
                        font: "bold 17px roboto, noto",
                        text: response.categorie[i],
                        textColor: "#424242"
                    }).appendTo(compositeCard);

                    let timePutOnline = new tabris.TextView({
                        left: ["#imageCard", 10],
                        top: 45,
                        font: fontAfterCategorieView,
                        text: "Date de mise en ligne:",
                        id: "timeCard"
                    }).appendTo(compositeCard);

                    let valueTimeCardView = new tabris.TextView({
                        left: ["#timeCard", 3],
                        top: 45,
                        font: fontAfterCategorieView,
                        text: response.date_mise_en_ligne[i],
                        textColor: themeColor
                    }).appendTo(compositeCard);

                    let placeCardView = new tabris.TextView({
                        left: ["#imageCard", 10],
                        top: 65,
                        font: fontAfterCategorieView,
                        text: "Lieu:",
                        id: "levelCard"
                    }).appendTo(compositeCard);

                    let placeExamsConcoursCardView = new tabris.TextView({
                        left: ["#levelCard", 3],
                        top: 65,
                        font: fontAfterCategorieView,
                        text: response.lieu_examens_concours[i],
                        textColor: themeColor
                    }).appendTo(compositeCard);

                    let titreCardView = new tabris.TextView({
                        left: 20,
                        top: ["#imageCard", 15],
                        right: 20,
                        font: "17px roboto, noto",
                        text: (response.titre[i]).toUpperCase(),
                        textColor: "#424242"
                    }).appendTo(compositeCard);

                    let nom_ecole_universite = new tabris.TextView({
                        left: 20,
                        top: ["prev()", 5],
                        right: 10,
                        font: fontAfterCategorieView,
                        text: response.nom_examens_concours[i],
                        textColor: themeColor
                    }).appendTo(compositeCard);

                    let descriptionCardView = new tabris.TextView({
                        left: 20,
                        top: ["prev()", 5],
                        right: 10,
                        font: fontAfterCategorieView,
                        text: response.description[i],
                        textColor: "#757575"
                    }).appendTo(compositeCard);

                    let border = new tabris.Composite({
                        left: 0,
                        right: 0,
                        top: ["prev()", 5],
                        height: 1,
                        background: "#eeeeee"
                    }).appendTo(compositeCard);

                    let share = new tabris.TextView({
                        left: 20,
                        top: ["prev()", 15],
                        right: 10,
                        font: fontAfterCategorieView,
                        text: "PARTAGER",
                        textColor: themeColor
                    }).appendTo(compositeCard);
                    share.titre = (response.titre[i]).toUpperCase();
                    share.date_mise_en_ligne = new Date(response.date_mise_en_ligne[i]);
                    share.lieu = response.lieu_examens_concours[i];
                    share.nom_ecole_universite = response.nom_examens_concours[i];
                    share.description = response.description[i];
                    share.on("tap", function () {
                        let messageToShare = this.titre + "\n" + this.date_mise_en_ligne + "\n" + this.lieu + "\n" + this.nom_ecole_universite + "\n" + this.description;
                        window.plugins.socialsharing.share(messageToShare);
                    });

                    let bottomSpace = new tabris.Composite({
                        left: 0,
                        bottom: 0,
                        right: 0,
                        top: ["prev()", 10],
                    }).appendTo(compositeCard);


                }

            }
        });

        xhrRetrieveExamsAndConcours.addEventListener("error", () => {
            activityIndicator.visible = false;
            require("../custom_widgets/snackbar.js")(examsAndConcoursView, 50, "Pas de connexion internet", "Réessayer", themeColor, retrieveExamsAndConcoursToDb);
        });
        xhrRetrieveExamsAndConcours.responseType = "text";
        xhrRetrieveExamsAndConcours.open('GET', urlToSend, true);
        xhrRetrieveExamsAndConcours.send(null);
    }
    retrieveExamsAndConcoursToDb();
    return examsAndConcoursView;
};
