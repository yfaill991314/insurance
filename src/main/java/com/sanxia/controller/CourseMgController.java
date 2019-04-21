package com.sanxia.controller;

import com.sanxia.po.Course;
import com.sanxia.po.Student;
import com.sanxia.service.CouresMgService;
import com.sanxia.utils.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @ClassName CouresMgController
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/16 17:42
 * @Version 1.0
 */
@Controller
@RequestMapping("/coursemg")
public class CourseMgController {

    @Resource
    private CouresMgService couresMgService;

    @RequestMapping("/queryCourseList")
    @ResponseBody
    public Map<String,Object> queryCouresList(@RequestParam Map<String,Object> queryParams) {
        return couresMgService.queryCouresList(queryParams);
    }

    @RequestMapping("/findCourseInfo")
    @ResponseBody
    public Map<String,Object> findCourseInfo(Course course) {
        return ResultView.getResultView(true,couresMgService.findCourseInfo(course));
    }

    @RequestMapping("/addCourse")
    @ResponseBody
    public Map<String,Object> addCourse(Course course) {
        int i= couresMgService.addCourse(course);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/exitCourse")
    @ResponseBody
    public Map<String,Object> exitCourse(Course course) {
        int i= couresMgService.exitCourse(course);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delCourse")
    @ResponseBody
    public Map<String,Object> delCourse(Course course) {
        int i= couresMgService.delCourse(course);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }
}
