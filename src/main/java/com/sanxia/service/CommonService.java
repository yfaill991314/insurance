package com.sanxia.service;

import com.sanxia.po.User;

/**
 * @ClassName CommonService
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/8 21:26
 * @Version 1.0
 */
public interface CommonService {
    User findCurrentUserInfo();

    int updateUserPwd(User newUser);
}
