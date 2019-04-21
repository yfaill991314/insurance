Ext.define("app.view.personelMg.stubaseInfo", {
    extend: "Ext.form.Panel",
    id: 'stubaseInfo',
    xtype: "view-personelMg-stubaseInfo",
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
        // var  storeData = [
        //     {'name': '计算机科学院', 'value': '1'},
        //     {'name': '文学院', 'value': '2'},
        //     {'name': '数学与统计院', 'value': '3'}
        // ]


        // var paramStore = Ext.create('Ext.data.Store', {
        //     fields: ['name'],
        //     autoLoad: true,
        //     data:storeData
        // });
        Ext.apply(this, {
            items: [
                {
                    xtype: "form",
                    layout: 'column',
                    // title: '学生基本信息',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '学号',
                            labelWidth: 60,
                            columnWidth: .3,
                            name: 'stuNum',
                            readOnly: true,
                            emptyText: '学号自动生产',
                            itemId: 'stuNum',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            allowBlank: false,
                            blankText: '姓名必填',
                            labelWidth: 60,
                            name: 'stuName',
                            itemId: 'stuName',
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
                        // {
                        //     xtype: 'combobox',
                        //     emptyText: '请选择',
                        //     fieldLabel: '学院',
                        //     store: paramStore,
                        //     editable: false,
                        //     displayField: 'name',
                        //     allowBlank: false,
                        //     valueField:'value',
                        //     columnWidth: .3,
                        //     labelWidth: 60,
                        //     margin: '10 0 0 50',
                        //     name: 'college',
                        //     itemId: 'college',
                        // },
                        {
                            xtype: 'textfield',
                            fieldLabel: '专业',
                            allowBlank: false,
                            blankText: '专业必填',
                            labelWidth: 60,
                            name: 'profession',
                            itemId: 'profession',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '班级',
                            allowBlank: false,
                            blankText: '班级必填',
                            labelWidth: 60,
                            name: 'stuClass',
                            itemId: 'stuClass',
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
    getStuInfo: function (operation, success) {
        var me = this;
        var stuForm = me.getForm();
        var formData = stuForm.getValues();
        if (!stuForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的学生信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'PersonelMg/addStudent';
        } else if (operation == 'edit') {
            //修改
            url = 'PersonelMg/exitStudent';
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