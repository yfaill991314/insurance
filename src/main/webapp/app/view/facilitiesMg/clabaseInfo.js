Ext.define("app.view.facilitiesMg.clabaseInfo", {
    extend: "Ext.form.Panel",
    id: 'clabaseInfo',
    xtype: "view-facilitiesMg-clabaseInfo",
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
        var buildStoreData = [
            {'name': '1教', 'value': '1教'},
            {'name': '2教', 'value': '2教'},
            {'name': '3教', 'value': '3教'},
            {'name': '第1实验楼', 'value': '第1实验楼'},
            {'name': '第2实验楼', 'value': '第2实验楼'}
        ]
        var buildStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            autoLoad: true,
            data: buildStoreData
        });




        Ext.apply(this, {
            items: [
                {
                    xtype: "form",
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '教室编号',
                            labelWidth: 60,
                            columnWidth: .3,
                            readOnly: true,
                            emptyText: '教室编号自动生产',
                            name: 'id',
                            itemId: 'id',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'combobox',
                            emptyText: '请选择',
                            fieldLabel: '教学楼',
                            store: buildStore,
                            activeCounter: 1,
                            displayField: 'name',
                            valueField: 'value',
                            editable: false,
                            allowBlank: false,
                            blankText: '教学楼必填',
                            columnWidth: .3,
                            labelWidth: 60,
                            margin: '10 0 0 50',
                            name: 'buildName',
                            itemId: 'buildName',
                            listeners: { //监听
                                afterRender: function (combo) {//渲染
                                    var firstValue = combo.getStore().getAt(0).get('value');
                                    combo.setValue(firstValue);
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '楼层',
                            allowBlank: false,
                            blankText: '楼层必填',
                            labelWidth: 60,
                            name: 'floor',
                            itemId: 'floor',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '房间号',
                            allowBlank: false,
                            blankText: '房间号必填',
                            labelWidth: 60,
                            name: 'roomNum',
                            itemId: 'roomNum',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '容量(人)',
                            allowBlank: false,
                            blankText: '容量必填',
                            labelWidth: 60,
                            name: 'capacity',
                            itemId: 'capacity',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '状态',
                            allowBlank: false,
                            blankText: '状态必填',
                            labelWidth: 60,
                            name: 'status',
                            itemId: 'status',
                            columnWidth: .3,
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: '备注',
                            labelWidth: 60,
                            height: 100,
                            columnWidth: .9,
                            name: 'remark',
                            itemId: 'remark',
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
        var claForm = me.getForm();
        var formData = claForm.getValues();
        if (!claForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的教室信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'facilitiesMg/addClaRoom';
        } else if (operation == 'edit') {
            //修改
            url = 'facilitiesMg/exitClaRoom';
        }
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            params: formData,
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