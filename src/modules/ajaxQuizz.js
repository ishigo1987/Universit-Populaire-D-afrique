module.exports = (tabPart,urlToSend,areaToInsert,themeColorText,navigationViewToInsert) =>
 {
    function AjaxQuizzJson()
     {
         let activityIndicator;
         let xhrAjaxQuizz = new XMLHttpRequest();
             xhrAjaxQuizz.addEventListener("loadstart", () =>
              {
                 activityIndicator = new tabris.ActivityIndicator({
                    width:40,height:40,centerX:0,centerY:0
                  }).appendTo(areaToInsert);  
              });
             xhrAjaxQuizz.addEventListener("load", () =>
              {
                  activityIndicator.visible = false;
                  let itemQuizz = [];
                  let responseJson = JSON.parse(xhrAjaxQuizz.responseText);
                  let objectData;
                  let j = responseJson.Id_quizz.length;
                  for(let i=0; i<j; i++)
                   {
                     objectData = {categorie:responseJson.Categorie[i],nombre_questions:responseJson.Nombre_de_questions[i], id_quizz:responseJson.Id_quizz[i]};
                     itemQuizz.push(objectData);
                   }
                  let quizzCollectionView = new tabris.CollectionView({
                         right:0, bottom:0, top:0,left:0,
                         cellHeight:70,
                         itemCount:itemQuizz.length,
                         createCell: () =>{
                           let cell = new tabris.Composite({
                               right:0, bottom:0,
                               background:"#fff",
                            }).on("tap", function(){this.background = "#e0e0e0";setTimeout(() =>{cell.background = "#fff";},50);});
                           
                           // Bordures
                           new tabris.Composite({left: 0, bottom: 0, right: 0, height: 1,background: "#eeeeee"}).appendTo(cell);
                           
                           let textViewCategorie = new tabris.TextView({
                               left:15, top:7,
                               font: "bold 16px roboto, noto",
                               textColor:"#616161",
                               id:"textViewCategorie"
                            }).appendTo(cell);
                          
                          let textViewNombreQuestions = new tabris.TextView({
                              left:15, top:"prev()",bottom:5,
                              font: "14px roboto, noto",
                              textColor:themeColorText,
                              id:"textViewNombreQuestions"
                           }).appendTo(cell);
                           
                             return cell;
                          },
                         updateCell: (view,index) =>{
                           let page = itemQuizz[index]; 
                           view.find("#textViewCategorie").set("text", page.categorie);
                           view.find("#textViewNombreQuestions").set("text", `Ce quizz comporte ${page.nombre_questions} questions`);     
                          }
                          }).on("select", ({index}) =>
                            {
                              let indexItem =  itemQuizz[index];
                              let quizzView = require("../views/quizz.js")(indexItem.id_quizz, indexItem.categorie);
                                  quizzView.appendTo(navigationViewToInsert);
                            }).appendTo(areaToInsert);
                });
             xhrAjaxQuizz.addEventListener("error", () =>
              {
                  activityIndicator.visible = false;
                  require("../custom_widgets/snackbar.js")(tabPart,50,"Pas de connexion internet","Réessayer",themeColorText,AjaxQuizzJson);
              });
             xhrAjaxQuizz.responseType = "text";
             xhrAjaxQuizz.open('GET',urlToSend, true);
             xhrAjaxQuizz.send(null);
         
    }
   let execAjaxQuizzJson = new AjaxQuizzJson();
 };