module.exports = (navigationViewToImport) => {
    "use strict";
    const themeColor = "#84BD3A";
    let urlToSend;
    let activityIndicator;
    let execRetrieveJobsToDb;
    let createMenuActionIcon;
    let handleCdiJobs = require("../helpers/actionIcons.js")(createMenuActionIcon, "Cdi", "srcImg", "low", navigationViewToImport);
    let handleCddJobs = require("../helpers/actionIcons.js")(createMenuActionIcon, "Cdd", "srcImg", "low", navigationViewToImport);
    let handleAllJobs = require("../helpers/actionIcons.js")(createMenuActionIcon, "Tout afficher", "srcImg", "low", navigationViewToImport);

    let jobsView = new tabris.Page({
        title: `Offres d'emploi`,
        background: `#fafafa`,
        elevation: 2,
        autoDispose: true
    }).on({
        appear: () => {
            handleCdiJobs.visible = true;
            handleCddJobs.visible = true;
            handleAllJobs.visible = true;
        },
        disappear: () => {
            handleCdiJobs.visible = false;
            handleCddJobs.visible = false;
            handleAllJobs.visible = false;
        }
    });

    handleCdiJobs.on("select", () => {
        // On gere les jobs en CDI
        urlToSend = `https://www.upa.ovh/gestionApplication/retrieveJobsToDb.php?jobs_type=CDI`;
        execRetrieveJobsToDb = new RetrieveJobsToDb();
    });
    handleCddJobs.on("select", () => {
        // On gere les jobs en CDD
        urlToSend = `https://www.upa.ovh/gestionApplication/retrieveJobsToDb.php?jobs_type=CDD`;
        execRetrieveJobsToDb = new RetrieveJobsToDb();
    });
    handleAllJobs.on("select", () => {
        // On gere l'affichage de tout les jobs
        urlToSend = `https://www.upa.ovh/gestionApplication/retrieveJobsToDb.php?jobs_type=all`;
        execRetrieveJobsToDb = new RetrieveJobsToDb();
    });

    let scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "#fafafa",
    }).appendTo(jobsView);

    urlToSend = `https://www.upa.ovh/gestionApplication/retrieveJobsToDb.php?jobs_type=all`;
    // Requete ajax de recupération de Jobs

    function RetrieveJobsToDb() {
        let xhrRetrieveJobs = new XMLHttpRequest();
        xhrRetrieveJobs.addEventListener("loadstart", () => {
            scrollView.children().dispose();
            activityIndicator = new tabris.ActivityIndicator({
                width: 40,
                height: 40,
                centerX: 0,
                centerY: 0
            }).appendTo(scrollView);
        });
        xhrRetrieveJobs.addEventListener("load", () => {
            activityIndicator.visible = false;
            let itemJobs = [];
            let objectData;
            let response = JSON.parse(xhrRetrieveJobs.responseText);
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
                    text: `Pas de résultat trouvé pour ${responseJson.CategorieEmpty}`,
                    textColor: "#757575"
                }).appendTo(scrollView);
            } else {
                let j = response.titre.length;
                for (let i = 0; i < j; i++) {
                    objectData = {
                        titre: response.titre[i],
                        categorie: response.categorie[i],
                        date_mise_en_ligne: response.date_mise_en_ligne[i],
                        lieu_emploi: response.lieu_emploi[i],
                        nom_emploi: response.nom_emploi[i],
                        description: response.description[i],
                        photo_emploi: response.photo_emploi[i]
                    };
                    itemJobs.push(objectData);
                }
                let jobsCollectionView = new tabris.CollectionView({
                    right: 10,
                    bottom: 0,
                    top: 0,
                    left: 0,
                    itemCount: itemJobs.length,
                    cellHeight: 75,
                    createCell: () => {
                        let cell = new tabris.Composite({
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            background: "#fff"
                        });
                        new tabris.Composite({
                            left: 75,
                            bottom: 0,
                            right: 10,
                            height: 1,
                            background: '#eeeeee'
                        }).appendTo(cell);

                        let imageViewCell = new tabris.ImageView({
                            left: 10,
                            top: 10,
                            width: 50,
                            height: 50,
                            cornerRadius: 25,
                            scaleMode: "fill",
                            id: "imageViewCell"
                        }).appendTo(cell);

                        let firstTextViewCell = new tabris.TextView({
                            left: 75,
                            top: 15,
                            right: 15,
                            maxLines: 1,
                            font: "16px roboto, noto",
                            textColor: "#212121",
                            id: "firstTextViewCell"
                        }).appendTo(cell);

                        let secondTextViewCell = new tabris.TextView({
                            left: 75,
                            top: ["prev()", 5],
                            font: "14px roboto, noto",
                            textColor: "#84BD3A",
                            id: "secondTextViewCell"
                        }).appendTo(cell);
                        return cell;
                    },
                    updateCell: (view, index) => {
                        let page = itemJobs[index];
                        view.find("#imageViewCell").set("image", `https://upa.ovh/gestionPanel/${page.photo_emploi}`);
                        view.find("#firstTextViewCell").set("text", page.titre);
                        view.find("#secondTextViewCell").set("text", page.categorie);
                    }
                }).on("select", ({
                    index
                }) => {
                    let indexItem = itemJobs[index];
                    let fullJobsView = require("./fullJobs.js")(navigationViewToImport, indexItem.nom_emploi, indexItem.titre, indexItem.lieu_emploi, indexItem.categorie, indexItem.description, indexItem.date_mise_en_ligne);
                    fullJobsView.appendTo(navigationViewToImport);
                }).appendTo(scrollView);
            }

        });
        xhrRetrieveJobs.addEventListener("error", () => {
            activityIndicator.visible = false;
            require("../custom_widgets/snackbar.js")(jobsView, 50, "Pas de connexion internet", "Réessayer", themeColor, RetrieveJobsToDb);
        });
        xhrRetrieveJobs.responseType = "text";
        xhrRetrieveJobs.open('GET', urlToSend, true);
        xhrRetrieveJobs.send(null);
    }
    execRetrieveJobsToDb = new RetrieveJobsToDb();

    return jobsView;
};
