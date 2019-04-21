package com.sanxia.dao;

import com.sanxia.po.EntityCourse;

import java.util.List;
import java.util.Map;

public interface EntityCourseMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(EntityCourse record);

    int insertSelective(EntityCourse record);

    EntityCourse selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EntityCourse record);

    int updateByPrimaryKey(EntityCourse record);

    List<Map<String,Object>> queryEntityCouresList();

    Map<String,Object> findEntityCourseInfo(EntityCourse entityCourse);
}