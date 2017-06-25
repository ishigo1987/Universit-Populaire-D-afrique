module.exports = (widgetToAttach,heightValue,firstTextSnackbar,secondTextSnackbar,themeColorTabris,callback) =>
 {
    // Single line height = 48dp = 36px
    //Multi lines height = 80dp = 60px
    let snackbar = new tabris.Composite({
        bottom:0,left:0,right:0,
        height:heightValue,
        background:"#323232",
        opacity:0
     }).appendTo(widgetToAttach);
    
    let textSnackbar = new tabris.TextView({
        font:"normal 14px roboto, noto",
        left:15,centerY:0,
        text:firstTextSnackbar,
        textColor:"#fff"
     }).appendTo(snackbar);
    
    if(secondTextSnackbar !== null)
     {
        let actionSnackbar = new tabris.TextView({
         right:15,centerY:0,
         text:secondTextSnackbar.toUpperCase(),
         textColor:themeColorTabris
        }).on("tap", () =>
         {
           animSnackbar(true,0);
           callback();
         }).appendTo(snackbar);
     }

    function animSnackbar(disposeWidgetBoolean,opacityLevel)
     {
       snackbar.animate({
          opacity:1
        }, {
          delay: opacityLevel,
          duration:200,
          repeat:0,
          reverse:false,
          easing: "linear"
        } 
       ).then(function(){
           if(disposeWidgetBoolean === true)
            {
                snackbar.dispose();
            }
       });
     }
    animSnackbar(false,1);
 };