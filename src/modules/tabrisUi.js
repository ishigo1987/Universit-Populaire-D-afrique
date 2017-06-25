// A retirer
module.exports = (themeString, themeBgHex, bgHex) =>
 {
  // Cette fonction initialise l'ui de l'application pour une vue
  tabris.ui.statusBar.set({
     theme:themeString,
     background:themeBgHex,
   });
  tabris.ui.set({
      background: bgHex,
     });
tabris.ui.contentView.background = '#fff';
 };
