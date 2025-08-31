package com.cdac.dto;

import com.cdac.entities.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse extends BaseDTO{

    private String name;
    private String email;
    private String password;
    private Role role;
}
