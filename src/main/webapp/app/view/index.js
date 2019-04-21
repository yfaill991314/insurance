Ext.onReady(function () {
     Ext.Loader.setConfig({enabled:true});
    Ext.create('app.view.main.main',{
    });
});



// var center=new Ext.TabPanel({
//     style:"padding:0 5px 0 5px",
//     region:"center",
//     activeItem:0,
//     enableTabScroll:true,
//     layoutOnTabChange:true,
//     autoScroll:true,
//     items:[{
//         xtype:"panel",
//         id:"index",
//         iconCls:"homemanage",
//         title:"测试",
//         html:"<iframe src='news.html'scrolling='yes' frameborder=0 width=100% height=100%></iframe>"
//     }]
// });
//
// Ext.onReady(function(){
//     var vp=new Ext.Viewport({
//         layout:"border",
//         items:[center]
//     });
// })
