package com.sanxia.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sanxia.dao.NewsMapper;
import com.sanxia.dao.SysUtilsMapper;
import com.sanxia.po.News;
import com.sanxia.po.Student;
import com.sanxia.service.NewsMgService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName NewsMgServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/14 15:39
 * @Version 1.0
 */
@Service
public class NewsMgServiceImpl implements NewsMgService {
    @Resource
    private NewsMapper newsMapper;
    @Resource
    private SysUtilsMapper sysUtilsMapper;


    @Override
    public Map<String, Object> queryNewList(Map<String, Object> queryParams) {
        int pageNum = Integer.parseInt(queryParams.get("page").toString());
        int pageSize= Integer.parseInt(queryParams.get("limit").toString());
        PageHelper.startPage(pageNum, pageSize);

        List<News> news = newsMapper.queryNewList();

        PageInfo<News> pageInfo = new PageInfo<>(news);
        long total = pageInfo.getTotal();
        Map<String, Object> result = new HashMap<>();
        result.put("rows", news);
        result.put("total", total);
        return result;
    }

    @Override
    public News findNewsInfo(News news) {
        return newsMapper.selectByPrimaryKey(news.getId());
    }

    @Override
    public int addNews(News news) {
        news.setUuid(sysUtilsMapper.findUuid());
        Timestamp now = sysUtilsMapper.getSystemDate();
        news.setReleaseDate(now);
        news.setUpdateDate(now);
        return newsMapper.insertSelective(news);
    }

    @Override
    public int exitNews(News news) {
        News oldnews = newsMapper.selectByPrimaryKey(news.getId());
        if (oldnews != null) {
            return newsMapper.updateByPrimaryKeySelective(news);
        } else {
            return -1;

        }
    }

    @Override
    public int delNews(News news) {
        News oldnews= newsMapper.selectByPrimaryKey(news.getId());
        if (oldnews != null) {
            return newsMapper.deleteByPrimaryKey(news.getId());
        } else {
            return -1;

        }
    }
}
