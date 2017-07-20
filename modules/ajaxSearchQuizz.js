module.exports = (tabPart, urlToSend, areaToInsert, themeColorText, navigationViewToInsert) => {

    function AjaxSearchQuizz() {
        let activityIndicator;
        let xhrSearchQuizz = new XMLHttpRequest();
        xhrSearchQuizz.addEventListener("loadstart", () => {
            areaToInsert.children().dispose();
            activityIndicator = new tabris.ActivityIndicator({
                width: 40,
                height: 40,
                centerX: 0,
                centerY: 0
            }).appendTo(areaToInsert);
        });
        xhrSearchQuizz.addEventListener("load", () => {
            activityIndicator.visible = false;
            const fontAfterCategorieView = "normal 15px roboto, noto";
            let responseJson = JSON.parse(xhrSearchQuizz.responseText);
            if (responseJson.Message === "Pas de resultat") {
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
                }).appendTo(areaToInsert);

                let textNoConnection = new tabris.TextView({
                    top: ["#imageSearch", 10],
                    centerX: 0,
                    text: `Pas de résultat trouvé pour ${responseJson.CategorieEmpty}`,
                    textColor: "#757575"
                }).appendTo(areaToInsert);
            } else {
                let itemQuizz = [];
                let responseJson = JSON.parse(xhrSearchQuizz.responseText);
                let objectData;
                let j = responseJson.Id_quizz.length;
                for (let i = 0; i < j; i++) {
                    objectData = {
                        categorie: responseJson.Categorie[i],
                        nombre_questions: responseJson.Nombre_de_questions[i],
                        id_quizz: responseJson.Id_quizz[i]
                    };
                    itemQuizz.push(objectData);
                }
                let quizzCollectionView = new tabris.CollectionView({
                    right: 0,
                    bottom: 0,
                    top: 0,
                    left: 0,
                    cellHeight: 70,
                    itemCount: itemQuizz.length,
                    createCell: () => {
                        let cell = new tabris.Composite({
                            right: 0,
                            bottom: 0,
                            background: "#fff",
                        }).on("tap", function () {
                            this.background = "#e0e0e0";
                            setTimeout(() => {
                                cell.background = "#fff";
                            }, 50);
                        });

                        // Bordures
                        new tabris.Composite({
                            left: 0,
                            bottom: 0,
                            right: 0,
                            height: 1,
                            background: "#eeeeee"
                        }).appendTo(cell);

                        let textViewCategorie = new tabris.TextView({
                            left: 15,
                            top: 7,
                            font: "bold 16px roboto, noto",
                            textColor: "#616161",
                            id: "textViewCategorie"
                        }).appendTo(cell);

                        let textViewNombreQuestions = new tabris.TextView({
                            left: 15,
                            top: "prev()",
                            bottom: 5,
                            font: "14px roboto, noto",
                            textColor: themeColorText,
                            id: "textViewNombreQuestions"
                        }).appendTo(cell);

                        return cell;
                    },
                    updateCell: (view, index) => {
                        let page = itemQuizz[index];
                        view.find("#textViewCategorie").set("text", page.categorie);
                        view.find("#textViewNombreQuestions").set("text", `Ce quizz comporte ${page.nombre_questions} questions`);
                    }
                }).on("select", ({
                    index
                }) => {
                    let indexItem = itemQuizz[index];
                    let quizzView = require("../views/quizz.js")(indexItem.id_quizz, indexItem.categorie, navigationViewToInsert);
                    quizzView.appendTo(navigationViewToInsert);
                }).appendTo(areaToInsert);
            }

        });
        xhrSearchQuizz.addEventListener("error", () => {
            activityIndicator.visible = false;
            require("../custom_widgets/snackbar.js")(tabPart, 50, "Pas de connexion internet", "Réessayer", themeColorText, AjaxSearchQuizz);

        });
        xhrSearchQuizz.responseType = "text";
        xhrSearchQuizz.open('GET', urlToSend, true);
        xhrSearchQuizz.send(null);

    }
    let execAjaxSearchQuizz = new AjaxSearchQuizz();
};
