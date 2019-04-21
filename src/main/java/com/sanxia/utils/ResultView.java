package com.sanxia.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName RsuleView
 * @Description TODO
 * @Author Feng.Yang
 * @Date 2019/4/11 22:17
 * @Version 1.0
 */
public class ResultView {
    public static Map<String,Object> getResultView(boolean isSuccess,Object result){
        Map<String,Object> resultView=new HashMap<>();
        if (isSuccess){
            resultView.put("success",isSuccess);
            resultView.put("result",result);
        }else {
            resultView.put("success",isSuccess);
            resultView.put("message",result);
        }
        return resultView;
    }
}
