package com.sanxia.controller;

import com.alibaba.fastjson.JSONObject;
import com.sanxia.po.EntityCourse;
import com.sanxia.service.EntityCourseMgService;
import com.sanxia.utils.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @ClassName EntityCourseMgController
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/16 21:18
 * @Version 1.0
 */
@Controller
@RequestMapping("/entityCourse")
public class EntityCourseMgController {

    @Resource
    private EntityCourseMgService entityCourseMgService;

    @RequestMapping("/queryEntityCouList")
    @ResponseBody
    public Map<String,Object> queryEntityCouList(@RequestParam Map<String,Object> queryParams) {
        return entityCourseMgService.queryEntityCouList(queryParams);
    }

    @RequestMapping("/addEntityCourse")
    @ResponseBody
    public Map<String,Object> addEntityCourse(@RequestParam("resultJSON") String resultJSON){
        EntityCourse entityCourse = JSONObject.parseObject(resultJSON,EntityCourse.class);
        int i=entityCourseMgService.addEntityCourse(entityCourse);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/findEntityCourseInfo")
    @ResponseBody
    public  Map<String,Object> findEntityCourseInfo(EntityCourse entityCourse){
        return ResultView.getResultView(true,entityCourseMgService.findEntityCourseInfo(entityCourse));
    }

    @RequestMapping("/exitEntityCourse")
    @ResponseBody
    public Map<String,Object> exitEntityCourse(@RequestParam("resultJSON") String resultJSON) {
        EntityCourse entityCourse = JSONObject.parseObject(resultJSON,EntityCourse.class);
        int i= entityCourseMgService.exitEntityCourse(entityCourse);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delEntityCourse")
    @ResponseBody
    public Map<String,Object> delEntityCourse(EntityCourse entityCourse) {
        int i= entityCourseMgService.delEntityCourse(entityCourse);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }
}
