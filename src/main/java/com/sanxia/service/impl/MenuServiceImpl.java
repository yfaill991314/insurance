package com.sanxia.service.impl;

import com.sanxia.dao.MenuMapper;
import com.sanxia.dao.SysUtilsMapper;
import com.sanxia.po.Menu;
import com.sanxia.po.User;
import com.sanxia.service.CommonService;
import com.sanxia.service.MenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.sound.midi.Soundbank;
import java.util.List;

/**
 * @ClassName MenuServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/5 20:44
 * @Version 1.0
 */
@Service
public class MenuServiceImpl implements MenuService {
    @Resource
    private MenuMapper menuMapper;
    @Resource
    private SysUtilsMapper sysUtilsMapper;
    @Resource
    private CommonService commonService;
    /**
     * @Author Feng.Yang
     * @Description //查询目录
     * @Date 21:07 2019/4/5
     * @Param []
     * @return java.util.List<com.sanxia.po.Menu>
     **/
    @Override
    public List<Menu> findMenuItemList() {
        User currentUserInfo = commonService.findCurrentUserInfo();

        return menuMapper.findMenuItemList(currentUserInfo.getRole());
    }
    /**
     * @Author Feng.Yang
     * @Description //插入一条菜单项
     * @Date 21:09 2019/4/5
     * @Param [menu]
     * @return int
     **/
    @Override
    public int insertMenuItem(Menu menu) {
        String uuid = sysUtilsMapper.findUuid();
        menu.setUuid(uuid);
        int num = menuMapper.insert(menu);
        return num;
    }


}
