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
    <script src="${pageContext.request.contextPath}/static/js/jquery-3.3.1.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/student/courseList.js"></script>

    <form class="layui-form" style="margin:10px 15px 10px;">
        <div class="layui-form-item">
            <div class="layui-input-block">
                <div style="display: inline-block">
                    <div style="width: 180px; float: left; margin-left:-100px;">
                        <select class="layui-select" id="">
                            <option value="0">教师姓名</option>
                            <c:forEach items="${teaList}" var="teacher">
                                <option value="${teacher.teaId}">${teacher.teaName}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <button type="button" id="tea" class="layui-btn" style="margin-left:10px;">筛选</button>
                </div>
                <div style="display: inline-block">
                    <div style="width: 180px; float: left; margin-left:300px;">
                        <select class="layui-select" id="inssearch">
                            <option value="0">学院名称</option>
                            <c:forEach items="${insList}" var="institution">
                                <option value="${institution.insId}">${institution.insName}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <button type="button" id="ins" class="layui-btn" style="margin-left:10px;">筛选</button>
                </div>
                <button type="button" class="layui-btn" style="float:right;" onclick="search()">搜索</button>
                <input type="text" id="search" class="layui-input" style="float:right; width:200px;"
                       placeholder="请输入课程编号">
            </div>
        </div>
    </form>
    <%--<p style="color:red; margin-top:10px; font-size:15px;">${msg}</p>--%>
    <table class="layui-table" style="margin-top:15px;" id="course_table">
        <colgroup>
            <col width="100">
            <col width="120">
            <col width="80">
            <col width="50">
            <col width="50">
            <col width="200">
            <col width="60">
        </colgroup>
        <thead>
        <tr>
            <th>课程编号</th>
            <th>课程名称</th>
            <th>教师名称</th>
            <th>人数限制</th>
            <th>已选人数</th>
            <th>学院限制</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <%--<c:forEach items="${paging.dataList}" var="course">--%>


        </tbody>
    </table>
    <div style="text-align:center; margin-top:10px; margin-left:-100px;" id="page_info_area">
    </div>



    <script>
        $(function () {
            function search() {
            var courseid = document.getElementById("search").value;
            window.location.href = "<%=basePath%>student/searchCourse?courseid=" + courseid;
            }
            $("#tea").click(function () {
                var teaid=$("#option:selected").attr("value");
                if(teaid===0){
                    alert("请选择正确的教师姓名");
                }
                else{
                    window.location.href="<%=basePath%>student/searchListByTeaId?teaid="+teaid;
                }
            });
            $("#ins").click(function () {
                var insid=$("#inssearch option:selected").attr("value");
                if(insid===0){
                    alert("请选择正确的教师姓名");
                }
                else{
                    window.location.href="<%=basePath%>student/searchListByInsId?insid="+insid;
                }
            });
        })
    </script>
</rapid:override>
<%@ include file="base.jsp" %>
