package com.sanxia.controller;

import com.sanxia.po.Student;
import com.sanxia.po.Sysadmin;
import com.sanxia.po.Teacher;
import com.sanxia.service.PersonelMgService;
import com.sanxia.utils.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName PersonelMgController
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/6 22:55
 * @Version 1.0
 */
@Controller
@RequestMapping("/PersonelMg")
public class PersonelMgController {
    @Resource
    private PersonelMgService personelMgService;
    /**
     * @Author Feng.Yang
     * @Description //学生列表
     * @Date 17:40 2019/4/10
     * @Param []
     * @return java.util.List<com.sanxia.po.Student>
     **/
    @RequestMapping("/queryStudentList")
    @ResponseBody
    public  Map<String,Object> queryStudentList(@RequestParam Map<String,Object> queryParams) {
        return personelMgService.queryStudentList(queryParams);
    }
    /**
     * @Author Feng.Yang
     * @Description //学生详细信息
     * @Date 17:41 2019/4/10
     * @Param []
     * @return java.util.List<com.sanxia.po.Student>
     **/
    @RequestMapping("/findStudentInfo")
    @ResponseBody
    public Map<String,Object> findStudentInfo(Student student) {
        return ResultView.getResultView(true,personelMgService.findStudentInfo(student));
    }
    @RequestMapping("/addStudent")
    @ResponseBody
    public Map<String,Object> addStudent(Student student) {
        int i= personelMgService.addStudent(student);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/exitStudent")
    @ResponseBody
    public Map<String,Object> exitStudent(Student student) {
        int i= personelMgService.exitStudent(student);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delStudent")
    @ResponseBody
    public Map<String,Object> delStudent(Student student) {
        int i= personelMgService.delStudent(student);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }

    @RequestMapping("/queryTeacherList")
    @ResponseBody
    public  Map<String,Object> queryTeacherList(@RequestParam Map<String,Object> queryParams) {
        return personelMgService.queryTeacherList(queryParams);
    }

    @RequestMapping("/findTeacherInfo")
    @ResponseBody
    public Map<String, Object> findTeacherInfo(Teacher teacher) {
        return ResultView.getResultView(true,personelMgService.findTeacherInfo(teacher));
    }

    @RequestMapping("/addTeacher")
    @ResponseBody
    public Map<String,Object> addTeacher(Teacher teacher) {
        int i= personelMgService.addTeacher(teacher);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/exitTeacher")
    @ResponseBody
    public Map<String,Object> exitTeacher(Teacher teacher) {
        int i= personelMgService.exitTeacher(teacher);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delTeacher")
    @ResponseBody
    public Map<String,Object> delTeacher(Teacher teacher) {
        int i= personelMgService.delTeacher(teacher);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }

    @RequestMapping("/queryAdminList")
    @ResponseBody
    public Map<String,Object>  queryAdminList(@RequestParam Map<String,Object> queryParams) {
        return personelMgService.queryAdminList(queryParams);
    }

    @RequestMapping("/findAdminInfo")
    @ResponseBody
    public Map<String,Object> findAdminInfo(Sysadmin sysadmin) {
        return ResultView.getResultView(true,personelMgService.findAdminInfo(sysadmin));
    }
    @RequestMapping("/addAdmin")
    @ResponseBody
    public Map<String,Object> addAdmin(Sysadmin sysadmin) {
        int i= personelMgService.addAdmin(sysadmin);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/exitAdmin")
    @ResponseBody
    public Map<String,Object> exitAdmin(Sysadmin sysadmin) {

        int i= personelMgService.exitAdmin(sysadmin);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delAdmin")
    @ResponseBody
    public Map<String,Object> delAdmin(Sysadmin sysadmin) {
        int i= personelMgService.delAdmin(sysadmin);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }
}
