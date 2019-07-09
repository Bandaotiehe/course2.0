//1.页面加载完成之后发送Ajax请求，要到分页数据
var totalRecord,currentPage;
$(function () {
    //显示第一页
    goPage(1);
});
//删除课程
function deleteCourse(classId) {
    layer.confirm('您确定要删除吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
       // layer.load();
        //确认，发送ajax请求删除
        $.ajax({
            data:{courseid:classId},
            url:getRootPath()+"/teacher/deleteTeachCourse",
            type:"POST",
            success:function (result) {
                layer.msg(result.message, {icon: 1});
                // setTimeout(function(){
                //     layer.closeAll('loading');
                // }, 50);
                goPage(currentPage);
            },
            error:function () {
                layer.msg("系统繁忙 请稍后重试", {icon: 2});
            }
        })
    }, function(){
    });
}
//解析并显示数据表
function build_users_table(result) {
    //清空table表格
    $("#course_table tbody").empty();
    var users = result.extend.pageInfo.dataList;

    //遍历元素users
    $.each(users, function (index, item) {
        var classId = $("<td></td>").append(item.classId);
        var className = $("<td></td>").append(item.className);
        var classNum = $("<td></td>").append(item.classNum);
        var classChooseNum = $("<td></td>").append(item.classChooseNum);
        var classLimitInsName= $("<td></td>").append(item.classLimitInsName.toString());
        var  button1=" <button class=\"layui-btn edit_btn\" onclick=\"edit("+item.classId+")\" \n" +
            "                                   >修改\n" +
            "                            </button>"
        var  button2=" <button class=\"layui-btn delete_btn\" onclick=\"deleteCourse("+item.classId+")\" \n" +
            "                                  >删除\n" +
            "                            </button>"
        var  button3=" <button class=\"layui-btn\" onclick=\"detail_fun("+item.classId+")\" \n" +
            "                                   >管理\n" +
            "                            </button>"

        var td_btn = $("<td></td>").append(" ").append(button1).append(button2).append(button3);
        $("<tr></tr>").append(classId).append(className).append(classNum).append(classChooseNum)
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
    layer.load();
    $.ajax({
        url: getRootPath()+"/teacher/teachCourseList",
        data: "pn=" + pn,
        type: "GET",
        success: function (result) {

            //1.解析并显示数据
            build_users_table(result);
            //2.解析并显示分页信息
            build_page_info(result);
            //3.解析并显示分页条数据
            // build_page_nav(result);
//此处演示关闭
            setTimeout(function(){
                layer.closeAll('loading');
            }, 50);
        }
    })
}

function getRootPath() {
    // 1、获取当前全路径，如： http://localhost:8080/springmvc/page/frame/test.html
    var curWwwPath = window.location.href;
    // 获取当前相对路径： /springmvc/page/frame/teacher.html
    var pathName = window.location.pathname;    // 获取主机地址,如： http://localhost:8080
    var local = curWwwPath.substring(0,curWwwPath.indexOf(pathName));
    // 获取带"/"的项目名，如：/springmvc
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var rootPath = local + projectName;
    return rootPath;
}

//修改
function edit(classId) {
    //layer.load();
    window.location.href=getRootPath()+"/teacher/editCourse?courseid="+classId;
    setTimeout(function(){
        layer.closeAll('loading');
    }, 50);
}
//管理
function detail_fun(classId) {
   // layer.load();
    window.location.href=getRootPath()+"/teacher/detailCourse?courseid="+classId+"&page="+1;
    setTimeout(function(){
        layer.closeAll('loading');
    }, 50);
}
/**
 * 3.失败代码
 function detail_fun(classId) {
        var datas ={
            classId:classId
        };
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
                    alert(data.message);
                }
            },
            error:function () {
                alert("系统繁忙 请稍后重试");
            }
        });

//获取学院列表
// function insList()
// {
//     var  str="<div id='a'>";
//     var  str1="<div id='b'>";
//     $.ajax({
//         data:"",
//         url:getRootPath()+"/teacher/insList",
//         type:"POST",
//         success:function (result) {
//             if(result.code==100)
//             {
//                 $.each(result.extend.insList, function (index, item1) {
//                     str+= "<label class=\"checkbox-inline\">\n" + "<input type=\"checkbox\" name=\"updateins\" value="+item1.insId+" title="+item1.insName+">"+item1.insName+"</label>";
//                 str1+= "<label class=\"checkbox-inline\">\n" + "<input type=\"checkbox\" name=\"insert_ins\" value="+item1.insId+" title="+item1.insName+">"+item1.insName+"</label>";})
//             }
//             $("#a").remove();
//             $("#b").remove();
//           $("#updatediv").append(str+"</div>");
//           $("#insertdiv").append(str1+"</div>");
//         },
//         error:function () {
//             alert("系统繁忙 请稍后重试");
//         }
//     })
// //    alert(str);
//   //  alert(str);
//     return str;
// }
// function updataCourse() {
//     //为编辑按钮绑定弹出modal框事件
//     //1.因为在按钮创建之前就绑定了click，所以用普通click方法绑定不上
//     //添加学院信息
//     insList();
//     $(document).on("click",".edit_btn",function () {
//         //清除表单数据
//         $("#courseReviseModal form")[0].reset();
//         $("#courseName_revise_input").next("span").text("");
//
//         //修改框中用户信息回显
//         var id= $(this).parent().parent().children("td").eq(0).text();
//     //    var check=checkinsList(id);
//         //将id的值传递给修改按钮的属性，方便发送Ajax请求
//         $("#course_revise_btn").attr("edit-id",id);
//         var name=$(this).parent().parent().children("td").eq(1).text();
//         var num=$(this).parent().parent().children("td").eq(2).text();
//         $("#name").val(name);
//         $("#num").val(num);
//         $("#courseReviseModal").modal({
//             backdrop: "static"
//         })
//     });
//     //2.为模态框中的修改按钮绑定事件，更新课程信息
//     $("#course_revise_btn").click(function () {
//         var name = $("#name").val();
//         var num = $("#num").val();
//         var ins = "";
//         var count=0;
//         $("input[name='updateins']:checked").each(function () {
//             count++;
//             if (count === 1) {
//                 ins = ins + $(this).attr("value");
//             }
//             else {
//                 ins = ins + "," + $(this).attr("value");
//             }
//         })
//         if(typeof ins == "undefined" || ins == null || ins == ""){
//             alert("学院限制不能为空")
//         }
//         else
//         {
//             var content=name+"|"+num+"|"+ins;
//
//             $.ajax({
//                 url:getRootPath()+"/teacher/updateCourseSuccess",
//                 type:"POST",
//                 data:{content:content},
//                 success:function (result) {
//                     alert(result.message);
//                     //1.关闭modal框
//                     $("#courseReviseModal").modal('hide');
//                     //2.来到当前页，显示刚才保存的数据
//                     goPage(currentPage);
//                 }
//             })
//
//         }
//     })
// }
// function insertCourse() {
//     //为编辑按钮绑定弹出modal框事件
//     //1.因为在按钮创建之前就绑定了click，所以用普通click方法绑定不上
//     $(document).on("click",".insert_btn",function () {
//         //清除表单数据
//         $("#addcourseReviseModal form")[0].reset();
//         $("#adduserName_revise_input").next("span").text("");
//         //添加学院信息
//         insList();
//         $("#addcourseReviseModal").modal({
//             backdrop: "static"
//         })
//     });
//     //2.为模态框中的修改按钮绑定事件，更新课程信息
//     $("#addcourse_revise_btn").click(function () {
//         var name = $("#addname").val();
//         var num = $("#addnum").val();
//         var ins = "";
//         var count=0;
//         $("input[name='insert_ins']:checked").each(function () {
//             count++;
//             if (count === 1) {
//                 ins = ins + $(this).attr("value");
//             }
//             else {
//                 ins = ins + "," + $(this).attr("value");
//             }
//         })
//         if(typeof ins == "undefined" || ins == null || ins == ""){
//             alert("学院限制不能为空");
//         }
//         else
//         {
//             var content=name+"|"+num+"|"+ins;
//             $.ajax({
//                 url:getRootPath()+"/teacher/insertCourseSuccess",
//                 type:"POST",
//                 data:{content:content},
//                 success:function (result) {
//                     alert(result.message);
//                     //1.关闭modal框
//                     $("#addcourseReviseModal").modal('hide');
//                     //2.来到当前页，显示刚才保存的数据
//                     goPage(currentPage);
//                 }
//             })
//
//         }
//     })
// }
// // //学院限制
// // function checkinsList(courseid)
// // {
// //     var  str="";
// //     $.ajax({
// //         data:"",
// //         url:getRootPath()+"/test/insList",
// //         type:"POST",
// //         success:function (result1) {
// //             if(result.code==100)
// //             {
// //                 $.each(result1.extend.insList, function (index, item1) {
// //                     str+=  "<input type=\"checkbox\" name=\"ins\" value="+item1.insId+" title="+item1.insName;
// //                     $.ajax({
// //                         data:{courseid:courseid},
// //                         url:getRootPath()+"/test/checkIns",
// //                         type:"POST",
// //                         success:function (result2) {
// //                             if(result.code==100)
// //                             {
// //                                 $.each(result2.extend.checkIns, function (index, item2) {
// //                                     if(item==item1.insId)
// //                                     {
// //                                         str+="checked";
// //                                     }
// //                                     str+=">"
// //                                 })
// //                             }
// //                         },
// //                         error:function () {
// //                             alert("系统繁忙 请稍后重试");
// //                         }
// //                     })
// //
// //
// //
// //
// //
// //                 })
// //
// //             }
// //         },
// //         error:function () {
// //             alert("系统繁忙 请稍后重试");
// //         }
// //     })
// //
// //
// //
// //  return str;
// //
// //
// //
// // }
 */