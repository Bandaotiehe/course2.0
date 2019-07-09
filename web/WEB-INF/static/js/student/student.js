//1.页面加载完成之后发送Ajax请求，要到分页数据

$(function () {
});

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
/**
 * 2.实现新增功能
 * @returns {boolean}
 */
//校验表单信息是否满足正则要求
function validate_form(password_ele) {
    //1.拿到要校验的数据，使用正则表达式
    //检验密码
    var password = password_ele.val();
    var regPass = /^[a-zA-Z0-9_-]{6,18}$/;
    if (!regPass.test(password)) {
        show_validate_msg(password_ele, "error", "密码是6-18位英文、数字");
        return false;
    } else {
        show_validate_msg(password_ele, "success", "");
    }
    return true;
}
//显示校验提示信息
function show_validate_msg(ele, status, msg) {
    //清除当前元素校验状态
    $(ele).parent().removeClass("has-error has-success");
    $(ele).next("span").text("");
    if (status == "error") {
        ele.parent().addClass("has-error");
        ele.next("span").text(msg);
    } else if (status == "success") {
        ele.parent().addClass("has-success");
        ele.next("span").text(msg);
    }
}
/**
 * 3.修改密码
 */
function reviseUser() {
    //清除表单数据
    $("#userReviseModal form")[0].reset();
    $("#userName_revise_input").next("span").text("");
    $("#userReviseModal").modal({
        backdrop: "static"
    })
    //2.为模态框中的修改按钮绑定事件，更新信息
    $("#user_revise_btn").click(function () {
      //  alert("dfjsakljf");
        //1.更新之前进行表单验证,验证没通过就直接返回
        if(!validate_form( $("#userPassword"))){
            return false;
        }
        if(!validate_form( $("#newuserPassword"))){
            return false;
        }
        if(!validate_form( $("#renewuserPassword"))){
            return false;
        }
        if($("#newuserPassword").val()===$("#renewuserPassword").val())
        {
            layer.load();
            $.ajax({
                url:getRootPath()+"/student/changeStuPass1",
                type:"POST",
                data:{prepass:$("#userPassword").val(),nowpass:$("#renewuserPassword").val()},
                success:function (result) {
                    layer.msg(result.message, {icon: 1});
                    //1.关闭modal框
                    $("#userReviseModal").modal('hide');
                    setTimeout(function(){
                        layer.closeAll('loading');
                    }, 50);
                }
            })
        }
        else
        {
            show_validate_msg( $("#renewuserPassword"), "error", "两次密码不一致");
        }
    })
}


