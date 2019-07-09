package com.zqb.controller.common;

import com.zqb.common.Msg;
import com.zqb.model.Page;
import com.zqb.model.Student;
import com.zqb.model.Teacher;
import com.zqb.service.CourseService;
import com.zqb.service.PageService;
import com.zqb.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Controller
@RequestMapping("test")
public class TestController {
        @Resource
        private UserService userService;
    @Resource
    private PageService pageService;
    @Resource
    private CourseService courseService;

        @RequestMapping(value = "/changeStuPass",method=RequestMethod.POST)
        @ResponseBody
        public Msg changPass(@RequestParam("prepass") String prepass, @RequestParam("nowpass") String nowpass, Model model, HttpServletRequest request){
            System.out.println(prepass);
            System.out.println(nowpass);
            int id=(int)request.getSession().getAttribute("stuid");
            if(userService.checkAccount(id,prepass)==0){
                model.addAttribute("msg","原始密码输入错误!");
                return Msg.fail("原始密码输入错误!");
            }
            else{
                Student student=new Student();
                student.setStuId(id);
                student.setStuPass(nowpass);
                userService.changeStuPass(student);
                model.addAttribute("student",userService.getStuInfoById(id));
               // return "student/studentInfo";
                return Msg.sucess("修改成功");
            }
            //return new Msg();
        }
    @RequestMapping(value = "/courseDetail",method = RequestMethod.POST)
    @ResponseBody
    public Msg courseDetail(@Param("classId") int classId, Model model, HttpServletRequest request) {
        if (courseService.checkStuIns(classId, (int) request.getSession().getAttribute("stuid"))) {
            return Msg.sucess("OK").add("course",  courseService.queryCourse(classId));
        } else {
            return Msg.fail("请注意课程的学院限制");
        }
    }
    @RequestMapping(value = "/checkedCourseList",method = RequestMethod.GET)
    @ResponseBody
    public Msg checkedCourseList(@RequestParam(value = "pn",defaultValue="1")Integer pn,Model model,HttpServletRequest request){
     Page p= pageService.subList(pn,courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
        return Msg.sucess("ok").add("pageInfo",p);
    }
       //退选
    @RequestMapping(value = "/deleteCourse",method = RequestMethod.POST)
    @ResponseBody
    public Msg deleteCourse(@Param("courseid") int courseid,Model model,HttpServletRequest request){
        courseService.deleteCourseChoose((int)request.getSession().getAttribute("stuid"),courseid);
       return Msg.sucess("退选成功");
    }
    //课程数据
    @ResponseBody
    @RequestMapping(value = "/courseList",method = RequestMethod.GET)
    public Msg courseList(@RequestParam(value = "pn",defaultValue="1")Integer pn, Model model,HttpServletRequest request){
        //   model.addAttribute("courseList",courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
        // return "student/checkedCourseList";
        //这是一个分页查询
        //引入PageHelp分页插件
        //在查询之前只需要调用，传入页码，以及每页的大小
        // PageHelper.startPage(pn,2);
        //startPage后面紧跟的查询就是分页查询
        //Page p= pageService.subList(page,courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
//        //使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
        //封装了详细的分页信息,传入连续显示的页数
        // PageInfo pageInfo=new PageInfo(courseList,5);
        return Msg.sucess("ok").add("pageInfo",pageService.subList(pn,courseService.queryAllCourse((int)request.getSession().getAttribute("stuid"))));
    }
    //课程选择
    @ResponseBody
    @RequestMapping(value = "/chooseSuccess",method = RequestMethod.POST)
    public Msg chooseSuccess(@Param("courseid") int courseid,Model model,HttpServletRequest request){
        courseService.chooseSuccess(courseid,(int)request.getSession().getAttribute("stuid"));
        return Msg.sucess("选择成功");
    }
    //学院列表
    @ResponseBody
    @RequestMapping(value = "/insList",method = RequestMethod.POST)
    public Msg insList(Model model,HttpServletRequest request){
        return Msg.sucess("查询成功").add("insList",courseService.queryAllIns());
    }
    //教师列表
    @ResponseBody
    @RequestMapping(value = "/teaList",method = RequestMethod.POST)
    public Msg teaList(Model model,HttpServletRequest request){
        return Msg.sucess("查询成功").add("teaList",userService.queryAllTeacher());
    }



    @ResponseBody
    @RequestMapping(value = "/teachCourseList",method = RequestMethod.GET)
    public Msg teachCourseList(@RequestParam(value = "pn",defaultValue="1")Integer pn, Model model,HttpServletRequest request){
        //   model.addAttribute("courseList",courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
        // return "student/checkedCourseList";
        //这是一个分页查询
        //引入PageHelp分页插件
        //在查询之前只需要调用，传入页码，以及每页的大小
        // PageHelper.startPage(pn,2);
        //startPage后面紧跟的查询就是分页查询
        //Page p= pageService.subList(page,courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
        //使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
        //封装了详细的分页信息,传入连续显示的页数
        // PageInfo pageInfo=new PageInfo(courseList,5);
        return Msg.sucess("ok").add("pageInfo",pageService.subList(pn,courseService.queryAllById((int)request.getSession().getAttribute("teaid"))));
        //model.addAttribute("paging",pageService.subList(page,courseService.queryAllCourse((int)request.getSession().getAttribute("stuid"))));
        //model.addAttribute("teaList",userService.queryAllTeacher());
        //model.addAttribute("insList",courseService.queryAllIns());

    }

    @ResponseBody
    @RequestMapping( value = "/changeTeaPass",method = RequestMethod.POST)
    public Msg changChPass(@RequestParam("prepass") String prepass, @RequestParam("nowpass") String nowpass, Model model, HttpServletRequest request){
        int id=(int)request.getSession().getAttribute("teaid");
        if(userService.checkAccount(id,prepass)==0){
            return Msg.sucess("原始密码输入错误!");
        }
        else{
            Teacher teacher=new Teacher();
            teacher.setTeaId(id);
            teacher.setTeaPass(nowpass);
            userService.changeTeaPass(teacher);
         return Msg.sucess("修改成功").add("teacher",userService.getTeaInfoById(id));
        }
    }
    @RequestMapping(value = "/deleteTeachCourse",method = RequestMethod.POST)
    @ResponseBody
    public Msg deleteTeachCourse(@Param("courseid") int courseid,Model model,HttpServletRequest request){
       try{
           courseService.deleteCourse(courseid);
           return Msg.sucess("删除成功");
       }
       catch (Exception ex)
       {
           System.out.println(ex.toString());
           return Msg.sucess("删除失败");
       }

    }


    @ResponseBody
    @RequestMapping(value = "/checkIns",method=RequestMethod.POST)
    public Msg checkIns(@Param("courseid") int courseid, Model model){
        return Msg.sucess("ok").add("checkIns",courseService.selectCourseLimit(courseid));
    }

    @ResponseBody
    @RequestMapping(value = "/updateCourseSuccess",method = RequestMethod.POST)
    public Msg updateCourseSuccess(@Param("content") String content, Model model, HttpServletRequest request)throws UnsupportedEncodingException {
         try {
             System.out.println(content);
             String[] det= URLDecoder.decode(URLDecoder.decode(content,"utf-8"),"utf-8").split("\\|");
             System.out.println(det.toString());
             System.out.println(det[0]+" "+det[1]+" "+det[2]);
             int courseId=courseService.updateCourse(det[0],det[1],(int)request.getSession().getAttribute("teaid"));
             System.out.println(det[2]);
             courseService.updateInsLimit(det[2],courseId);
             return Msg.sucess("修改成功");
         }

           catch (Exception ex)
        {
            System.out.println(ex.toString());
            return Msg.sucess("修改失败");
        }

    }
    @ResponseBody
    @RequestMapping(value = "/insertCourseSuccess",method = RequestMethod.POST)
    public Msg insertCourseSuccess(@Param("content") String content, Model model, HttpServletRequest request)throws UnsupportedEncodingException{
            try {
            System.out.println(content);
            String[] det= URLDecoder.decode(URLDecoder.decode(content,"utf-8"),"utf-8").split("\\|");
            //获取插入后的课程编号
            System.out.println(det.toString());
            int courseId=courseService.insertCourse(det[0],det[1],(int)request.getSession().getAttribute("teaid"));
            courseService.insertInsLimit(det[2],courseId);
            return Msg.sucess("添加成功");
        }
        catch (Exception ex)
        {
            System.out.println(ex.toString());
            return Msg.sucess("添加失败");
        }

    }
}
