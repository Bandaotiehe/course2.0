<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c"
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="head">
    <title>课程信息</title>
</rapid:override>
<rapid:override name="content">
    <%
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    %>
    <style>
        .layui-form-label {
            float: left;
            display: block;
            padding: 9px 15px;
            width: 86px;
            font-weight: 400;
            line-height: 20px;
            text-align: right;
        }
    </style>
    <script src="${pageContext.request.contextPath}/static/js/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <script src="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/teacher/courseList.js"></script>
    <div>
        <button type="button" onclick="insert()" class="layui-btn layui-btn-lg layui-btn-warm insert_btn" style="margin-top:15px;">添加新课程</button>
    </div>
    <script>
        function insert() {
            layer.load();
            window.location.href="<%=basePath%>teacher/insertCourse";
            setTimeout(function(){
                layer.closeAll('loading');
            }, 50);
        }
    </script>
    <%--<script>--%>
        <%--function insert() {--%>
            <%--window.location.href="<%=basePath%>teacher/insertCourse";--%>
        <%--}--%>
    <%--</script>--%>
    <%--<p style="color:red; margin-top:10px; font-size:15px;">${msg}</p>--%>
    <table class="layui-table" style="margin-top:15px;" id="course_table">
        <colgroup>
            <col width="5%">
            <col width="5%">
            <col width="5%">
            <col width="5%">
            <col width="5%">
            <col width="5%">
        </colgroup>
        <thead>
        <tr>
            <th>课程编号</th>
            <th>课程名称</th>
            <th>人数限制</th>
            <th>已选人数</th>
            <th>学院限制</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
 </tbody>
    </table>
    <div style="text-align:center; margin-top:10px; margin-left:-100px;" id="page_info_area">
    </div>
    <%--</div>--%>
     <%--//修改模态框--%>
    <div class="modal fade" id="courseReviseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <label class="col-sm-2 control-label">课程名称</label>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">课程名称</label>
                            <div class="col-sm-10">
                                <input type="text" name="username" id="name" class="form-control" id="userName_revise_input" >
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">人数限制</label>
                            <div class="col-sm-10">
                                <input type="text" name="worknumber" id="num" class="form-control" id="worknumber_revise_input">
                                <span  class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">学院限制</label>
                            <div class="col-sm-10" id="updatediv">
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="course_revise_btn">修改</button>
                </div>
            </div>
        </div>
    </div>
    <%--//添加模态框--%>
    <div class="modal fade" id="addcourseReviseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="addcourseReviseModalLabel">添加课程</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">课程名称</label>
                            <div class="col-sm-10">
                                <input type="text" name="username" id="addname" class="form-control" id="adduserName_revise_input" >
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">人数限制</label>
                            <div class="col-sm-10">
                                <input type="text" name="worknumber" id="addnum" class="form-control" id="addworknumber_revise_input">
                                <span  class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">学院限制</label>
                            <div class="col-sm-10" id="insertdiv">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="addcourse_revise_btn">添加</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        <%--function goPage(page){--%>
            <%--window.location.href="<%=basePath%>teacher/courseList?page="+page;--%>
        <%--}--%>
        <%--function edit(classId) {--%>
            <%--window.location.href="<%=basePath%>teacher/editCourse?courseid="+classId;--%>
        <%--}--%>
        <%--function delete_fun(classId) {--%>
            <%--var r=confirm("确认删除吗？")--%>
            <%--if (r==true)--%>
            <%--{--%>
                <%--window.location.href="<%=basePath%>teacher/deleteCourse?courseid="+classId;--%>
            <%--}--%>
            <%--else--%>
            <%--{--%>
                <%--return;--%>
            <%--}--%>
        <%--}--%>
        <%--function detail_fun(classId) {--%>
            <%--window.location.href="<%=basePath%>teacher/detailCourse?courseid="+classId+"&page="+1;--%>
        <%--}--%>
    </script>
</rapid:override>
<%@ include file="base.jsp" %>
