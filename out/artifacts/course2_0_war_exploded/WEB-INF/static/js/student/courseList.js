//1.页面加载完成之后发送Ajax请求，要到分页数据
var totalRecord,currentPage;
$(function () {
    //显示第一页
    goPage(1);
    //退课
    //delete_fun()
    //教师列表
    teaList();
    insList();
});
//解析并显示数据表
function build_users_table(result) {
    //清空table表格
    $("#course_table tbody").empty();
    var users = result.extend.pageInfo.dataList;

    //遍历元素users
    $.each(users, function (index, item) {
        var classId = $("<td></td>").append(item.classId);
        var className = $("<td></td>").append(item.className);
        var teaName = $("<td></td>").append(item.teaName);
        var classNum = $("<td></td>").append(item.classNum);
        var classChooseNum = $("<td></td>").append(item.classChooseNum);
        var classLimitInsName= $("<td></td>").append(item.classLimitInsName.toString());
        var button2;
        if(item.classNum==item.classChooseNum)
        {
            button2=" <button class=\"layui-btn\" onclick=\"detail_fun("+item.classId+")\" disabled\n" +
                "                                    style=\"background-color: gray;\">选择\n" +
                "                            </button>"
        }
        else if(item.isChoose==1)
        {
            button2="<button class=\"layui-btn\" onclick=\"detail_fun("+item.classId+")\" disabled\n" +
                "                                    style=\"background-color: gray;\">已选\n" +
                "                            </button>"+"<button class=\"layui-btn \" onclick=\"delete_fun("+item.classId+")\">退课\n" +
                "                            </button>";
        }
        else
        {
            button2="<button class=\"layui-btn\" onclick=\"detail_fun("+item.classId+")\">选择\n" +
                "                            </button>";
        }

        var td_btn = $("<td></td>").append(" ").append(button2);
        $("<tr></tr>").append(classId).append(className).append(teaName).append(classNum).append(classChooseNum)
            .append(classLimitInsName).append(td_btn).appendTo("#course_table tbody");

    })
}

//解析显示分页信息
function build_page_info(result) {
    $("#page_info_area").empty();
    if( result.extend.pageInfo.totalPage >=0)
    {
        var str="";
        if(result.extend.pageInfo.totalPage==0)
        {
            str="<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage(1)\">首页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\">上一页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\" >下一页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\" >末页</button>";
        }
        if(result.extend.pageInfo.totalPage==1 && result.extend.pageInfo.currentPage==1)
        {
            str="<button class=\"layui-btn \" onclick=\"goPage(1)\">首页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\" >上一页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\" >下一页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\">末页</button>";
        }
        if(result.extend.pageInfo.totalPage>1 && result.extend.pageInfo.currentPage==1)
        {
            str="<button class=\"layui-btn\" onclick=\"goPage(1)\">首页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\" >上一页</button>"+
                "<button class=\"layui-btn\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)+1)+")\">下一页</button>"+
                "<button class=\"layui-btn\" onclick=\"goPage("+result.extend.pageInfo.totalPage+")\">末页</button>";
        }
        if(result.extend.pageInfo.currentPage>1 && result.extend.pageInfo.currentPage<result.extend.pageInfo.totalPage) {
            str="<button class=\"layui-btn \" onclick=\"goPage(1)\">首页</button>"+
                "<button class=\"layui-btn \" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)-1)+")\">上一页</button>"+
                "<button class=\"layui-btn \" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)+1)+")\">下一页</button>"+
                "<button class=\"layui-btn \" onclick=\"goPage("+result.extend.pageInfo.totalPage+")\">末页</button>";
        }
        if(result.extend.pageInfo.currentPage>1 && result.extend.pageInfo.currentPage==result.extend.pageInfo.totalPage) {
            str="<button class=\"layui-btn \" onclick=\"goPage(1)\">首页</button>"+
                "<button class=\"layui-btn \" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)-1)+")\">上一页</button>"+
                "<button class=\"layui-btn layui-btn-disabled\" >下一页</button>"+
                "<button class=\"layui-btn \" onclick=\"goPage("+result.extend.pageInfo.totalPage+")\">末页</button>";
        }
        $("#page_info_area").append(" <p style=\" color: black; font-size:16px; margin-bottom:10px;\">当前第 "+result.extend.pageInfo.currentPage+"\n" +
            "                页/共 "+result.extend.pageInfo.totalPage+"页</p>").append(str);
    }
    totalRecord = result.extend.pageInfo.totalPage;
    currentPage=result.extend.pageInfo.currentPage;
}
//显示信息
function goPage(pn) {
   // layer.load();
    $.ajax({
        url: getRootPath()+"/student/courseListData",
        data: "pn=" + pn,
        type: "GET",
        success: function (result) {

            //1.解析并显示数据
            build_users_table(result);
            //2.解析并显示分页信息
            build_page_info(result);
            // setTimeout(function(){
            //     layer.closeAll('loading');
            // }, 50);
        }
    })
}
function getRootPath() {
    // 1、获取当前全路径，如： http://localhost:8080/springmvc/page/frame/test.html
    var curWwwPath = window.location.href;
    // 获取当前相对路径： /springmvc/page/frame/test.html
    var pathName = window.location.pathname;    // 获取主机地址,如： http://localhost:8080
    var local = curWwwPath.substring(0,curWwwPath.indexOf(pathName));
    // 获取带"/"的项目名，如：/springmvc
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var rootPath = local + projectName;
    return rootPath;
}
function choose_fun(classId)
{

    $.ajax({
        data:{courseid:classId},
        url:getRootPath()+"/student/chooseSuccess",
        type:"POST",
        success:function (result) {
            layer.msg(result.message, {icon: 1});

            goPage(currentPage);
            layer.closeAll('page');
        },
        error:function () {
            layer.msg("系统繁忙 请稍后重试", {icon: 2});
        }
    })
}
//选课
function detail_fun(classId) {
        var datas ={
            classId:classId
        };
  //  layer.load();
        $.ajax({
            type : 'POST',
            url : getRootPath()+'/student/courseDetail',
            data : datas,
            dataType : 'json',
            success : function(data) {
                if(data.code==100)
                {
                        var str="<div>\n" +
        "        <table class=\"layui-table\" style=\"width:280px; margin:25px 480px 25px;\">\n" +
        "            <colgroup>\n" +
        "                <col width=\"100\">\n" +
        "                <col width=\"180\">\n" +
        "            </colgroup>\n" +
        "            <tbody>\n" +
        "            <tr>\n" +
        "                <td>课程编号</td>\n" +
        "                <td>"+data.extend.course.classId+"</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>课程名称</td>\n" +
        "                <td>"+data.extend.course.className+"</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>教师名称</td>\n" +
        "                <td>"+data.extend.course.teaName+"</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>人数限制</td>\n" +
        "                <td>"+data.extend.course.classNum+"</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>已选人数</td>\n" +
        "                <td>"+data.extend.course.classChooseNum+"</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>学院限制</td>\n" +
        "                <td>\n"+data.extend.course.classLimitInsName.toString()+ "</td>\n" +
        "            </tr>\n" +
        "            </tbody>\n" +
        "        </table>\n" +
        "    </div>\n" +
        "    <div class=\"layui-input-block\" style=\"margin-left:500px;\">\n" +
        "        <button type=\"button\" onclick=\"layer.closeAll('page');\" class=\"layui-btn layui-btn-lg\">\n" +
        "            取消\n" +
        "        </button>\n" +
        "        <button type=\"button\" id=\"success\" onclick=\"choose_fun("+data.extend.course.classId+")\" class=\"layui-btn layui-btn-danger layui-btn-lg\">\n" +
        "            选择\n" +
        "        </button>\n" +
        "    </div>";
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['1183px', '527px'], //宽高
        content: str,
    });
                }
                else
                {
                    layer.msg(data.message, {icon: 2});
                }
            },
            error:function () {
                layer.msg("系统繁忙 请稍后重试", {icon: 2});
            }
        });
}
//退选
function delete_fun(classId) {
    layer.confirm('您确定要退课吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        //确认，发送ajax请求删除
      //  layer.load();
        $.ajax({
            data: {courseid: classId},
            url: getRootPath() + "/student/deleteCourse",
            type: "POST",
            success: function (result) {
                goPage(currentPage);
                layer.msg(result.message, {icon: 1});
               // layer.msg(data.message, {icon: 1});
                // setTimeout(function(){
                //     layer.closeAll('loading');
                // }, 50);

            },
            error: function () {
                layer.msg("系统繁忙 请稍后重试", {icon: 2});
            }
        })
    }, function(){
    });

}
//教师列表
function teaList()
{
    $.ajax({
        data:"",
        url:getRootPath()+"/student/teaList",
        type:"POST",
        success:function (result) {
           if(result.code==100)
           {
               var data=result.extend.teaList;

               for (var i=0;i<data.length;i++)
               {
                   $("#teasearch").append($("<option/>").text(data[i].teaId).attr("value",data[i].teaName));
               }

           }
        },
        error:function () {
            layer.msg("系统繁忙 请稍后重试", {icon: 2});
        }
    })
}
//学院列表
function insList()
{
    $.ajax({
        data:"",
        url:getRootPath()+"/student/insList",
        type:"POST",
        success:function (result) {
            if(result.code==100)
            {
                $("#inssearch").empty();
                var data=result.extend.insList;
                for (var i=0;i<data.length;i++)
                {
                    $("#teasearch").append($("<option/>").text(data[i].insId).attr("value",data[i].insName));
                }
            }
        },
        error:function () {
            layer.msg("系统繁忙 请稍后重试", {icon: 2});
        }
    })
}
