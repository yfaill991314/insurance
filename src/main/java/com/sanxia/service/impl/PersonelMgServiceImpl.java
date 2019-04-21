package com.sanxia.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sanxia.dao.*;
import com.sanxia.po.Student;
import com.sanxia.po.Sysadmin;
import com.sanxia.po.Teacher;
import com.sanxia.po.User;
import com.sanxia.service.PersonelMgService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName PersonelMgServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/6 23:02
 * @Version 1.0
 */
@Service
public class PersonelMgServiceImpl implements PersonelMgService {
    @Resource
    private StudentMapper studentMapper;
    @Resource
    private TeacherMapper teacherMapper;
    @Resource
    private SysadminMapper sysadminMapper;
    @Resource
    private SysUtilsMapper sysUtilsMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    public Map<String, Object> queryStudentList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<Student> students = studentMapper.queryStudentList();

        PageInfo<Student> pageInfo = new PageInfo<>(students);
        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", students);
        result.put("total", total);
        return result;
    }

    @Override
    public Student findStudentInfo(Student student) {
        return studentMapper.selectByPrimaryKey(student.getStuNum());
    }

    @Override
    public int addStudent(Student student) {
        String stuUuid = sysUtilsMapper.findUuid();
        String userUuid = sysUtilsMapper.findUuid();
        student.setUuid(stuUuid);
        student.setUserUuid(userUuid);
        studentMapper.insertSelective(student);
        User user = new User();
        user.setUuid(userUuid);
        user.setInfoTableName("student");
        user.setInfoUuid(stuUuid);
        user.setRoleUuid("1385f4a3587711e9b2ad00163e0ed0cd");
        user.setUserName(student.getStuNum().toString());
        user.setUserPsd("123456");

        return userMapper.insertSelective(user);
    }

    @Override
    public int exitStudent(Student student) {
        Student oldStu = studentMapper.selectByPrimaryKey(student.getStuNum());
        if (oldStu != null) {
            return studentMapper.updateByPrimaryKeySelective(student);
        } else {
            return -1;

        }
    }

    @Override
    public int delStudent(Student student) {
        Student oldStu = studentMapper.selectByPrimaryKey(student.getStuNum());
        if (oldStu != null) {
            int i = userMapper.deleteByInfoUuid(oldStu.getUuid());
            return studentMapper.deleteByPrimaryKey(student.getStuNum());
        } else {
            return -1;

        }
    }


    @Override
    public Map<String, Object> queryTeacherList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<Teacher> teachers = teacherMapper.queryTeacherList();

        PageInfo<Teacher> pageInfo = new PageInfo<>(teachers);
        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", teachers);
        result.put("total", total);
        return result;
    }

    @Override
    public Teacher findTeacherInfo(Teacher teacher) {
        return teacherMapper.selectByPrimaryKey(teacher.getTeaNum());
    }

    @Override
    public int addTeacher(Teacher teacher) {
        String teaUuid = sysUtilsMapper.findUuid();
        String userUuid = sysUtilsMapper.findUuid();
        teacher.setUuid(teaUuid);
        teacher.setUserUuid(userUuid);

        teacherMapper.insertSelective(teacher);

        User user = new User();
        user.setUuid(userUuid);
        user.setInfoTableName("teacher");
        user.setInfoUuid(teaUuid);
        user.setRoleUuid("fd22540a587611e9b2ad00163e0ed0cd");
        user.setUserName(teacher.getTeaNum().toString());
        user.setUserPsd("123456");

        return userMapper.insertSelective(user);
    }

    @Override
    public int exitTeacher(Teacher teacher) {
        Teacher oldTea = teacherMapper.selectByPrimaryKey(teacher.getTeaNum());
        if (oldTea != null) {
            return teacherMapper.updateByPrimaryKeySelective(teacher);
        } else {
            return -1;

        }
    }

    @Override
    public int delTeacher(Teacher teacher) {
        Teacher oldTea = teacherMapper.selectByPrimaryKey(teacher.getTeaNum());
        if (oldTea != null) {
            int i = userMapper.deleteByInfoUuid(oldTea.getUuid());
            return teacherMapper.deleteByPrimaryKey(teacher.getTeaNum());
        } else {
            return -1;

        }
    }


    @Override
    public Map<String, Object> queryAdminList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<Sysadmin> sysadmins = sysadminMapper.queryAdminList();

        PageInfo<Sysadmin> pageInfo = new PageInfo<>(sysadmins);
        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", sysadmins);
        result.put("total", total);
        return result;
    }

    @Override
    public Sysadmin findAdminInfo(Sysadmin sysadmin) {
        return sysadminMapper.selectByPrimaryKey(sysadmin.getAdNum());
    }

    @Override
    public int addAdmin(Sysadmin sysadmin) {
        String adminUuid = sysUtilsMapper.findUuid();
        String userUuid = sysUtilsMapper.findUuid();

        sysadmin.setUuid(adminUuid);
        sysadmin.setUserUuid(userUuid);

        sysadminMapper.insertSelective(sysadmin);

        User user = new User();
        user.setUuid(userUuid);
        user.setInfoTableName("sysadmin");
        user.setInfoUuid(adminUuid);
        user.setRoleUuid("2237b983587711e9b2ad00163e0ed0cd");
        user.setUserName(sysadmin.getAdNum().toString());
        user.setUserPsd("123456");


        return userMapper.insertSelective(user);
    }

    @Override
    public int exitAdmin(Sysadmin sysadmin) {
        Sysadmin oldAdmin = sysadminMapper.selectByPrimaryKey(sysadmin.getAdNum());
        if (oldAdmin != null) {
            return sysadminMapper.updateByPrimaryKeySelective(sysadmin);
        } else {
            return -1;

        }
    }

    @Override
    public int delAdmin(Sysadmin sysadmin) {
        Sysadmin oldAdmin = sysadminMapper.selectByPrimaryKey(sysadmin.getAdNum());
        if (oldAdmin != null) {
            int i = userMapper.deleteByInfoUuid(oldAdmin.getUuid());
            return sysadminMapper.deleteByPrimaryKey(sysadmin.getAdNum());
        } else {
            return -1;

        }
    }


}
