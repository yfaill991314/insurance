package com.sanxia.controller;

import com.alibaba.fastjson.JSONObject;
import com.sanxia.po.News;
import com.sanxia.service.CommonService;
import com.sanxia.service.NewsMgService;
import com.sanxia.utils.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @ClassName NewsMgController
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/14 15:35
 * @Version 1.0
 */
@Controller
@RequestMapping("/newsMg")
public class NewsMgController {
    @Resource
    private NewsMgService newsMgService;
    @Resource
    private CommonService commonService;
    /**
     * @Author Feng.Yang
     * @Description //学生列表
     * @Date 17:40 2019/4/10
     * @Param []
     * @return java.util.List<com.sanxia.po.Student>
     **/
    @RequestMapping("/queryNewList")
    @ResponseBody
    public Map<String,Object> queryNewList(@RequestParam Map<String,Object> queryParams) {
        return newsMgService.queryNewList(queryParams);
    }

    @RequestMapping("/findNewsInfo")
    @ResponseBody
    public Map<String,Object> findNewsInfo(News news) {
        return ResultView.getResultView(true,newsMgService.findNewsInfo(news));
    }
    @RequestMapping("/addNews")
    @ResponseBody
    public Map<String,Object> addNews(@RequestParam("resultJSON") String resultJSON) {
        News news = JSONObject.parseObject(resultJSON,News.class);
        news.setReleaseId(commonService.findCurrentUserInfo().getUserId());
        int i= newsMgService.addNews(news);
        if (i>0){
            return ResultView.getResultView(true,"添加成功");
        }else {
            return ResultView.getResultView(false,"添加失败");
        }
    }

    @RequestMapping("/exitNews")
    @ResponseBody
    public Map<String,Object> exitNews(@RequestParam("resultJSON") String resultJSON) {
        News news = JSONObject.parseObject(resultJSON,News.class);
        int i= newsMgService.exitNews(news);
        if (i<0){
            return ResultView.getResultView(false,"修改失败");
        }else {
            return ResultView.getResultView(true,"修改成功");
        }
    }

    @RequestMapping("/delNews")
    @ResponseBody
    public Map<String,Object> delNews(News news) {
        int i= newsMgService.delNews(news);
        if (i<0){
            return ResultView.getResultView(false,"删除失败");
        }else {
            return ResultView.getResultView(true,"删除成功");
        }
    }
}
