//1.页面加载完成之后发送Ajax请求，要到分页数据
var totalRecord,currentPage;
$(function () {
    to_page(1);
     deleteda();
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
    //显示员工信息
    function to_page(pn) {
        $.ajax({
            url: getRootPath()+"/test/checkedCourseList",
            data: "pn=" + pn,
            type: "GET",
            success: function (result) {
                //1.解析并显示数据
                build_users_table(result);
                //2.解析并显示分页信息
                build_page_info(result);
                //3.解析并显示分页条数据
                build_page_nav(result);

            }
        })
    }
    //解析并显示数据表
    function build_users_table(result) {
        //清空table表格
        $("#users_table tbody").empty();
        var users = result.extend.pageInfo.dataList;

        //遍历元素users
        $.each(users, function (index, item) {
            var classId = $("<td></td>").append(item.classId);
            var className = $("<td></td>").append(item.className);
            var teaName = $("<td></td>").append(item.teaName);
            var classNum = $("<td></td>").append(item.classNum);
            var classChooseNum = $("<td></td>").append(item.classChooseNum);
            var score = $("<td></td>").append(item.score);
            var button2 = $("<button></button>").addClass("tn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("退课");
            var td_btn = $("<td></td>").append(" ").append(button2);
             $("<tr></tr>").append(classId).append(className).append(teaName).append(classNum).append(classChooseNum)
                 .append(score).append(td_btn).appendTo("#users_table tbody");

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
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)-1)+")\">上一页</button>"+
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)+1)+")\">下一页</button>"+
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+result.extend.pageInfo.totalPage+")\">末页</button>";
            }
            if(result.extend.pageInfo.totalPage==1 && result.extend.pageInfo.currentPage==1)
            {
                str="<button class=\"layui-btn \" onclick=\"goPage(1)\">首页</button>"+
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)-1)+")\">上一页</button>"+
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)+1)+")\">下一页</button>"+
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+result.extend.pageInfo.totalPage+")\">末页</button>";
            }
            if(result.extend.pageInfo.totalPage>1 && result.extend.pageInfo.currentPage==1)
            {
                str="<button class=\"layui-btn\" onclick=\"goPage(1)\">首页</button>"+
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)-1)+")\">上一页</button>"+
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
                    "<button class=\"layui-btn layui-btn-disabled\" onclick=\"goPage("+(parseInt(result.extend.pageInfo.currentPage)+1)+")\">下一页</button>"+
                    "<button class=\"layui-btn \" onclick=\"goPage("+result.extend.pageInfo.totalPage+")\">末页</button>";
            }
            $("#page_info_area").append(" <p style=\" color: black; font-size:16px; margin-bottom:10px;\">当前第 "+result.extend.pageInfo.currentPage+"\n" +
                "                页/共 "+result.extend.pageInfo.totalPage+"页</p>").append(str);
        }
        totalRecord = result.extend.pageInfo.totalPage;
        currentPage=result.extend.pageInfo.currentPage;
    }
//解析显示分页导航条
    function build_page_nav(result) {
        $("#page_nav_area").empty();
        var ul = $("<ul></ul>>").addClass("pagination");
        var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
        var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;").attr("href", "#"));
        var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;").attr("href", "#"));
        var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"));
        //如果没有前一页，前一页和首页就不能点
        if (result.extend.pageInfo.hasPreviousPage == false) {
            firstPageLi.addClass("disabled");
            prePageLi.addClass("disabled");
        } else {
            //首页
            firstPageLi.click(function () {
                to_page(1);
            });
            prePageLi.click(function () {
                to_page(result.extend.pageInfo.pageNum - 1);
            });
        }
        if (result.extend.pageInfo.hasNextPage == false) {
            nextPageLi.addClass("disabled");
            lastPageLi.addClass("disabled");
        } else {
            //构建点击事件

            nextPageLi.click(function () {
                to_page(result.extend.pageInfo.pageNum + 1);
            });
            lastPageLi.click(function () {
                to_page(result.extend.pageInfo.lastPage);
            })
        }
        //添加首页和前一页
        ul.append(firstPageLi).append(prePageLi);
        //遍历添加页码
        $.each(result.extend.pageInfo.navigatepageNums, function (index, item) {
            var numLi = $("<li></li>").append($("<a></a>").append(item).attr("href", "#"));
            //如果是当前选中页面，添加active标识
            if (result.extend.pageInfo.pageNum == item) {
                numLi.addClass("active");
            }
            //给每个页码添加点击就跳转
            numLi.click(function () {
                to_page(item);
            });
            ul.append(numLi);
        });
        //添加下一页和末页
        ul.append(nextPageLi).append(lastPageLi);
        var navEle = $("<nav></nav>").append(ul);
        navEle.appendTo("#page_nav_area");
    }
    /**
     * 4.删除选课
     */
    function deleteda() {
        $(document).on("click",".delete_btn",function () {
            //1.弹出确认删除对话框
          //  var username=$(this).parents("tr").find("td:eq(2)").text();
            var className=$(this).parents("tr").find("td:eq(1)").text();
            var classId=$(this).parents("tr").find("td:eq(0)").text();
            if(confirm("确认退选【"+className+"】吗？")){
                //确认，发送ajax请求删除
                $.ajax({
                    data:{courseid:classId},
                    url:getRootPath()+"/test/deleteCourse",
                    type:"POST",
                    success:function (result) {
                        alert(result.message);
                        to_page(currentPage);
                    }
                })

            }
        })
    }
});