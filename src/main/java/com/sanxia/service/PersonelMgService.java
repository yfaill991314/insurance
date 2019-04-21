package com.sanxia.service;

import com.sanxia.po.Student;
import com.sanxia.po.Sysadmin;
import com.sanxia.po.Teacher;

import java.util.Map;

/**
 * @ClassName PersonelMgService
 * @Description TODO
 * @Author YL
 * @Date 2019/4/6 23:02
 * @Version 1.0
 */
public interface PersonelMgService {
    Map<String, Object> queryStudentList(Map<String, Object> queryParams);

    Map<String, Object> queryTeacherList(Map<String, Object> queryParams);

    Map<String,Object> queryAdminList(Map<String, Object> queryParams);

    Student findStudentInfo(Student student);

    int addStudent(Student student);

    int exitStudent(Student student);

    int delStudent(Student student);

    Teacher findTeacherInfo(Teacher teacher);

    int addTeacher(Teacher teacher);

    int exitTeacher(Teacher teacher);

    int delTeacher(Teacher teacher);

    Sysadmin findAdminInfo(Sysadmin sysAdmin);

    int addAdmin(Sysadmin sysadmin);

    int exitAdmin(Sysadmin sysadmin);

    int delAdmin(Sysadmin sysadmin);
}
