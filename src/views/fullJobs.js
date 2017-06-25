module.exports = (navigationViewToImport,name_jobs,title_jobs,place_jobs,category_jobs,description_jobs,date_jobs) =>
 {
    const themeColor = "#84BD3A";
    let createMenuActionIcon;
    let handleShareFullJobs = require("../helpers/actionIcons.js")(createMenuActionIcon,"Share","icons/android/share_action.png","high",navigationViewToImport);
    
    let fullJobsView = new tabris.Page({
        title:name_jobs,
        background:`#fafafa`,
        elevation:2,
        autoDispose:true
    }).on({
       appear: () =>{
          handleShareFullJobs.visible = true;
        },
       disappear: () =>
        {
           handleShareFullJobs.visible = false;
           fullJobsView.dispose();
        }      
    });
    
   handleShareFullJobs.on("select", () =>
    {
      let messageToShare = name_jobs + "\n" + title_jobs + "\n" + place_jobs + "\n" + category_jobs + "\n" +  description_jobs + "\n" + date_jobs;
      window.plugins.socialsharing.share(messageToShare);
    });    
    
   let scrollView = new tabris.ScrollView({
       left:0,right:0,top:0,bottom:0
     }).appendTo(fullJobsView);
   
   let title = new tabris.TextView({
       left:10,top:5,right:10,
       text:title_jobs,
       font:"normal 23px roboto, noto",
       id:"title"
     }).appendTo(scrollView);
    
   let place = new tabris.TextView({
       left:10,top:["#title", 2],
       text:place_jobs,
       font:"16px roboto, noto",
       textColor:"#9e9e9e",
     }).appendTo(scrollView);

   let category = new tabris.TextView({
       left:["prev()", 3],top:["#title", 4],
       text:category_jobs,
       font:"14px roboto, noto",
       textColor:"#84BD3A"
     }).appendTo(scrollView);
    
   let description = new tabris.TextView({
       left:10, top:["#title",50],right:10,
       text:`${description_jobs}`,
       font:"18px roboto, noto",
       textColor:"#616161",
     }).appendTo(scrollView);

  let date = new tabris.TextView({
      left:10,top:["prev()", 4],
      text:date_jobs,
      font:"14px roboto, noto",
      textColor:"#84BD3A"
    }).appendTo(scrollView);    
   
    return fullJobsView;
 };