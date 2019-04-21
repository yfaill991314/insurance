package com.sanxia.service;

import com.sanxia.po.Classroom;

import java.util.Map;

/**
 * @ClassName FacilitiesMgService
 * @Description TODO
 * @Author YL
 * @Date 2019/4/12 16:54
 * @Version 1.0
 */
public interface FacilitiesMgService {

    Map<String, Object> queryClaRoomList(Map<String, Object> queryParams);

    Classroom findClaRoomInfo(Classroom classroom);

    int addClaRoom(Classroom classroom);

    int exitClaRoom(Classroom classroom);

    int delClaRoom(Classroom classroom);
}
