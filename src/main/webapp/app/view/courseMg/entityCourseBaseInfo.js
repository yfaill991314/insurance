Ext.define("app.view.courseMg.entityCourseBaseInfo", {
    extend: "Ext.form.Panel",
    id: 'entityCourseBaseInfo',
    xtype: "view-courseMg-entityCourseBaseInfo",
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
        var weekStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            autoLoad: true,
            data: [
                {'name': '星期一', 'value': '星期一'},
                {'name': '星期二', 'value': '星期二'},
                {'name': '星期三', 'value': '星期三'},
                {'name': '星期四', 'value': '星期四'},
                {'name': '星期五', 'value': '星期五'},
                {'name': '星期六', 'value': '星期六'},
                {'name': '星期日', 'value': '星期日'}
            ]
        });

        var statusStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            autoLoad: true,
            data: [
                {'name': '已添加', 'value': '已添加'},
                {'name': '待选课', 'value': '待选课'},
                {'name': '正在授课', 'value': '正在授课'},
                {'name': '已结课', 'value': '已结课'},
                {'name': '已评分', 'value': '已评分'},
            ]
        });

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
                            columnWidth: 1,
                            editable: false,
                            emptyText: '课程编号自动生产',
                            itemId: 'id',
                            name: 'id',
                            margin: '10 660 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '科目',
                            labelWidth: 60,
                            columnWidth: .25,
                            editable: false,
                            itemId: 'couName',
                            name: 'couName',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '科目id',
                            labelWidth: 60,
                            hidden: true,
                            columnWidth: .25,
                            editable: false,
                            itemId: 'courseId',
                            name: 'courseId',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'button',
                            text: '选择科目',
                            columnWidth: .1,
                            margin: '10 0 0 10',
                            handler: function () {
                                me.showSelectCourseWindow();
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '开始日期',
                            allowBlank: false,
                            editable: false,
                            blankText: '授课开始日期必填',
                            columnWidth: .35,
                            margin: '10 50 0 50',
                            labelWidth: 60,
                            name: 'startDate',
                            itemId: 'startDate',
                            format: 'Y-m-d',
                            altFormats: 'Y-m-d',
                            value: new Date()
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '结束日期',
                            allowBlank: false,
                            editable: false,
                            blankText: '授课结束日期必填',
                            columnWidth: .3,
                            margin: '10 50 0 0',
                            labelWidth: 60,
                            name: 'endDate',
                            itemId: 'endDate',
                            format: 'Y-m-d',
                            altFormats: 'Y-m-d',
                            value: new Date()
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '上课教室',
                            labelWidth: 60,
                            columnWidth: .25,
                            editable: false,
                            itemId: 'location',
                            name: 'location',
                            margin: '17 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '上课教室id',
                            labelWidth: 60,
                            hidden: true,
                            columnWidth: .25,
                            editable: false,
                            itemId: 'claRoomId',
                            name: 'claRoomId',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'button',
                            text: '可用教室',
                            columnWidth: .1,
                            margin: '17 0 0 10',
                            handler: function () {
                                me.showSelectClaRoomWindow();
                            }
                        },
                        {
                            xtype: 'numberfield',
                            columnWidth: .35,
                            labelWidth: 60,
                            margin: '10 50 0 50',
                            // editable: false,
                            name: 'strTime',
                            itemId: 'strTime',
                            fieldLabel: '开始时间(节)',
                            value: 1,
                            maxValue: 11,
                            minValue: 1
                        },
                        {
                            xtype: 'numberfield',
                            columnWidth: .3,
                            // editable: false,
                            labelWidth: 60,
                            margin: '10 50 0 0',
                            name: 'endTime',
                            itemId: 'endTime',
                            fieldLabel: '结束时间(节)',
                            value: 11,
                            maxValue: 11,
                            minValue: 1
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '任课教师',
                            labelWidth: 60,
                            columnWidth: .25,
                            editable: false,
                            itemId: 'tName',
                            name: 'tName',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '任课教师id',
                            labelWidth: 60,
                            hidden: true,
                            columnWidth: .25,
                            editable: false,
                            itemId: 'techerId',
                            name: 'techerId',
                            margin: '10 0 0 50'
                        },
                        {
                            xtype: 'button',
                            text: '选择教师',
                            columnWidth: .1,
                            margin: '10 0 0 10',
                            handler: function () {
                                me.showSelectTeacherWindow();
                            }
                        },
                        {
                            xtype: 'combobox',
                            emptyText: '请选择',
                            fieldLabel: '课程状态',
                            store: statusStore,
                            editable: false,
                            displayField: 'name',
                            allowBlank: false,
                            valueField: 'value',
                            columnWidth: 0.35,
                            labelWidth: 60,
                            margin: '10 50 0 50',
                            name: 'status',
                            itemId: 'status'
                        },
                        {
                            xtype: 'combobox',
                            emptyText: '请选择',
                            fieldLabel: '上课星期',
                            store: weekStore,
                            editable: false,
                            displayField: 'name',
                            allowBlank: false,
                            valueField: 'value',
                            columnWidth: .3,
                            labelWidth: 60,
                            margin: '10 50 0 0',
                            name: 'week',
                            itemId: 'week'
                        },
                    ]
                }
            ]
        });
        this.callParent(arguments);
    },
    getEntityCourseInfo: function (operation, success) {
        var me = this;
        var eCourseForm = me.getForm();
        var formData = eCourseForm.getValues();
        if (!eCourseForm.isValid()) {
            Ext.Msg.alert('温馨提示', '请填写完的课程信息！');
            return;
        }

        var url = '';
        if (operation == 'add') {
            url = 'entityCourse/addEntityCourse';
        } else if (operation == 'edit') {
            //修改
            url = 'entityCourse/exitEntityCourse';
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
    },
    showSelectCourseWindow: function () {
        var me = this;
        var CourseStore = Ext.create('Ext.data.Store', {
            id: 'CourseStore',
            autoLoad: true,
            pageSize: 15, // 每页的条目数量
            proxy: {
                type: 'ajax',
                url: 'coursemg/queryCourseList',
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: "total"
                }
            }
        });

        Ext.create("Ext.window.Window", {
            title: '单位信息',
            modal: true,
            width: '80%',
            height: '80%',
            layout: 'fit',
            items: [
                {
                    layout: 'hbox',
                    height: '100%',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'query_grid',
                            flex: 1,
                            // layout: 'fit',
                            height: '100%',
                            // autoScroll: true,
                            // border: true,
                            store: CourseStore,
                            columnLines: true,
                            tbar: {
                                xtype: 'toolbar', columnWidth: 1,
                                items: [
                                    '->',
                                    {
                                        xtype: 'textfield',
                                        itemId: 'courseName',
                                        emptyText: '输入课程名称'
                                    },
                                    {
                                        xtype: 'button',
                                        text: '查询',
                                        handler: function (btn) {
                                            var grid = btn.up().up();
                                            var orgName = grid.queryById('courseName').getValue();
                                            var params = {
                                                orgName: orgName,
                                                orgType: orgType
                                            };
                                            grid.store.setQuery({
                                                params: params
                                            });
                                            grid.store.search();

                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: '重置',
                                        handler: function (btn) {
                                            btn.up().up().queryById('courseName').setValue('');
                                        }
                                    }
                                ]
                            },
                            columns: [
                                {text: '课程id', dataIndex: 'id', width: '25%', align: 'center'},
                                {text: '课程名称', dataIndex: 'courseName', width: '25%', align: 'center'},
                                {text: '课时', dataIndex: 'courseHours', width: '24%', align: 'center'},
                                {text: '教材', dataIndex: 'courseBook', width: '25%', align: 'center'}
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: true,
                                    store: CourseStore
                                }
                            ]
                        },
                    ]
                }

            ],
            fbar: [
                {
                    xtype: 'button',
                    text: "确定",
                    handler: function (btn) {
                        var win = btn.up().up();
                        var selectData = win.queryById('query_grid').getSelectionModel().getSelection();
                        if (selectData.length != 1) {
                            Ext.Msg.alert('温馨提示', '请选择一条数据');
                            return;
                        }
                        me.queryById('couName').setValue(selectData[0].get('courseName'));
                        me.queryById('courseId').setValue(selectData[0].get('id'));
                        win.close();
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
    showSelectClaRoomWindow: function () {
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

        Ext.create("Ext.window.Window", {
            title: '单位信息',
            modal: true,
            width: '80%',
            height: '80%',
            layout: 'fit',
            items: [
                {
                    layout: 'hbox',
                    height: '100%',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'query_grid',
                            flex: 1,
                            // layout: 'fit',
                            height: '100%',
                            // autoScroll: true,
                            // border: true,
                            store: claStore,
                            columnLines: true,
                            tbar: {
                                xtype: 'toolbar', columnWidth: 1,
                                items: [
                                    '->',
                                    {
                                        xtype: 'textfield',
                                        itemId: 'courseName',
                                        emptyText: '输入课程名称'
                                    },
                                    {
                                        xtype: 'button',
                                        text: '查询',
                                        handler: function (btn) {
                                            var grid = btn.up().up();
                                            var orgName = grid.queryById('courseName').getValue();
                                            var params = {
                                                orgName: orgName,
                                                orgType: orgType
                                            };
                                            grid.store.setQuery({
                                                params: params
                                            });
                                            grid.store.search();

                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: '重置',
                                        handler: function (btn) {
                                            btn.up().up().queryById('courseName').setValue('');
                                        }
                                    }
                                ]
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
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: true,
                                    store: claStore
                                }
                            ]
                        },
                    ]
                }

            ],
            fbar: [
                {
                    xtype: 'button',
                    text: "确定",
                    handler: function (btn) {
                        var win = btn.up().up();
                        var selectData = win.queryById('query_grid').getSelectionModel().getSelection();
                        if (selectData.length != 1) {
                            Ext.Msg.alert('温馨提示', '请选择一条数据');
                            return;
                        }
                        var location=selectData[0].get('buildName')+' '+selectData[0].get('floor')+' '+selectData[0].get('roomNum');
                        me.queryById('location').setValue(location);
                        me.queryById('claRoomId').setValue(selectData[0].get('id'));
                        win.close();
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
    showSelectTeacherWindow: function () {
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

        Ext.create("Ext.window.Window", {
            title: '单位信息',
            modal: true,
            width: '80%',
            height: '80%',
            layout: 'fit',
            items: [
                {
                    layout: 'hbox',
                    height: '100%',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'query_grid',
                            flex: 1,
                            // layout: 'fit',
                            height: '100%',
                            // autoScroll: true,
                            // border: true,
                            store: teacherStore,
                            columnLines: true,
                            tbar: {
                                xtype: 'toolbar', columnWidth: 1,
                                items: [
                                    '->',
                                    {
                                        xtype: 'textfield',
                                        itemId: 'courseName',
                                        emptyText: '输入课程名称'
                                    },
                                    {
                                        xtype: 'button',
                                        text: '查询',
                                        handler: function (btn) {
                                            var grid = btn.up().up();
                                            var orgName = grid.queryById('courseName').getValue();
                                            var params = {
                                                orgName: orgName,
                                                orgType: orgType
                                            };
                                            grid.store.setQuery({
                                                params: params
                                            });
                                            grid.store.search();

                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: '重置',
                                        handler: function (btn) {
                                            btn.up().up().queryById('courseName').setValue('');
                                        }
                                    }
                                ]
                            },
                            columns: [
                                {text: '教师号', dataIndex: 'teaNum', width: '20%', align: 'center'},
                                {text: '姓名', dataIndex: 'teaName', width: '15%', align: 'center'},
                                {text: '学院', dataIndex: 'college', width: '20%', align: 'center'},
                                {text: '性别', dataIndex: 'sex', width: '14%', align: 'center'},
                                {text: '年龄', dataIndex: 'age', width: '10%', align: 'center'},
                                {text: '电话号码', dataIndex: 'phoneNum', width: '20%', align: 'center'},
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: true,
                                    store: teacherStore
                                }
                            ]
                        },
                    ]
                }

            ],
            fbar: [
                {
                    xtype: 'button',
                    text: "确定",
                    handler: function (btn) {
                        var win = btn.up().up();
                        var selectData = win.queryById('query_grid').getSelectionModel().getSelection();
                        if (selectData.length != 1) {
                            Ext.Msg.alert('温馨提示', '请选择一条数据');
                            return;
                        }
                        me.queryById('tName').setValue(selectData[0].get('teaName'));
                        me.queryById('techerId').setValue(selectData[0].get('teaNum'));
                        win.close();
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
    }


});