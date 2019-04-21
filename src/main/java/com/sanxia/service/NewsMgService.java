package com.sanxia.service;

import com.sanxia.po.News;

import java.util.Map;

/**
 * @ClassName NewsMgService
 * @Description TODO
 * @Author YL
 * @Date 2019/4/14 15:38
 * @Version 1.0
 */
public interface NewsMgService {

    Map<String,Object> queryNewList(Map<String, Object> queryParams);

    News findNewsInfo(News news);

    int addNews(News news);

    int exitNews(News news);

    int delNews(News news);
}
