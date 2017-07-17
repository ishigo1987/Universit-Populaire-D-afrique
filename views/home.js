exports.create = () => {
    "use strict";
    const themeColor = "#84BD3A";
    const tabBackground = "#eeeeee";
    let firstTimeOpenQuizzTab = true;
    require("../modules/tabrisUi.js")(`dark`, `#69972e`, "#fff");
    let createnavigationView;
    let executeNavigationView = require("../helpers/navigationViewAnimation.js")(createnavigationView, false);
    executeNavigationView.set({
        drawerActionVisible: true
    });
    let objectUserInformations = JSON.parse(localStorage.getItem("storeUserInfos"));
    let createMenuActionIcon;
    let handleActionSettings = require("../helpers/actionIcons.js")(createMenuActionIcon, "Reglages", "srcImg", "low", executeNavigationView);
    let handleActionCategorie = require("../helpers/actionIcons.js")(createMenuActionIcon, "Categorie", "srcImg", "low", executeNavigationView);

    handleActionSettings.on("select", function () {
        console.log("reglages");
    });
    let drawer = tabris.ui.drawer;
    drawer.enabled = true;
    drawer.background = "#ffffff";

    let homeView = new tabris.Page({
        title: `UPA`,
        background: `#fafafa`,
    }).on({
        appear: () => {
            handleActionSettings.visible = true;
            handleActionCategorie.visible = true;
            drawer.enabled = true;
        },
        disappear: () => {
            handleActionSettings.visible = false;
            handleActionCategorie.visible = false;
            drawer.enabled = false;
        }
    }).appendTo(executeNavigationView);

    // Creation du composite du drawer

    let compositeDrawer = new tabris.Composite({
        left: 0,
        top: 0,
        height: 70,
        right: 0,
        background: "#f5f5f5"
    }).appendTo(drawer);

    let textViewCompositeIdentifiant = new tabris.TextView({
        left: 15,
        top: 14,
        font: "bold 16px roboto, noto",
        text: objectUserInformations.identifiant,
        textColor: "#616161"
    }).appendTo(compositeDrawer);

    let textViewCompositeEmail = new tabris.TextView({
        left: 15,
        top: ["prev()", 1],
        font: "14px roboto, noto",
        text: objectUserInformations.email,
        textColor: themeColor
    }).appendTo(compositeDrawer);

    // Creation de la collectionView du drawer 

    let itemConfig = [{
            title: "Examens et concours",
            image: "icons/android/exams_concours.png"
     },
        {
            title: "Planning de cours",
            image: "icons/android/planning_cours.png"
     },
        {
            title: "Offres d'emploi",
            image: "icons/android/search_offer.png"
     },
        {
            title: "Forum",
            image: "icons/android/forum_bubbles.png"
     },
        {
            title: "Déconnexion",
            image: "icons/android/disconnection.png"
     }];

    let drawerCollectionView = new tabris.CollectionView({
        right: 0,
        bottom: 0,
        top: 70,
        left: 0,
        itemCount: itemConfig.length,
        cellHeight: 64,
        createCell: () => {
            let cell = new tabris.Composite({
                right: 0,
                bottom: 0,
                top: 100,
                background: "#fff",
            });
            // Bordures
            new tabris.Composite({
                left: 0,
                bottom: 0,
                right: 0,
                height: 1,
                background: "#eeeeee"
            }).appendTo(cell);

            let imageViewCell = new tabris.ImageView({
                left: 15,
                centerY: 0,
                id: "imageViewCell"
            }).appendTo(cell);
            let textViewCell = new tabris.TextView({
                left: 60,
                centerY: 0,
                font: "16px roboto, noto",
                textColor: "#616161",
                id: "textViewCell"
            }).appendTo(cell);

            return cell;
        },
        updateCell: (view, index) => {
            let page = itemConfig[index];
            view.find("#imageViewCell").set("image", page.image);
            view.find("#textViewCell").set("text", page.title);
        }
    }).on("select", ({
        index
    }) => {
        let itemIndex = itemConfig[index];
        drawer.close();
        if (itemIndex.title === "Déconnexion") {
            localStorage.removeItem("storeUserInfos");
            let connexionPage = require("./connexion.js");
            connexionPage.create();
            executeNavigationView.dispose();
        } else if (itemIndex.title === "Offres d'emploi") {
            let jobsView = require("./jobs.js")(executeNavigationView);
            jobsView.appendTo(executeNavigationView);
        } else if (itemIndex.title === "Planning de cours") {
            require("../modules/downloadPlanning.js")();
        }
    }).appendTo(drawer);

    // Fin creation collectionView du drawer

    let tabFolder = new tabris.TabFolder({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        paging: true,
        elevation: 2,
        textColor: "#fff",
        background: themeColor
    }).on('selectionChanged', function ({
        value: tab
    }) {
        let tabActive = this.get("selection");
        tabActive = tabActive.title;
        if (tabActive === "Quizz") {
            if (firstTimeOpenQuizzTab === true) {
                // requete ajax chargement du quizz
                let urlQuizz = "https://www.upa.ovh/gestionApplication/retrieveQuizzToDb.php?categorie=all";
                require("../modules/ajaxQuizz.js")(tabQuizz, urlQuizz, scrollViewTabQuizz, themeColor, executeNavigationView);
                firstTimeOpenQuizzTab = false;
            } else {
                return false;
            }
        }

    }).appendTo(homeView);

    let tabQuizz = new tabris.Tab({
        title: "Quizz",
        background: tabBackground
    }).appendTo(tabFolder);

    let tabCours = new tabris.Tab({
        title: "Cours",
        background: tabBackground
    }).appendTo(tabFolder);

    //    let tabServices = new tabris.Tab({
    //       title: "Services",
    //       background:tabBackground
    //     }).appendTo(tabFolder);

    tabFolder.set("selection", tabCours);

    let scrollViewTabCours = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(tabCours);

    let scrollViewTabQuizz = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(tabQuizz);

    // Cette fonction gere la recherche par categorie        
    function handleSearch() {
        if (localStorage.getItem("categoryQuery") !== null) {
            let tabActive = tabFolder.get("selection");
            tabActive = tabActive.title;
            if (tabActive === "Cours") {
                // On lance la requete ajax de selection de categorie
                let url = `https://www.upa.ovh/gestionApplication/retrieveLessonsToDb.php?categorie=${localStorage.getItem("categoryQuery")}`;
                require("../modules/ajaxSearchLessons.js")(tabCours, url, scrollViewTabCours, themeColor);
                localStorage.removeItem("categoryQuery");
            } else if (tabActive === "Quizz") {
                // Ajax quizz categorie
                let url = `https://www.upa.ovh/gestionApplication/retrieveQuizzToDb.php?categorie=${localStorage.getItem("categoryQuery")}`;
                require("../modules/ajaxQuizz.js")(tabQuizz, urlQuizz, scrollViewTabQuizz, themeColor, executeNavigationView);
                localStorage.removeItem("categoryQuery");
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    // On utilise setInterval pour la simple raison que le localStorage.categoryQuery est rempli dans un autre module(actionSheet);
    setInterval(handleSearch, 600);

    let urlCours = "https://www.upa.ovh/gestionApplication/retrieveLessonsToDb.php?categorie=all";
    require("../modules/ajaxLessons.js")(tabCours, urlCours, scrollViewTabCours, themeColor);

    return executeNavigationView;
};
