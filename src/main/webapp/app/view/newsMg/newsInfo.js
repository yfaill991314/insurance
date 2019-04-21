Ext.define("app.view.newsMg.newsInfo", {
    extend: "Ext.form.Panel",
    id: 'newsInfo',
    xtype: "view-newsMg-newsInfo",
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
                            fieldLabel: '新闻id',
                            labelWidth: 60,
                            columnWidth: .5,
                            readOnly: true,
                            emptyText: '新闻id自动生产',
                            itemId: 'id',
                            name: 'id',
                            margin: '10 25 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '发布人id',
                            labelWidth: 60,
                            columnWidth: .5,
                            readOnly: true,
                            emptyText: '发布人自动生产',
                            name: 'releaseId',
                            itemId: 'releaseId',
                            margin: '10 50 0 25'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '发布时间',
                            labelWidth: 60,
                            columnWidth: .5,
                            readOnly: true,
                            emptyText: '发布时间自动生产',
                            name: 'releaseDate',
                            itemId: 'releaseDate',
                            margin: '10 25 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '更新时间',
                            labelWidth: 60,
                            columnWidth: .5,
                            readOnly: true,
                            emptyText: '更新时间自动生产',
                            name: 'updateDate',
                            itemId: 'updateDate',
                            margin: '10 50 0 25'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '新闻标题',
                            allowBlank: false,
                            blankText: '标题必填',
                            labelWidth: 60,
                            name: 'title',
                            itemId: 'title',
                            columnWidth: 1,
                            margin: '10 50 0 50'
                        },
                        {
                            xtype: 'htmleditor',
                            name: 'details',
                            itemId: 'details',
                            height: 250,
                            enableFont: true,
                            columnWidth: 1,
                            margin: '10 50 0 50'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    },
    getNewsInfo: function (operation, success) {
        var me = this;
        var stuForm = me.getForm();
        var formData = stuForm.getValues();
        if (!stuForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的学生信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'newsMg/addNews';
        } else if (operation == 'edit') {
            //修改
            url = 'newsMg/exitNews';
        }
        var formParam = {};
        formParam["resultJSON"] = JSON.stringify(formData);
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            params: formParam,
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