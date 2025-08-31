package com.cdac.dto;

import com.cdac.entities.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuyerSignUpDTO {
    private String name;
    private String email;
    private String password;
    private Role role;
    private String mobile;
    private String address;
}
