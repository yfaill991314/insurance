
Ext.define('app.view.personelMg.teachersMg', {
    id: "teacherMgGrid",
    extend: 'Ext.grid.Panel',
    xtype: 'view-personelMg-teachersMg',
    requires: [
        'app.view.personelMg.teabaseInfo'
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

        var teacherStore = Ext.create('Ext.data.Store', {
            id: 'teacherStore',
            autoLoad: true,
            // fields: ['stuName', 'age', 'sex'],
            pageSize: 15, // 每页的条目数量
            proxy: {
                type: 'ajax',
                url: 'PersonelMg/queryTeacherList',
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty:"total"
                }
            }
        });
        Ext.apply(me, {
            tbar: {
                layout: 'column', scope: me,
                items: [

                    {
                        xtype: 'toolbar',
                        style:'border: 1px solid blue;background:#AFCEE3;',
                        columnWidth: 1,
                        scope: me, itemId: 'search',
                        items: [
                            {
                                xtype: 'button', text: '添加',
                                scope: me,
                                glyph: 'xf234@FontAwesome',
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
                                    me.delTeacher(selectData[0]);
                                }
                            }
                        ]
                    }
                ]
            },
            border: true,
            store: teacherStore,
            title: me.config.tabtitle,
            // columnLines: true,
            closable: true,
            viewConfig: {
                enableTextSelection: true
            },
            columns: [
                {text: '教师号', dataIndex: 'teaNum', width: '20%', align: 'center'},
                {text: '姓名', dataIndex: 'teaName', width: '15%', align: 'center'},
                {text: '学院', dataIndex: 'college', width: '20%', align: 'center'},
                {text: '性别', dataIndex: 'sex', width: '14%', align: 'center'},
                {text: '年龄', dataIndex: 'age', width: '10%', align: 'center'},
                {text: '电话号码', dataIndex: 'phoneNum', width: '20%', align: 'center'},
            ],
            listeners: {},
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: teacherStore
                }
            ]


        });
        me.callParent(arguments);
    },
    //详情窗口
    infoWindow: function (operation, selectData) {
        var isHidden = false;
        if (operation == 'view') {
            isHidden = true;
        }

        Ext.create("Ext.window.Window", {
            title: '教师基本信息',
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
                    xtype: "view-personelMg-teabaseInfo",
                    listeners: {
                        'afterrender': function (cmp) {
                            if (operation == 'view' || operation == 'edit') {
                                Ext.Ajax.request({
                                    url: 'PersonelMg/findTeacherInfo',
                                    params: {'teaNum':selectData.get('teaNum')},
                                    method: 'POST',
                                    success: function (response, options) {
                                        var response = JSON.parse(response.responseText);
                                        if (response.success) {
                                            var result = response.result;
                                            Ext.getCmp('teabaseInfo').getForm().setValues(result);
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
                            win.down('view-personelMg-teabaseInfo').getTeaInfo(operation, function () {
                                Ext.getCmp("teacherMgGrid").store.reload();
                                win.close();
                            });
                        } else if (operation == 'add') {
                            win.down('view-personelMg-teabaseInfo').getTeaInfo(operation, function () {
                                Ext.getCmp("teacherMgGrid").store.reload();
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

    delTeacher:function(selectData){
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
                        url: 'PersonelMg/delTeacher',
                        params: {'teaNum':selectData.get('teaNum')},
                        method: 'POST',
                        success: function (response, options) {
                            var response = JSON.parse(response.responseText);
                            if (response.success) {
                                Ext.Msg.alert("系统提示", response.result);
                                Ext.getCmp("teacherMgGrid").store.reload();
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
    }
});
