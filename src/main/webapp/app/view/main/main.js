Ext.define("app.view.main.main", {
    extend: 'Ext.Viewport',
    layout: 'border',
    id: 'mainPage',
    name: 'borderContainer',
    requires: [],
    config: {},
    padding: "10px 20px 0 20px",


    initComponent: function () {
        var me = this;
        Ext.applyIf(this, {
            items: [
                {
                    region: "north",
                    itemId: 'maintop',
                    height: 62,
                    margin: '0 0 0 0',
                    padding: '0px',
                    collapsible: false,//不能折叠
                    xtype: 'toolbar',
                    border: false,//无边框
                    style: "background:#5789DC;",//样式设置背景
                    items: [
                        {
                            margin: '0 0 0 10',
                            xtype: 'component',
                            autoEl: {tag: 'div', cls: 'logo_subs'}
                        },
                        {
                            xtype: 'tbtext',
                            text: '<span style="color: white;font-weight:bold;">实验教学管理系统</span>',
                        },
                        '->', '->', '->', '->',
                        {
                            text: '<span style="color: white;font-weight:bold;">帮助</span>',
                            style: 'background:#5789DC;',
                            border: '0 0 0 0',
                            glyph: 'xf059@FontAwesome'
                        },
                        {xtype: 'tbseparator'},
                        {
                            text: '<span style="color: white;font-weight:bold;">关于</span>',
                            style: 'background:#5789DC;',
                            border: '0 0 0 0',
                            glyph: 'xf06a@FontAwesome'
                        },
                        {
                            text: '<span style="color: white;font-weight:bold;">修改密码</span>',
                            style: 'background:#5789DC;',
                            border: '0 0 0 0',
                            glyph: 'xf0c9@FontAwesome',
                            handler: function () {
                                me.openExitPwdWin();
                            }
                        },
                        {
                            itemId: 'logoutForm',
                            hidden:true,
                            xtype: 'form',
                            standardSubmit: true,//让表单提交后可以实现重定向
                        },
                        {
                            text: '<span style="color: white;font-weight:bold;">注销</span>',
                            style: 'background:#5789DC;',
                            border: '0 0 0 0',
                            glyph: 'xf011@FontAwesome',
                            handler: function () {
                                var form= me.queryById('logoutForm').getForm();
                                form.submit({
                                    clientValidation: true,
                                    url: 'logout',
                                    // params: loginDate,
                                    success: function(form, action) {
                                        Ext.Msg.alert('Success', action.result.msg);
                                    },
                                    failure: function(form, action) {
                                        switch (action.failureType) {
                                            case Ext.form.action.Action.CLIENT_INVALID:
                                                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                                break;
                                            case Ext.form.action.Action.CONNECT_FAILURE:
                                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                                break;
                                            case Ext.form.action.Action.SERVER_INVALID:
                                                Ext.Msg.alert('Failure', action.result.msg);
                                        }
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    region: "west",
                    border: false,
                    padding: '0px',
                    xtype: 'panel',
                    title: '功能菜单',
                    cls: "ccsBlue-menu",
                    fill: false,
                    itemId: 'menuId',
                    collapsible: false,//不能折叠
                    collapsed: false,
                    glyph: 'xf00b@FontAwesome',
                    items: [
                        {
                            hidden: true
                        }
                    ],
                    width: 180,
                    listeners: {
                        // //加载完毕后进行数据填充
                        beforerender: function (eOpts, iEventobj) {
                            Ext.Ajax.request({
                                url: 'menu/findSidebar',
                                method: 'POST',
                                success: function (response, options) {

                                    var response = JSON.parse(response.responseText);
                                    if (response.success) {
                                        var result = response.result;
                                        result.forEach(function (item, index, arr) {
                                            item.children.forEach(function (citem, index, arr) {
                                                citem.leaf = true;
                                                //citem.glyph=0xf087, //xf087
                                                citem.iconCls = 'no-icon';
                                            });

                                            var store = Ext.create('Ext.data.TreeStore', {
                                                root: item,
                                                // rootProperty:item,
                                                defaultExpandAll: false,
                                                defaultRootProperty: "children",
                                                fields: [{
                                                    name: 'text',
                                                    mapping: 'name'
                                                }]
                                            });


                                            var menu = Ext.create('Ext.tree.Panel', {
                                                title: "<img src='data:image/gif;base64,R0lGODlhCAAMALMAAJmZmb29vd7e3qSkpNXV1ePj4/b29rW1tcbGxrCwsP///wAAAAAAAAAAAAAAAAAAACH5BAEHAAoALAAAAAAIAAwAAAQmUImgai0JEKsG+Nt1fJplZJ9gjh9iBaSrwKliIGTIllcWWhOOIgIAOw=='>" + item.name,
                                                store: store,
                                                glyph: 'xf0a4@FontAwesome',
                                                titleCollapse: true,//'true'允许通过单击Panel头部的任何位置实现Panel展开和折叠之间的切换
                                                collapsible: true,//设置为true是panel具有可折叠功能并且有一个展开/折叠的切换按钮被添加到panel的标题头区域
                                                hideCollapseTool: true,
                                                rootVisible: false,//是否展示根节点
                                                collapsed: false,//收起
                                                margin: '2 0 0 0',
                                                animate: true,//是否动画
                                                listeners: {
                                                    //点击事件
                                                    itemclick: function (source, houseAudit, item, index, e, eOpts) {
                                                        // alert(houseAudit.data.text + ":" + houseAudit.data.url);
                                                        me.openIframeView(houseAudit.data.text, houseAudit.data.url, {},me);
                                                    }
                                                },
                                            });

                                            me.queryById('menuId').add(menu);

                                        });
                                    } else {
                                        Ext.Msg.alert("系统提示", response.message);
                                    }

                                },
                                failure: function (response) {
                                    Ext.Msg.alert("系统提示", "请求超时");
                                }
                            });
                        }
                    }
                },
                {
                    itemId: 'centerBox',
                    region: "center",
                    layout: 'fit',
                    border: true,
                    margin: '0 0 0 0',
                    collapsible: false,
                    xtype: 'tabpanel',
                    items: [
                        {
                            xtype:'panel',
                            title:'首页',
                            id:"first",
                            margin: '10 10 0 10',
                            html:"<iframe src='news.html'scrolling='yes' frameborder=0 width=100% height=100%></iframe>"

                        }
                    ],
                    listeners: {
                        // 'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        // },
                        // beforerender: function (tabPanel) {
                        // }
                    }
                },
                {
                    region: 'south',
                    itemId: 'mainbottom',
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'middle'
                    },
                    style: {
                        border: '1px dashed #e4e4e4'
                    },
                    items: [
                        {
                            xtype: 'label',

                            html: '<span style="color: #656565;">当前用户：</span>'
                        },
                        {
                            xtype: 'label',
                            itemId: 'username',
                            html: '<span style="color: #656565;font-weight:bold;">admin</span>'
                        },
                        {
                            xtype: 'label',
                            html: '<span style="color: #656565;">所属类型：</span>',
                            margin:'0 0 0 10',
                        },
                        {
                            xtype: 'label',
                            itemId: 'orgName',
                            html: '<span style="color: #656565;font-weight:bold;">超级管理员</span>'
                        }],
                    listeners: {
                        // //加载完毕后进行数据填充
                        beforerender: function (eOpts, iEventobj) {
                            Ext.Ajax.request({
                                url: 'common/findCurrentUserInfo',
                                method: 'POST',
                                success: function (response, options) {
                                    var response = JSON.parse(response.responseText);
                                    if (response.success) {
                                        var result = response.result;
                                        var username=result['username'];
                                        var role=result['role']['name'];
                                        me.queryById('mainbottom').queryById('username').setText('<span style="color: #656565;font-weight:bold;">'+username+'</span>',false);
                                        me.queryById('mainbottom').queryById('orgName').setText('<span style="color: #656565;font-weight:bold;">'+role+'</span>',false);
                                    } else {
                                        Ext.Msg.alert("系统提示", response.message);
                                    }

                                },
                                failure: function (response) {
                                    Ext.Msg.alert("系统提示", "请求超时");
                                }
                            });
                        }
                    }
                }
            ]
        });
        this.callParent(arguments);
    }
    ,
    openIframeView:function (viewClsName, url, params) {
        var tp=Ext.getCmp('mainPage').queryById('centerBox');
        items=tp.items;
        for (var i=0;i<items.length;i++){
            var item=items.items[i];
            if (viewClsName==item.title) {
                tp.setActiveTab(item);
                return;
            }
        }

        try{
            var pane= Ext.create(url,{
                tabtitle:viewClsName
            });
            var tabPage= tp.add(pane);
            tp.setActiveTab(tabPage);
        }catch (e) {
            Ext.Msg.alert("系统提示", "视图加载错误");
        }

    },
    openExitPwdWin:function () {
        Ext.create("Ext.window.Window", {
            title: '修改密码',
            modal: true,
            layout: 'fit',
            width: 300,
            height: 400,
            items: [
                {
                    autoScroll: true,
                    autoFill: true,
                    height: '100%',
                    width: '100%',
                    xtype: "form",
                    layout: 'fit',
                    id:'updatePwd',
                    items: [
                        {
                            xtype: "form",
                            layout: 'column',
                            // title: '学生基本信息',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '旧密码',
                                    inputType: 'password',
                                    labelWidth: 60,
                                    columnWidth: 0.9,
                                    allowBlank: false,
                                    blankText: '旧密码必填',
                                    regex: /^[a-zA-Z0-9]{6,12}$/,
                                    regexText: '密码格式不正确!',
                                    itemId: 'oldPwd',
                                    name: 'oldPwd',
                                    margin: '10 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '新密码',
                                    allowBlank: false,
                                    inputType: 'password',
                                    blankText: '新密码必填',
                                    regex: /^[a-zA-Z0-9]{6,12}$/,
                                    regexText: '密码格式不正确!',
                                    labelWidth: 60,
                                    name: 'newPwd',
                                    itemId: 'newPwd',
                                    columnWidth: 0.9,
                                    margin: '10 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '确认密码',
                                    inputType: 'password',
                                    regex: /^[a-zA-Z0-9]{6,12}$/,
                                    regexText: '密码格式不正确!',
                                    blankText: '请再次输入密码',
                                    labelWidth: 60,
                                    name: 'againNewPwd',
                                    itemId: 'againNewPwd',
                                    columnWidth: 0.9,
                                    margin: '10 0 0 30'
                                }
                            ]
                        }
                    ]
                }],
            fbar: [
                '->',
                {
                    xtype: 'button',
                    text: "保存",
                    itemId: 'save_id',
                    handler: function (btn) {
                        var formData= Ext.getCmp('updatePwd').getForm().getValues();
                        if (formData.newPwd!=formData.againNewPwd) {
                            Ext.Msg.alert('温馨提示', '密码不一致，请重新输入！');
                            return;
                        }
                        var params={};
                        params['oldPwd']=formData.oldPwd;
                        params['newPwd']=formData.newPwd;
                        Ext.Ajax.request({
                            url: 'common/updatePwd',
                            method: 'POST',
                            params:params,
                            success: function (response, options) {
                                var response = JSON.parse(response.responseText);
                                if (response.success) {
                                    var form= Ext.getCmp('mainPage').queryById('logoutForm').getForm();
                                    form.submit({
                                        clientValidation: true,
                                        url: 'logout',
                                        // params: loginDate,
                                        success: function(form, action) {
                                            Ext.Msg.alert('系统提示', "注销成功");
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('系统提示', "注销失败");
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert("系统提示", response.message);
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("系统提示", "请求超时");
                            }
                        });
                    }

                },
                {
                    xtype: 'button',
                    text: "取消",
                    handler: function (btn) {
                        var win = btn.up().up();
                        win.close();
                    }
                }
            ]
        }).show();
    }
});


