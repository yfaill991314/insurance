package com.sanxia.service;

import com.sanxia.po.Course;

import java.util.Map;

/**
 * @ClassName CouresMgService
 * @Description TODO
 * @Author YL
 * @Date 2019/4/16 17:44
 * @Version 1.0
 */
public interface CouresMgService {
    Map<String,Object> queryCouresList(Map<String, Object> queryParams);

    Course findCourseInfo(Course course);

    int addCourse(Course course);

    int exitCourse(Course course);

    int delCourse(Course course);
}
