package com.zqb.controller.teacher;

import com.zqb.common.Msg;
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
@RequestMapping("teacher")
public class TeacherController {
    @Resource
    private UserService userService;
    @Resource
    private CourseService courseService;
    @Resource
    private PageService pageService;

    @RequestMapping("/teacherIndex")
    public String studentIndex(){
        return "teacher/teacherIndex";
    }

    @RequestMapping("/teacherInfo")
    public String studentInfo(@RequestParam("teaid") int id, Model model){
        model.addAttribute("teacher",userService.getTeaInfoById(id));
        return "teacher/teacherInfo";
    }
    @RequestMapping("/courseList")
    public String courseList(@Param("page") int page, Model model,HttpServletRequest request){
        model.addAttribute("paging",pageService.subList(page,courseService.queryAllById((int)request.getSession().getAttribute("teaid"))));
        return "teacher/courseList";
    }

    @RequestMapping("/insertCourse")
    public String insertCourse(Model model){
        model.addAttribute("insList",courseService.queryAllIns());
        return "teacher/insertCourse";
    }

    @RequestMapping("/editCourse")
    public String editCourse(@Param("courseid") int courseid, Model model){
        model.addAttribute("courseInfo",courseService.queryInfoById(courseid));
        model.addAttribute("checkIns",courseService.selectCourseLimit(courseid));
        model.addAttribute("insList",courseService.queryAllIns());
        return "teacher/editCourse";
    }

    @RequestMapping("/insertCourseSuccess")
    public String insertCourseSuccess(@Param("content") String content,@Param("page") int page, Model model, HttpServletRequest request)throws UnsupportedEncodingException{
        String[] det= URLDecoder.decode(URLDecoder.decode(content,"utf-8"),"utf-8").split("\\|");
        //获取插入后的课程编号
        int courseId=courseService.insertCourse(det[0],det[1],(int)request.getSession().getAttribute("teaid"));
        courseService.insertInsLimit(det[2],courseId);
        model.addAttribute("paging",pageService.subList(page,courseService.queryAllById((int)request.getSession().getAttribute("teaid"))));
        return "teacher/courseList";
    }

    @RequestMapping("/updateCourseSuccess")
    public String updateCourseSuccess(@Param("content") String content,@Param("page") int page, Model model, HttpServletRequest request)throws UnsupportedEncodingException{
        String[] det= URLDecoder.decode(URLDecoder.decode(content,"utf-8"),"utf-8").split("\\|");
        System.out.println(det[0]+" "+det[1]+" "+det[2]);
        int courseId=courseService.updateCourse(det[0],det[1],(int)request.getSession().getAttribute("teaid"));
        System.out.println(det[2]);
        courseService.updateInsLimit(det[2],courseId);
        model.addAttribute("paging",pageService.subList(page,courseService.queryAllById((int)request.getSession().getAttribute("teaid"))));
        return "teacher/courseList";
    }

    @RequestMapping("/deleteCourse")
    public String deleteCourse(@Param("courseid") int courseid, Model model,HttpServletRequest request){
        courseService.deleteCourse(courseid);
        model.addAttribute("paging",pageService.subList(1,courseService.queryAllById((int)request.getSession().getAttribute("teaid"))));
        return "teacher/courseList";
    }

    @RequestMapping("/detailCourse")
    public String detailCourse(@Param("courseid") int courseid,@Param("page") int page, Model model,HttpServletRequest request){
        model.addAttribute("paging",pageService.subList(page,courseService.queryStuByCourseId(courseid)));
        return "teacher/courseDetail";
    }

    @RequestMapping("/updateScore")
    public String updateScore(@Param("courseid") int courseid,@Param("stuId") int stuId,@Param("score") int score,@Param("page") Integer page,Model model){
        courseService.updateScore(courseid,stuId,score);
        model.addAttribute("paging",pageService.subList(page,courseService.queryStuByCourseId(courseid)));
        return "teacher/courseDetail";
    }

    @RequestMapping("/searchStu")
    public String searchStu(@Param("stuid") int stuid, @Param("courseid") int courseid, Model model){
        int page=1;
        model.addAttribute("paging",pageService.subList(page,courseService.queryStuByStuId(courseid,stuid)));
        return "teacher/courseDetail";
    }

    @RequestMapping("/deleteStuCourse")
    public String deleteStuCourse(@Param("stuid") int stuid,@Param("courseid") int courseid,Model model){
        courseService.deleteCourseChoose(stuid,courseid);
        model.addAttribute("paging",pageService.subList(1,courseService.queryStuByCourseId(courseid)));
        return "teacher/courseDetail";
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
        courseService.deleteCourse(courseid);
        return Msg.sucess("删除成功");
    }


    @ResponseBody
    @RequestMapping(value = "/checkIns",method=RequestMethod.POST)
    public Msg checkIns(@Param("courseid") int courseid, Model model){
        return Msg.sucess("ok").add("checkIns",courseService.selectCourseLimit(courseid));
    }
}
