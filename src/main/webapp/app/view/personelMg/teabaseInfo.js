Ext.define("app.view.personelMg.teabaseInfo", {
    extend: "Ext.form.Panel",
    id: 'teabaseInfo',
    xtype: "view-personelMg-teabaseInfo",
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
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: "form",
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '教师号',
                            labelWidth: 60,
                            columnWidth: .3,
                            name: 'teaNum',
                            readOnly: true,
                            emptyText: '教师号自动生产',
                            itemId: 'teaNum',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            allowBlank: false,
                            blankText: '姓名必填',
                            labelWidth: 60,
                            name: 'teaName',
                            itemId: 'teaName',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '入校学年',
                            allowBlank: false,
                            blankText: '入校学年必填',
                            labelWidth: 60,
                            name: 'inSchYear',
                            itemId: 'inSchYear',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '学院',
                            allowBlank: false,
                            blankText: '学院必填',
                            labelWidth: 60,
                            name: 'college',
                            itemId: 'college',
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
    getTeaInfo: function (operation, success) {
        var me = this;
        var teaForm = me.getForm();
        var formData = teaForm.getValues();
        if (!teaForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的教师信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'PersonelMg/addTeacher';
        } else if (operation == 'edit') {
            //修改
            url = 'PersonelMg/exitTeacher';
        }
        Ext.Ajax.request({
            url:url,
            method: 'POST',
            params:formData,
            success: function (response, options) {
                var response = JSON.parse(response.responseText);
                if (response.success) {
                    Ext.Msg.alert("系统提示", response.result)
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