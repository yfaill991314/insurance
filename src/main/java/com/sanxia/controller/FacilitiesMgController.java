package com.sanxia.controller;

import com.sanxia.po.Classroom;
import com.sanxia.po.Student;
import com.sanxia.service.FacilitiesMgService;
import com.sanxia.utils.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
 * @ClassName facilitiesMgController
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/12 16:51
 * @Version 1.0
 */
@Controller
@RequestMapping("/facilitiesMg")
public class FacilitiesMgController {
    @Resource
    private FacilitiesMgService facilitiesMgService;
    @RequestMapping("/queryClaRoomList")
    @ResponseBody
    public Map<String,Object> queryClaRoomList(@RequestParam Map<String,Object> queryParams) {
        return facilitiesMgService.queryClaRoomList(queryParams);
    }

    @RequestMapping("/findClaRoomInfo")
    @ResponseBody
    public Map<String,Object> findClaRoomInfo(Classroom classroom) {
        return ResultView.getResultView(true,facilitiesMgService.findClaRoomInfo(classroom));
    }
    @RequestMapping("/addClaRoom")
    @ResponseBody
    public Map<String,Object> addClaRoom(Classroom classroom) {
        int i= facilitiesMgService.addClaRoom(classroom);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/exitClaRoom")
    @ResponseBody
    public Map<String,Object> exitClaRoom(Classroom classroom) {
        int i= facilitiesMgService.exitClaRoom(classroom);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delClaRoom")
    @ResponseBody
    public Map<String,Object> delClaRoom(Classroom classroom) {
        int i= facilitiesMgService.delClaRoom(classroom);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }
}
