package com.cdac.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Sellers_Profile")
public class SellersProfile extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seller_id")
    @ToString.Exclude
    private User seller;

    @NotBlank
    @Size(max = 100)
    private String nurseryName;

    @Size(max = 15)
    private String gstin;

    @Size(max = 300)
    private String address;

    @Enumerated(EnumType.STRING)
    private Status status;

}

