package com.sanxia.po;

public class Role {
    private Integer id;

    private String uuid;

    private String name;

    private String secrityName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid == null ? null : uuid.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getSecrityName() {
        return secrityName;
    }

    public void setSecrityName(String secrityName) {
        this.secrityName = secrityName == null ? null : secrityName.trim();
    }
}