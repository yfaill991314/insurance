package com.sanxia.controller;


import com.sanxia.po.Menu;
import com.sanxia.service.MenuService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/menu")
public class MenuController {

    @Resource
    private MenuService menuService;
   /**
    * @Author Feng.Yang
    * @Description //获取菜单
    * @Date 22:47 2019/4/5
    * @Param []
    * @return com.sanxia.utils.ResultView
    **/
    @RequestMapping("/findSidebar")
    @ResponseBody
    public Map<String,Object> loadSidebar() {
       List<Menu> menuItems = menuService.findMenuItemList();

       Map<String,Object> resultView=new HashMap<>();
       resultView.put("success",true);
       resultView.put("result",menuItems);
        return resultView;
    }

}
