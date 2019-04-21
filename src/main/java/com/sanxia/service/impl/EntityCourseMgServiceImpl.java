package com.sanxia.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sanxia.dao.EntityCourseMapper;
import com.sanxia.dao.SysUtilsMapper;
import com.sanxia.po.EntityCourse;
import com.sanxia.po.Student;
import com.sanxia.service.EntityCourseMgService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName EntityCourseMgServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/16 21:21
 * @Version 1.0
 */
@Service
public class EntityCourseMgServiceImpl implements EntityCourseMgService {
    @Resource
    private EntityCourseMapper entityCourseMapper;
    @Resource
    private SysUtilsMapper sysUtilsMapper;

    @Override
    public Map<String, Object> queryEntityCouList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<Map<String, Object>> entityCoures = entityCourseMapper.queryEntityCouresList();

        for (Map<String,Object> item:entityCoures) {
            SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd" );
            String startDate = dateFormat.format((Date) item.get("strDate"));
            String endDate = dateFormat.format((Date) item.get("endDate"));
            item.put("strDate",startDate);
            item.put("endDate",endDate);
        }

        PageInfo<Map<String,Object>> pageInfo = new PageInfo<>(entityCoures);

        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", entityCoures);
        result.put("total", total);
        return result;
    }

    @Override
    public int addEntityCourse(EntityCourse entityCourse) {
        entityCourse.setUuid(sysUtilsMapper.findUuid());
        return entityCourseMapper.insertSelective(entityCourse);
    }

    @Override
    public Map<String, Object> findEntityCourseInfo(EntityCourse entityCourse) {
        Map<String, Object> entityCourseInfo = entityCourseMapper.findEntityCourseInfo(entityCourse);

        SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd" );
        String startDate = dateFormat.format((Date) entityCourseInfo.get("startDate"));
        String endDate = dateFormat.format((Date) entityCourseInfo.get("endDate"));
        entityCourseInfo.put("startDate",startDate);
        entityCourseInfo.put("endDate",endDate);

        return entityCourseInfo;
    }

    @Override
    public int exitEntityCourse(EntityCourse entityCourse) {
        EntityCourse oldEntityCourse = entityCourseMapper.selectByPrimaryKey(entityCourse.getId());
        if (oldEntityCourse != null) {
            return entityCourseMapper.updateByPrimaryKeySelective(entityCourse);
        } else {
            return -1;
        }
    }

    @Override
    public int delEntityCourse(EntityCourse entityCourse) {
        EntityCourse oldEntityCourse = entityCourseMapper.selectByPrimaryKey(entityCourse.getId());
        if (oldEntityCourse != null) {
            return entityCourseMapper.deleteByPrimaryKey(entityCourse.getId());
        } else {
            return -1;

        }
    }
}
