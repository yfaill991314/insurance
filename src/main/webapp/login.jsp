<%--
  Created by IntelliJ IDEA.
  User: YL
  Date: 2019/4/9
  Time: 16:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <!--自定义样式-->
    <link href="css/login.css" rel="stylesheet" type="text/css"/>
    <!--字体样式-->
    <link rel="stylesheet" type="text/css" href="font-awesome-4.3.0/css/font-awesome.min.css">
    <!--jquery-->
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.6.4/jquery.min.js"></script>
    <!--核心样式-->
    <!--<link rel="stylesheet" type="text/css" href="ExtJS/resources/css/ext-all.css"/>-->
    <link rel="stylesheet" type="text/css" href="ExtJS/classic/resources/theme-crisp-all.css"/>
    <link rel="stylesheet" type="text/css" href="ExtJS/classic/resources/theme-crisp-all-debug.css"/>

    <!--核心js-->
    <!--<script type="text/javascript" charset="UTF-8" src="ExtJS/ext-all-debug.js"></script>-->
    <!--<script type="text/javascript" src="ExtJS/build/ext-all.js"></script>-->
    <!--<script type="text/javascript" src="ExtJS/build/ext-all-debug.js"></script>-->
    <!--bootstrap-->
    <script type="text/javascript" src="ExtJS/classic/ext-bootstrap.js"></script>
    <!--国际化-->
    <!--<script type="text/javascript" charset="UTF-8" src="ExtJS/ext-lang-zh_CN.js"></script>-->
    <script type="text/javascript" src="ExtJS/classic/build/locale-zh_CN.js"></script>

    <!--页面私有js-->
    <script type="text/javascript" charset="UTF-8">
        Ext.onReady(function () {
            Ext.Loader.setConfig({enabled:true});
            Ext.create('app.view.login',{
            });
        });
    </script>
</head>
<body>

</body>
</html>
