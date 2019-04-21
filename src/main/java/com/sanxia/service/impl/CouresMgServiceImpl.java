package com.sanxia.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sanxia.dao.CourseMapper;
import com.sanxia.dao.SysUtilsMapper;
import com.sanxia.po.Course;
import com.sanxia.po.Student;
import com.sanxia.service.CouresMgService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName CouresMgServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/16 17:46
 * @Version 1.0
 */
@Service
public class CouresMgServiceImpl implements CouresMgService {

    @Resource
    private CourseMapper courseMapper;
    @Resource
    private SysUtilsMapper sysUtilsMapper;

    @Override
    public Map<String, Object> queryCouresList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<Course> courses = courseMapper.queryCouresList();

        PageInfo<Course> pageInfo = new PageInfo<>(courses);
        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", courses);
        result.put("total", total);
        return result;
    }

    @Override
    public Course findCourseInfo(Course course) {
        return courseMapper.selectByPrimaryKey(course.getId());
    }

    @Override
    public int addCourse(Course course) {
        String courseUuid = sysUtilsMapper.findUuid();
        course.setUuid(courseUuid);
        return courseMapper.insertSelective(course);
    }

    @Override
    public int exitCourse(Course course) {
        Course oldCourse = courseMapper.selectByPrimaryKey(course.getId());
        if (oldCourse != null) {
            return courseMapper.updateByPrimaryKeySelective(course);
        } else {
            return -1;

        }
    }

    @Override
    public int delCourse(Course course) {
        Course oldCourse = courseMapper.selectByPrimaryKey(course.getId());
        if (oldCourse != null) {
            return courseMapper.deleteByPrimaryKey(course.getId());
        } else {
            return -1;

        }
    }


}
