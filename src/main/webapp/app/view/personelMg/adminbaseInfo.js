Ext.define("app.view.personelMg.adminbaseInfo", {
    extend: "Ext.form.Panel",
    id: 'adminbaseInfo',
    xtype: "view-personelMg-adminbaseInfo",
    width: "100%",
    height: "100%",
    layout: 'fit',
    config: {},
    requires: [],
    constructor: function (config) {
        var me = this;
        config = config || {};
        Ext.applyIf(config, me.config);
        this.callParent(arguments);
    },
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: "form",
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '管理编号',
                            labelWidth: 60,
                            columnWidth: .3,
                            name: 'adNum',
                            readOnly: true,
                            emptyText: '管理员编号自动生产',
                            itemId: 'adNum',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            allowBlank: false,
                            blankText: '姓名必填',
                            labelWidth: 60,
                            name: 'adName',
                            itemId: 'adName',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '年龄',
                            allowBlank: false,
                            blankText: '年龄必填',
                            labelWidth: 60,
                            columnWidth: .3,
                            name: 'age',
                            itemId: 'age',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '性别',
                            allowBlank: false,
                            blankText: '性别必填',
                            labelWidth: 60,
                            name: 'sex',
                            itemId: 'sex',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '电话号码',
                            allowBlank: false,
                            blankText: '电话号码必填',
                            labelWidth: 60,
                            name: 'phoneNum',
                            itemId: 'phoneNum',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    },
    getAdminInfo: function (operation, success) {
        var me = this;
        var adminForm = me.getForm();
        var formData = adminForm.getValues();
        if (!adminForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的管理员信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'PersonelMg/addAdmin';
        } else if (operation == 'edit') {
            //修改
            url = 'PersonelMg/exitAdmin';
        }
        Ext.Ajax.request({
            url:url,
            method: 'POST',
            params:formData,
            success: function (response, options) {
                var response = JSON.parse(response.responseText);
                if (response.success) {
                    Ext.Msg.alert("系统提示", response.result);
                    success();
                }
                else {
                    Ext.Msg.alert("系统提示", response.message);
                }
            },
            failure: function (response) {
                Ext.Msg.alert("系统提示", "请求超时");
            }
        });
    }
});