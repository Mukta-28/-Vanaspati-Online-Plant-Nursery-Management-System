package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String role;
    private String phone;
    private String profileImage;
    private String status;
}

