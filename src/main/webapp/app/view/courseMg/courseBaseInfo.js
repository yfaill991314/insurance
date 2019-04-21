Ext.define("app.view.courseMg.courseBaseInfo", {
    extend: "Ext.form.Panel",
    id: 'courseBaseInfo',
    xtype: "view-courseMg-courseBaseInfo",
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
                            fieldLabel: '课程编号',
                            labelWidth: 60,
                            columnWidth: .3,
                            name: 'id',
                            readOnly: true,
                            emptyText: '课程编号自动生产',
                            itemId: 'id',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '课程名称',
                            allowBlank: false,
                            blankText: '课程名称必填',
                            labelWidth: 60,
                            name: 'courseName',
                            itemId: 'courseName',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '课时',
                            allowBlank: false,
                            blankText: '上课时长必填',
                            labelWidth: 60,
                            name: 'courseHours',
                            itemId: 'courseHours',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '教材',
                            allowBlank: false,
                            blankText: '使用教材必填',
                            labelWidth: 60,
                            name: 'courseBook',
                            itemId: 'courseBook',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                    ]
                }
            ]
        });
        this.callParent(arguments);
    },
    getCourseInfo: function (operation, success) {
        var me = this;
        var stuForm = me.getForm();
        var formData = stuForm.getValues();
        if (!stuForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的学生信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'coursemg/addCourse';
        } else if (operation == 'edit') {
            //修改
            url = 'coursemg/exitCourse';
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