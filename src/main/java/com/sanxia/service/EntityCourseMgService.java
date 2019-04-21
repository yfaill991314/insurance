package com.sanxia.service;

import com.sanxia.po.EntityCourse;

import java.util.Map;

/**
 * @ClassName EntityCourseMgService
 * @Description TODO
 * @Author YL
 * @Date 2019/4/16 21:20
 * @Version 1.0
 */
public interface EntityCourseMgService {
    Map<String,Object> queryEntityCouList(Map<String, Object> queryParams);

    int addEntityCourse(EntityCourse entityCourse);

    Map<String,Object> findEntityCourseInfo(EntityCourse entityCourse);

    int exitEntityCourse(EntityCourse entityCourse);

    int delEntityCourse(EntityCourse entityCourse);
}
