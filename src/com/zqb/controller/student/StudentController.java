package com.zqb.controller.student;
import com.zqb.common.Msg;
import com.zqb.model.Course;
import com.zqb.model.Page;
import com.zqb.model.Student;
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
import java.util.List;

@Controller
@RequestMapping("student")
public class StudentController {
    @Resource
    private UserService userService;
    @Resource
    private PageService pageService;
    @Resource
    private CourseService courseService;

    @RequestMapping("/studentIndex")
    public String studentIndex(){
        return "student/studentIndex";
    }

    @RequestMapping("/studentInfo")
    public String studentInfo(@RequestParam("stuid") int id, Model model){
        model.addAttribute("student",userService.getStuInfoById(id));
        return "student/studentInfo";
    }
    @RequestMapping("/editStuPass")
    public String editTeaPass(){
        return "student/editStuPass";
    }
    @RequestMapping("/courseList")
    public String courseList(@Param("page") int page, Model model,HttpServletRequest request){
        return "student/courseList";
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

    @ResponseBody
    @RequestMapping("/changeStuPass1")
    public Msg changPass1(@RequestParam("prepass") String prepass, @RequestParam("nowpass") String nowpass, Model model, HttpServletRequest request){
        System.out.println(prepass);
        int id=(int)request.getSession().getAttribute("stuid");
        if(userService.checkAccount(id,prepass)==0){
            return Msg.fail("原始密码输入错误!");
        }
        else{
            Student student=new Student();
            student.setStuId(id);
            student.setStuPass(nowpass);
            userService.changeStuPass(student);
            return Msg.sucess("修改成功").add("student",userService.getStuInfoById(id));
        }
    }
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
            return Msg.sucess("修改成功");
        }
    }


    @RequestMapping(value = "/checkedCourseListData",method = RequestMethod.GET)
    @ResponseBody
    public Msg checkedCourseListData(@RequestParam(value = "pn",defaultValue="1")Integer pn,Model model,HttpServletRequest request){

        System.out.println((int)request.getSession().getAttribute("stuid"));

        Page p= pageService.subList(pn,courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
        //   model.addAttribute("courseList",courseService.queryStuCourse((int)request.getSession().getAttribute("stuid")));
        // return "student/checkedCourseList";
        //这是一个分页查询
        //引入PageHelp分页插件
        //在查询之前只需要调用，传入页码，以及每页的大小
        // PageHelper.startPage(pn,2);
        //startPage后面紧跟的查询就是分页查询
        List<Course> courseList= courseService.queryStuCourse((int)request.getSession().getAttribute("stuid"));
        //使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
        //封装了详细的分页信息,传入连续显示的页数
        // PageInfo pageInfo=new PageInfo(courseList,5);
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
    @RequestMapping(value = "/courseListData",method = RequestMethod.GET)
    public Msg courseList(@RequestParam(value = "pn",defaultValue="1")Integer pn, Model model,HttpServletRequest request){
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
    }

}
