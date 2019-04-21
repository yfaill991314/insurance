package com.sanxia.dao;

import java.sql.Timestamp;

/**
 * @ClassName SysUtilsMapper
 * @Description TODO
 * @Author YL
 * @Date 2019/4/5 20:21
 * @Version 1.0
 */
public interface SysUtilsMapper {
    String findUuid();

    Timestamp getSystemDate();
}
