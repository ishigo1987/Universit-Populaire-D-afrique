module.exports = (widgetToAnim,typeOfAnimation) =>
 {
//   if(typeOfAnimation === "zoomIn")
//    {
//      widgetToAnim.set({
//        transform:{scaleX:0,scaleY:0}
//      });
//      widgetToAnim.animate({
//            transform:{scaleX:1,scaleY:1},
//            opacity:1
//             },
//             {
//               delay: 0,
//               duration:250,
//               repeat:0,
//               reverse:false,
//               easing: "ease-in-out"
//          }
//       ).then();
//    }
//   else if(typeOfAnimation === "zoomOut")
//    {
//      widgetToAnim.animate({
//            transform:{scaleX:0,scaleY:0},
//            opacity:0
//             },
//             {
//               delay: 0,
//               duration:200,
//               repeat:0,
//               reverse:false,
//               easing: "ease-in-out"
//          }
//       ).then();
//    }
    if(typeOfAnimation === "slideUp")
    {
      widgetToAnim.animate({
            transform:{translationY:0},
            opacity:1
             },
             {
               delay: 0,
               duration:150,
               repeat:0,
               reverse:false,
               easing: "ease-in-out"
          }
       ).then();
    }
   else if(typeOfAnimation === "slideDown")
    {
      widgetToAnim.animate({
            transform:{translationY:50},
            opacity:0
             },
             {
               delay: 0,
               duration:150,
               repeat:0,
               reverse:false,
               easing: "ease-in-out"
          }
       ).then();
    }

 };
