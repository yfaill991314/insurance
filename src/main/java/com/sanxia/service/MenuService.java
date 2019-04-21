package com.sanxia.service;

import com.sanxia.po.Menu;

import java.util.List;

/**
 * @ClassName MenuService
 * @Description TODO
 * @Author YL
 * @Date 2019/4/5 20:43
 * @Version 1.0
 */
public interface MenuService {
    /**
     * @Author Feng.Yang
     * @Description //查询目录
     * @Date 21:07 2019/4/5
     * @Param []
     * @return java.util.List<com.sanxia.po.Menu>
     **/
    List<Menu> findMenuItemList();
    /**
     * @Author Feng.Yang
     * @Description //插入一条菜单项
     * @Date 21:09 2019/4/5
     * @Param [menu]
     * @return int
     **/
    int insertMenuItem(Menu menu);
}
