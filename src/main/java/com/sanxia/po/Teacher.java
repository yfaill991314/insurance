package com.sanxia.po;

public class Teacher {
    private Integer teaNum;

    private String uuid;

    private String teaName;

    private String age;

    private String sex;

    private String phoneNum;

    private String college;

    private String inSchYear;

    private String userUuid;

    public Integer getTeaNum() {
        return teaNum;
    }

    public void setTeaNum(Integer teaNum) {
        this.teaNum = teaNum;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid == null ? null : uuid.trim();
    }

    public String getTeaName() {
        return teaName;
    }

    public void setTeaName(String teaName) {
        this.teaName = teaName == null ? null : teaName.trim();
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age == null ? null : age.trim();
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum == null ? null : phoneNum.trim();
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college == null ? null : college.trim();
    }

    public String getInSchYear() {
        return inSchYear;
    }

    public void setInSchYear(String inSchYear) {
        this.inSchYear = inSchYear == null ? null : inSchYear.trim();
    }

    public String getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(String userUuid) {
        this.userUuid = userUuid == null ? null : userUuid.trim();
    }
}