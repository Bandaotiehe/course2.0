package com.zqb.dao;

import com.zqb.model.Student;
import com.zqb.model.Teacher;

import java.util.List;

public interface UserDao {
    public Student selectStuById(int id);
    public Teacher selectTeaById(int id);
    public void updateStuPass(Student student);
    public void updateTeaPass(Teacher teacher);
    public List<Teacher> queryAllTeacher();
}
