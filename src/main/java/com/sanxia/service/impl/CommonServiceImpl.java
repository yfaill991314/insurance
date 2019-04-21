package com.sanxia.service.impl;

import com.sanxia.dao.UserMapper;
import com.sanxia.po.User;
import com.sanxia.service.CommonService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @ClassName CommonServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/8 21:29
 * @Version 1.0
 */
@Service
public class CommonServiceImpl implements CommonService {

    @Resource
    private UserMapper userMapper;
    @Override
    public User findCurrentUserInfo() {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user;
    }

    @Override
    public int updateUserPwd(User newUser) {
        return userMapper.updateByPrimaryKeySelective(newUser);
    }
}
