module.exports = (title) =>
 {
    "use strict";
    let callbackfunction = function(buttonIndex) {
     setTimeout(function() {
	 if(buttonIndex === 1)
	  {
		  localStorage.setItem("categoryQuery", "Diétetique");
	  }
     else if(buttonIndex === 2)
      {
          localStorage.setItem("categoryQuery", "Esthetique");
      }
     else if(buttonIndex === 3)
      {
          localStorage.setItem("categoryQuery", "Santé");
      }
     else if(buttonIndex === 4)
      {
          localStorage.setItem("categoryQuery", "Commerce");
      }
     else if(buttonIndex === 5)
      {
          localStorage.setItem("categoryQuery", "Marketing");
      }
     else if(buttonIndex === 6)
      {
          localStorage.setItem("categoryQuery", "Communication");
      }
     else if(buttonIndex === 7)
      {
          localStorage.setItem("categoryQuery", "Audiovisuel");
      }
     else if(buttonIndex === 8)
      {
          localStorage.setItem("categoryQuery", "Comptabilité");
      }
     else if(buttonIndex === 9)
      {
          localStorage.setItem("categoryQuery", "Informatique");
      }
     else if(buttonIndex === 10)
      {
          localStorage.setItem("categoryQuery", "Cours de langues");
      }
     else if(buttonIndex === 11)
      {
         localStorage.setItem("categoryQuery", "Mathématiques"); 
      }
     else if(buttonIndex === 12)
      {
          localStorage.setItem("categoryQuery", "Physique");
      }
     else if(buttonIndex === 13)
      {
          localStorage.setItem("categoryQuery", "Chimie");
      }
     else if(buttonIndex === 14)
      {
          localStorage.setItem("categoryQuery", "Géographie");
      }
     else if(buttonIndex === 15)
      {
          localStorage.setItem("categoryQuery", "Histoire");
      }
     else if(buttonIndex === 16)
      {
          localStorage.setItem("categoryQuery", "Electronique");
      }
     else if(buttonIndex === 17)
      {
          localStorage.setItem("categoryQuery", "Froid et Climatisation");
      }
     else if(buttonIndex === 18)
      {
          localStorage.setItem("categoryQuery", "Electrotechnique");
      }
     else if(buttonIndex === 19)
      {
          localStorage.setItem("categoryQuery", "Mécanique");
      }
     else if(buttonIndex === 20)
      {
          localStorage.setItem("categoryQuery", "Genie civil");
      }
     else if(buttonIndex === 21)
      {
          localStorage.setItem("categoryQuery", "Agronomie");
      }
     else if(buttonIndex === 22)
      {
          localStorage.setItem("categoryQuery", "all");
      }
      },0);
    };
    
    let options = {
        'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        'title': title,
        'buttonLabels': ["Diétetique", "Esthetique", "Santé", "Commerce", "Marketing", "Communication", "Audiovisuel", "Comptabilité", "Informatique", "Cours de langues", "Mathématiques", "Physique", "Chimie", "Géographie", "Histoire", "Electronique", "Froid et Climatisation", "Electrotechnique", "Mécanique", "Genie civil", "Agronomie", "Tout afficher"],
        'androidEnableCancelButton' : true, // default false
        'addCancelButtonWithLabel': 'Fermer'
       };
      window.plugins.actionsheet.show(options, callbackfunction);
   };