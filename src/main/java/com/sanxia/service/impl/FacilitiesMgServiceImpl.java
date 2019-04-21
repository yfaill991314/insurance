package com.sanxia.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sanxia.dao.ClassroomMapper;
import com.sanxia.dao.SysUtilsMapper;
import com.sanxia.po.Classroom;
import com.sanxia.po.Student;
import com.sanxia.service.FacilitiesMgService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName FacilitiesMgServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/12 16:55
 * @Version 1.0
 */
@Service
public class FacilitiesMgServiceImpl implements FacilitiesMgService {
    @Resource
    private ClassroomMapper classroomMapper;
    @Resource
    private SysUtilsMapper sysUtilsMapper;
    @Override
    public Map<String, Object> queryClaRoomList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<Classroom> classrooms = classroomMapper.queryClaRoomList();

        PageInfo<Classroom> pageInfo = new PageInfo<>(classrooms);
        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", classrooms);
        result.put("total", total);
        return result;
    }

    @Override
    public Classroom findClaRoomInfo(Classroom classroom) {
        return  classroomMapper.selectByPrimaryKey(classroom.getId());
    }

    @Override
    public int addClaRoom(Classroom classroom) {
        String claUuid = sysUtilsMapper.findUuid();
        classroom.setUuid(claUuid);
        return classroomMapper.insertSelective(classroom);
    }

    @Override
    public int exitClaRoom(Classroom classroom) {
        Classroom oldClaRoom = classroomMapper.selectByPrimaryKey(classroom.getId());
        if (oldClaRoom != null) {
            return classroomMapper.updateByPrimaryKeySelective(classroom);
        } else {
            return -1;

        }
    }

    @Override
    public int delClaRoom(Classroom classroom) {
        Classroom oldClaRoom = classroomMapper.selectByPrimaryKey(classroom.getId());
        if (oldClaRoom != null) {
            return classroomMapper.deleteByPrimaryKey(classroom.getId());
        } else {
            return -1;
        }
    }
}
