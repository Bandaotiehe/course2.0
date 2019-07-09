package com.zqb.service;

import com.zqb.model.Student;
import com.zqb.model.Teacher;

import java.util.List;

public interface UserService {
    public int checkAccount(int id, String pass);
    public String getStuNameById(int id);
    public String getTeaNameById(int id);
    public Student getStuInfoById(int id);
    public Teacher getTeaInfoById(int id);
    public void changeStuPass(Student student);
    public void changeTeaPass(Teacher teacher);
    public List<Teacher> queryAllTeacher();
}
