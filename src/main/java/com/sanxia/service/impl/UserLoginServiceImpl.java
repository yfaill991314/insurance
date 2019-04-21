package com.sanxia.service.impl;

import com.sanxia.dao.UserMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
/**
 * @ClassName UserLoginServiceImpl
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/7 16:22
 * @Version 1.0
 */
@Service
public class UserLoginServiceImpl implements UserDetailsService {
    @Resource
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        com.sanxia.po.User user = userMapper.findUserByUserName(userName);
        return user;
    }
}
