module.exports = (navigationViewAnimation,boolAnimation) =>
 {
   navigationViewAnimation = new tabris.NavigationView({
    left: 0, top: 0, right: 0, bottom: 0, toolbarColor:"#84BD3A", titleTextColor:"#fff"
     }).appendTo(tabris.ui.contentView);
   if(boolAnimation === true)
    {
       navigationViewAnimation.set({
         transform:{translationY:20},
         animated:false
        });
       navigationViewAnimation.animate({
          transform: {scale:0},
          opacity:1
        }, {
          delay: 0,
          duration:100,
          repeat:0,
          reverse:false,
          easing: "linear"
        } 
     ).then(function(){this.set({animated:true});});
    }
  
 return navigationViewAnimation;
 };