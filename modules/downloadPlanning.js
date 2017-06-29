module.exports = () =>
 {
   "use strict";
    
    let urlToSend = "https://www.upa.ovh/gestionApplication/retrievePlanningToDb.php";
    let xhrRetrievePlanning = new XMLHttpRequest();
        xhrRetrievePlanning.addEventListener("loadstart", () =>
         {
            window.plugins.toast.showShortBottom("Requete en cours d'exécution");
         });
        xhrRetrievePlanning.addEventListener("load", () =>
         {
            let response = JSON.parse(xhrRetrievePlanning.responseText);
            let urlToDownload = `https://upa.ovh/gestionPanel/${response.url_planning_cours[0]}`;
            window.plugins.toast.showShortBottom(`Téléchargement du planning en cours il s'ouvrira automatiquement une fois le téléchargement terminé`);
            require("../plugins/downloadFiles.js")(urlToDownload);
         });
        xhrRetrievePlanning.addEventListener("error", () =>
         {
            window.plugins.toast.showShortBottom("Pas de connexion internet");
         });
        xhrRetrievePlanning.responseType = "text";
        xhrRetrievePlanning.open('GET',urlToSend, true);
        xhrRetrievePlanning.send(null);
 };
                                             