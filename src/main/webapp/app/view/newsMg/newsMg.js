
Ext.define('app.view.newsMg.newsMg', {
    id: "newsMg",
    extend: 'Ext.grid.Panel',
    xtype: 'view-newsMg-newsMg',
    requires: ["app.view.newsMg.newsInfo"],
    padding: "10px 20px 0 20px",
    config: {
        tabtitle:''
    },
    constructor: function (config) {
        var me = this;
        config = config || {};
        Ext.applyIf(config, me.config);
        this.callParent(arguments);
    },
    initComponent: function () {
        var me = this;

        var newstore = Ext.create('Ext.data.Store', {
            id: 'simpsonsStore',
            autoLoad: true,
            pageSize: 15, // 每页的条目数量
            proxy: {
                type: 'ajax',
                url: 'newsMg/queryNewList',
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty:"total"
                }
            }
        });
        Ext.apply(me, {
            tbar: {
                layout: 'column',
                scope: me,
                items: [
                    {
                        xtype: 'toolbar',
                        columnWidth: 1,
                        scope: me,
                        itemId: 'search',
                        style:'border: 1px solid blue;background:#AFCEE3;',
                        items: [
                            {
                                xtype: 'button', text: '添加', scope: me, glyph: 'xf234@FontAwesome',
                                accessUrl: 'createAccount',
                                itemId: 'bt_create',
                                handler: function () {
                                    me.infoWindow('add','');
                                }
                            },
                            {
                                xtype: 'button',
                                accessUrl: 'editAccount',
                                text: '修改', scope: me, glyph: 'xf044@FontAwesome',
                                itemId: 'bt_edit',
                                handler: function (btn) {
                                    var selectData = me.getSelectionModel().getSelection();
                                    if (selectData.length != 1) {
                                        Ext.Msg.alert('温馨提示', '请选择一条操作数据');
                                        return;
                                    }
                                    me.infoWindow('edit',selectData[0]);
                                }
                            },
                            {
                                xtype: 'button',
                                accessUrl: 'delAccount',
                                text: '删除', scope: me, glyph: 'xf014@FontAwesome',
                                itemId: 'bt_del',
                                handler: function () {
                                    var selectData = me.getSelectionModel().getSelection();
                                    if (selectData.length != 1) {
                                        Ext.Msg.alert('温馨提示', '请选择一条操作数据');
                                        return;
                                    }
                                    me.delnews(selectData[0]);
                                }
                            }
                        ]
                    }
                ]
            },
            border: true,
            store: newstore,
            title: me.config.tabtitle,
            // columnLines: true,
            closable: true,
            viewConfig: {
                enableTextSelection: true
            },
            columns: [
                {text: '新闻id', dataIndex: 'id', width: '20%', align: 'center'},
                {text: '新闻标题', dataIndex: 'title', width: '20%', align: 'center'},
                {text: '发布人id', dataIndex: 'releaseId', width: '19%', align: 'center'},
                {text: '发布时间', dataIndex: 'releaseDate', width: '20%', align: 'center'},
                {text: '更新时间', dataIndex: 'updateDate', width: '20%', align: 'center'},
            ],
            listeners: {},
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: newstore
                }
            ]


        });
        me.callParent(arguments);
    },

    //详情窗口
    infoWindow: function (operation, selectData) {
        var me = this;
        var isHidden = false;
        if (operation == 'view') {
            isHidden = true;
        }

        Ext.create("Ext.window.Window", {
            title: '新闻基本信息',
            modal: true,
            layout: 'fit',
            width: '75%',
            height: '75%',
            resizable:false,
             items: [
                {
                    autoScroll: true,
                    autoFill: true,
                    height: '100%',
                    width: '100%',
                    xtype: "view-newsMg-newsInfo",
                    listeners: {
                        'afterrender': function (cmp) {
                            if (operation == 'view' || operation == 'edit') {
                                Ext.Ajax.request({
                                    url: 'newsMg/findNewsInfo',
                                    params: {'id':selectData.get('id')},
                                    method: 'POST',
                                    success: function (response, options) {

                                        var response = JSON.parse(response.responseText);
                                        if (response.success) {
                                            var result = response.result;
                                            Ext.getCmp('newsInfo').getForm().setValues(result);
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
                }],
            fbar: [
                '->',
                {
                    xtype: 'button',
                    text: "保存",
                    itemId: 'save_id',
                    hidden: isHidden,
                    handler: function (btn) {
                         var win = btn.up().up();
                         if (operation == 'edit') {
                            //提交修改
                            win.down('view-newsMg-newsInfo').getNewsInfo(operation, function () {
                                Ext.getCmp("newsMg").store.reload();
                                win.close();
                            });
                        } else if (operation == 'add') {
                            win.down('view-newsMg-newsInfo').getNewsInfo(operation, function () {
                                Ext.getCmp("newsMg").store.reload();
                                win.close();
                            });
                        }
                    }

                },
                {
                    xtype: 'button',
                    text: "关闭",
                    handler: function (btn) {
                        var win = btn.up().up();
                        win.close();
                    }
                }
            ]
        }).show();
    },
    delnews:function(selectData){
        var me=this;
        Ext.MessageBox.show({
            title: '提示',
            width: 200,
            height: 150,
            msg: '您确定要删除该数据吗？',
            modal: true,
            fn: function (id) {
                if (id == "ok") {
                    Ext.Ajax.request({
                        url: 'newsMg/delNews',
                        params: {'id':selectData.get('id')},
                        method: 'POST',
                        success: function (response, options) {
                            var response = JSON.parse(response.responseText);
                            if (response.success) {
                                Ext.Msg.alert("系统提示", response.result);
                                Ext.getCmp("newsMg").store.reload();
                            } else {
                                Ext.Msg.alert("系统提示", response.message);
                            }

                        },
                        failure: function (response) {
                            Ext.Msg.alert("newsMg", "请求超时");
                        }
                    });
                } else {
                    return;
                }
            },
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.INFO
        });
    },

});
