<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="head">
    <title>个人资料</title>
</rapid:override>
<rapid:override name="content">
    <%
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    %>
    <script src="${pageContext.request.contextPath}/static/js/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <script src="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/teacher/teacher.js"></script>
    <style type="text/css">
        .label {
            display: inline; padding: .2em .6em .3em; font-size: 75%; font-weight: bold; line-height: 1; color: #fff; text-align: center; white-space: nowrap; vertical-align: baseline; border-radius: .25em;
        }

    </style>
    <table class="layui-table" style="margin:80px 400px; width:450px;">
        <colgroup>
            <col width="200">
            <col width="250">
        </colgroup>
        <tbody>
        <tr style="height:40px;">
            <td>教师号</td>
            <td>${teacher.teaId}</td>
        </tr>
        <tr>
            <td>姓名</td>
            <td>${teacher.teaName}</td>
        </tr>
        </tbody>
    </table>
    <button class="layui-btn layui-btn-danger  layui-btn-lg" onclick="reviseUser()" style="margin:0 550px;">
        修改密码
    </button>
    <script>
    </script>

    <!--修改密码弹出的模态框 -->
    <div class="modal fade" id="userReviseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <span class="label label-info">修改密码</span>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">

                            <div class="col-sm-10">
                                <span class="label label-info">旧密码</span>
                                <input type="password" name="password" class="form-control" id="userPassword"
                                       placeholder="密码是6-18位英文和数字的组合">
                                <span  class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10">
                                <span class="label label-info">新密码</span>
                                <input type="password" name="password" class="form-control" id="newuserPassword"
                                       placeholder="密码是6-18位英文和数字的组合">
                                <span  class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10">
                                <span class="label label-info">确认密码</span>
                                <input type="password" name="password" class="form-control" id="renewuserPassword"
                                       placeholder="密码是6-18位英文和数字的组合">
                                <span  class="help-block"></span>
                            </div>
                        </div>






                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="user_revise_btn">修改</button>
                </div>
            </div>
        </div>
    </div>

</rapid:override>
<%@ include file="base.jsp" %>
