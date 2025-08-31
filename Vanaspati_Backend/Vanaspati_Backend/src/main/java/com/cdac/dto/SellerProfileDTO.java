package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerProfileDTO {
    private String ownerName;
    private String nurseryName;
    private String email;
    private String contactNumber;
    private String address;
    private String gstin;
}