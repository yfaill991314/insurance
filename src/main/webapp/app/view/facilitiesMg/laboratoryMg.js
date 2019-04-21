
Ext.define('app.view.facilitiesMg.laboratoryMg', {
    id: "laboratoryMg",
    extend: 'Ext.grid.Panel',
    xtype: 'view-facilitiesMg-laboratoryMg',
    requires: [
        'app.view.facilitiesMg.clabaseInfo'
    ],
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

        var  claStore = Ext.create('Ext.data.Store', {
            id: 'simpsonsStore',
            autoLoad: true,
            pageSize: 15, // 每页的条目数量
            proxy: {
                type: 'ajax',
                url: 'facilitiesMg/queryClaRoomList',
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
                                    me.delStudent(selectData[0]);
                                }
                            }
                        ]
                    }
                ]
            },
            border: true,
            store: claStore,
            title: me.config.tabtitle,
            // columnLines: true,
            closable: true,
            viewConfig: {
                enableTextSelection: true
            },
            columns: [
                {text: '教室编号', dataIndex: 'id', width: '15%', align: 'center'},
                {text: '教学楼', dataIndex: 'buildName', width: '10%', align: 'center'},
                {text: '楼层', dataIndex: 'floor', width: '15%', align: 'center'},
                {text: '房间号', dataIndex: 'roomNum', width: '10%', align: 'center'},
                {text: '容量(人)', dataIndex: 'capacity', width: '10%', align: 'center'},
                {text: '状态', dataIndex: 'status', width: '14%', align: 'center'},
                {text: '备注', dataIndex: 'remark', width: '25%', align: 'center'}
            ],
            listeners: {},
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: claStore
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
            title: '教室基本信息',
            modal: true,
            layout: 'fit',
            width: '75%',
            height: '75%',
             items: [
                {
                    autoScroll: true,
                    autoFill: true,
                    height: '100%',
                    width: '100%',
                    xtype: "view-facilitiesMg-clabaseInfo",
                    listeners: {
                        'afterrender': function (cmp) {
                            if (operation == 'view' || operation == 'edit') {
                                Ext.Ajax.request({
                                    url: 'facilitiesMg/findClaRoomInfo',
                                    params: {'id':selectData.get('id')},
                                    method: 'POST',
                                    success: function (response, options) {
                                        var response = JSON.parse(response.responseText);
                                        if (response.success) {
                                            var result = response.result;
                                            Ext.getCmp('clabaseInfo').getForm().setValues(result);
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
                            win.down('view-facilitiesMg-clabaseInfo').getStuInfo(operation, function () {
                                Ext.getCmp("laboratoryMg").store.reload();
                                win.close();
                            });
                        } else if (operation == 'add') {
                            win.down('view-facilitiesMg-clabaseInfo').getStuInfo(operation, function () {
                                Ext.getCmp("laboratoryMg").store.reload();
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
    delStudent:function(selectData){
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
                        url: 'PersonelMg/delStudent',
                        params: {'stuNum':selectData.get('stuNum')},
                        method: 'POST',
                        success: function (response, options) {
                            var response = JSON.parse(response.responseText);
                            if (response.success) {
                                Ext.Msg.alert("系统提示", response.result);
                                Ext.getCmp("studentMgGrid").store.reload();
                            } else {
                                Ext.Msg.alert("系统提示", response.message);
                            }

                        },
                        failure: function (response) {
                            Ext.Msg.alert("系统提示", "请求超时");
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
