Ext.define("app.view.login", {
    extend: 'Ext.Viewport',
    // layout: 'fit',
    id: 'mainPage',
    name: 'borderContainer',

    style: 'background-image:url(imgs/bg2.jpg);background-repeat: no-repeat;filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=\'scale\')";-moz-background-size:100% 100%;background-size:100% 100%;',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    requires: [],
    config: {},
    // padding: "10px 20px 0 20px",
    initComponent: function () {
        var me = this;
        Ext.applyIf(this, {
            items: [
                {
                    itemId: 'loginForm',
                    xtype: 'form',
                    title: '<span style="color: #a5a5a5;font-weight:bold;">登录</span>',
                    titleAlign: 'center',
                    height: 400,
                    width: 300,
                    //所有子组件如果没有指定类型，则采用该类型：文本输入框
                    defaultType: 'textfield',
                    standardSubmit: true,//让表单提交后可以实现重定向
                    frame: true,
                    defaults: {
                        allowBlank: false
                    },
                    //标签的对其方式：右对齐
                    // labelAlign: 'right',
                    // //标签的宽度
                    // labelWidth: 60,
                    //取消默认的边框
                    // defaults: {boder: false},
                    bodyStyle: {
                        background: '#fff',
                    },
                    //items是指想该面板中插入一下组件，如：文本框、标签什么的
                    items: [
                        {
                            type: 'textfield',
                            // fieldLabel: '<span style="color: #d5d5d5;font-weight:bold;">用户名</span>',
                            fieldLabel: '<i class="fa fa-user" style="font-size:16px;color:#a5a5a5;"></i>',
                            // glyph: 'xf06a@FontAwesome',
                            labelWidth: 20,
                            width: 200,
                            height: 28,
                            name: 'username',
                            itemId: 'username',
                            margin: '40 0 0 50',
                            regex: /^[a-zA-Z0-9]{4,12}$/,
                            regexText: '账号格式不正确!',
                            blankText: '账号不能为空',
                            emptyText: '请输入账号',

                        },
                        {
                            type: 'textfield',
                            inputType: 'password',
                            fieldLabel: '<i class="fa fa-lock" style="font-size:16px;color:#a5a5a5;"></i>',
                            labelWidth: 20,
                            width: 200,
                            height: 28,
                            name: 'password',
                            itemId: 'password',
                            margin: '20 0 0 50',
                            regex: /^[a-zA-Z0-9]{6,12}$/,
                            regexText: '密码格式不正确!',
                            emptyText: '请输入密码',
                            blankText: '密码不能为空',
                        },
                        // {
                        //     type:'textfield',
                        //     fieldLabel: '密码',
                        //     labelWidth: 100,
                        //     width: 300,
                        //     height: 28,
                        //     name: 'yanzheng',
                        //     itemId: 'yanzheng',
                        //     margin: '10 0 0 50',
                        //     emptyText: '请输入密码',
                        //     blankText: '密码不能为空',
                        // },
                    ],
                    fbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: "登录",
                            itemId: 'save_id',
                            handler: function (btn) {
                              var form= me.queryById('loginForm').getForm();
                                if (!form.isValid()) {
                                    Ext.Msg.alert('温馨提示', '请填写正确的登录信息！');
                                    return;
                                }
                                var loginDate=form.getValues()
                                form.submit({
                                    clientValidation: true,
                                    url: 'j-spring-security-check',
                                    params: loginDate,
                                    success: function(form, action) {
                                        Ext.Msg.alert('Success', action.result.msg);
                                    },
                                    failure: function(form, action) {
                                        switch (action.failureType) {
                                            case Ext.form.action.Action.CLIENT_INVALID:
                                                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                                break;
                                            case Ext.form.action.Action.CONNECT_FAILURE:
                                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                                break;
                                            case Ext.form.action.Action.SERVER_INVALID:
                                                Ext.Msg.alert('Failure', action.result.msg);
                                        }
                                    }
                                });
                            }

                        },
                        {
                            xtype: 'button',
                            text: "重置",
                            handler: function (btn) {
                                me.queryById('loginForm').getForm().reset() ;
                            }
                        }
                    ]


                }
            ]
        })
        ;
        this.callParent(arguments);
    }
});


 
 