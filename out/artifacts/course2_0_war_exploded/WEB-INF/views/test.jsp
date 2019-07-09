<%@ page contentType="text/html; charset=utf-8" language="java"
         errorPage=""%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>springmvc与Ajax交互</title>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/json2.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.json-2.3.js"></script>
    <link href="<%=request.getContextPath()%>/css/newmain1.css" rel="stylesheet" type="text/css" />
</head>
<body>
<h3></h3>
<form id="form1" action="<%=request.getContextPath()%>/User/saveUser" method="post" onsubmit="return chkInfo(this);">
    <div class="right_main" align="center" id="div_operate">
        <div class="form_title" style="width: 60%">
            <div class="title_leftbg"></div>
            <div class="title_nr">用户信息</div>
            <div class="title_rightbg"></div>
        </div>
        <div class="right_bg" style="width: 60%">
            <div class="right_main">
                <table width="60%" border="1" align="center" class="table_normal">
                    <tr>
                        <td width="25%" style="text-align: right;">姓名：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <input type="text" id="userName" name="user_name" size="25" value="${User.user_name }"/>
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">性别：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <select id="userSex" name="user_sex" style="width:186" >
                                <option value="">请选择</option>
                                <c:if test="${!empty sexList}">
                                    <c:forEach items="${sexList}" var="sexItem">
                                        <option value="${sexItem.value}"
                                                <c:if test="${sexItem.value eq User.user_sex}">selected = "selected"</c:if>>
                                                ${sexItem.text}
                                        </option>
                                    </c:forEach>
                                </c:if>
                            </select>
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">年龄：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <input type="text" id="userAge" name="user_age" size="25" value="${User.user_age }" />
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">邮箱：&nbsp;&nbsp;&nbsp;&nbsp;
                        </td>
                        <td style="text-align: left;">
                            <input type="text" id="userEmail" name="user_email" size="25" value="${User.user_email}" />
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">电话：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <input type="text" id="userTelephone" name="user_telephone"
                                   size="25" value="${User.user_telephone }" />
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">学历：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <select id="userEducation" name="user_education" style="width:186" >
                                <option value="">请选择</option>
                                <c:if test="${!empty educationList}">
                                    <c:forEach items="${educationList}" var="educationItem">
                                        <option value="${educationItem.value}"
                                                <c:if test="${educationItem.value eq User.user_education}">
                                                    selected = "selected"</c:if>>
                                                ${educationItem.text}
                                        </option>
                                    </c:forEach>
                                </c:if>
                            </select>
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">职称：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <select id="userTitle" name="user_title" style="width:186" >
                                <option value="">请选择</option>
                                <c:if test="${!empty titleList}">
                                    <c:forEach items="${titleList}" var="titleItem">
                                        <option value="${titleItem.value}"
                                                <c:if test="${titleItem.value eq User.user_title}">selected = "selected"</c:if>>
                                                ${titleItem.text}
                                        </option>
                                    </c:forEach>
                                </c:if>
                            </select>
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" style="text-align: right;">所属部门：&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: left;">
                            <select id="userDept" name="dept_id" style="width:186" >
                                <option value="">请选择</option>
                                <c:if test="${!empty deptList}">
                                    <c:forEach items="${deptList}" var="deptItem">
                                        <option value="${deptItem.id}"
                                                <c:if test="${deptItem.id eq User.dept_id}">selected = "selected"</c:if>>
                                                ${deptItem.dept_name}
                                        </option>
                                    </c:forEach>
                                </c:if>
                            </select>
                            <span class="xing">*</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input type="hidden" name="id"
                                    <c:choose>
                                        <c:when test="${User.id !=null}">
                                            value="${User.id}"
                                        </c:when>
                                        <c:otherwise>
                                            value="0"
                                        </c:otherwise>
                                    </c:choose>
                            />
                            <input id="btn1" type="button" class="c_botton" value="post方式：提交Form表单" />
                            <input id="btn2" type="button" class="c_botton" value="post方式：提交Form表单(方法二)" />
                            <input id="btn3" type="button" class="c_botton" value="post方式：提交多个对象" />
                            <input id="btn4" type="button" class="c_botton" value="get方式" />
                            <input id="btn5" type="button" class="c_botton" value="post传参，方式一" />
                            <input id="btn6" type="button" class="c_botton" value="post传参，方式二" />
                            <input id="btn7" type="button" class="c_botton" value="post传参，方式三" />
                            <input id="btn8" type="button" class="c_botton" value="post方式提交，map接收" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</form>
</body>
</html>